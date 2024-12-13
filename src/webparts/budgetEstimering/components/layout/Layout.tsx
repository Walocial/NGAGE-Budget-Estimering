import * as React from "react";
import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  Stack,
} from "@fluentui/react";
import BackEndService from "../../services/BackEnd";
import useGlobal from "../../hooks/useGlobal";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SumOf } from "./utils/layoutUtils";
import { EmployeeDTO } from "../interfaces";
import { SHORTHAND_MONTHS, TimeFormat } from "../utils/dateUtils";
import { formatAsDKK, separateThousands } from "./utils/formatting";
import NavBar from "./NavBar";
import styles from "./Layout.module.scss";
import EditModal from "./Modal";
import IUser from "../interfaces/IUser";
//import SharepointService from "../../services/SharePointService";
import IModalInput from "../interfaces/IModalInput";
import Notifications from "./Notifications";

export interface ILayoutDTO {
  context: WebPartContext;
  hourlyRate: string;
  workHours: string;
  authUsers: IUser[];
}

const SpreadsheetLayout: React.FC<ILayoutDTO> = ({
  context,
  hourlyRate,
  workHours,
  authUsers,
}) => {
  const {
    employees,
    setEmployees,
    vacations,
    setVacations,
    shownYear,
    noWorkDates,
    isEditMode,
    setIsEditmode,
    listItems,
    notifications,
    setNotifications
  } = useGlobal();

  const [modalInput, setModalInput] = React.useState<IModalInput | undefined>();
  const [isAdmin, setIsAdmin] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchEmployees = async (): Promise<void> => {
      try {
        const response = await BackEndService.Api.employeeList();

        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    const fetchVacations = async (): Promise<void> => {
      try {
        const response = await BackEndService.Api.registrationsTypeDetail(4);

        setVacations(response.data);
      } catch (error) {
        console.error("Error fetching vacations:", error);
      }
    };

    fetchEmployees().catch(console.error);
    fetchVacations().catch(console.error);
  }, []);

  // Sætter isAdmin state til true hvis brugerens email findes i authUsers defineret i property pane
  React.useEffect(() => {
    if (authUsers.length) {
      for (const user of authUsers) {
        if (user.email === context.pageContext.user.email) {
          return setIsAdmin(true);
        }
      }
    }
    return setIsAdmin(false);
  }, [authUsers]);

  // Kolonner til DetailsList
  const columns: IColumn[] = [
    {
      key: "label",
      name: shownYear.toString(),
      fieldName: "label",
      minWidth: 120,
      isResizable: false,
    },
    ...SHORTHAND_MONTHS.map((month) => ({
      key: month,
      name: month,
      fieldName: month,
      minWidth: 75,
      isResizable: false,
    })),
    {
      key: "sum",
      name: "Hele året",
      fieldName: "sum",
      minWidth: 105,
      isResizable: false,
    },
  ];

  const calcWorkDaysForMonth = (month: number): number => {
    const firstDay = new Date(shownYear, month, 1);
    const lastDay = new Date(shownYear, month + 1, 0);

    let workDays = 0;

    // Gennemgår hver dag i måneden
    for (let day = firstDay.getDate(); day <= lastDay.getDate(); day++) {
      const currentDate = new Date(shownYear, month, day);
      const dayOfWeek = currentDate.getDay();

      // Tjekker om datoen passer med nogen fra getDynamicNoWorkDates() -> (dateUtils.ts)
      const isNoWorkDate = noWorkDates.some(
        (noWorkDate) => noWorkDate.day === day && noWorkDate.month === month
      );

      // Springer datoen over hvis det ikke er en arbejdsdag eller er i getDynamicNoWorkDates() -> (dateUtils.ts)
      if (dayOfWeek !== 0 && dayOfWeek !== 6 && !isNoWorkDate) {
        workDays++;
      }
    }

    return workDays;
  };

  const calcWorkHoursForMonth = (month: number): number => {
    return calcWorkDaysForMonth(month) * Number(workHours);
  };

  const sumOfWorkDays = (
    timeFormat?: TimeFormat,
    hoursPerDay: number = 7.5
  ): number => {
    let sum = 0;
    for (let month = 0; month <= 11; month++) {
      sum += calcWorkDaysForMonth(month);
    }
    if (timeFormat === TimeFormat.Hours) {
      sum *= hoursPerDay;
    }

    return sum;
  };

  const getMonthlyEmployeeVacationHours = (
    employeeId: number,
    month: number
  ): number => {
    const targetEmployee = employeeId
      ? employees.find((employee) => employee.id === employeeId)
      : undefined;

    if (employeeId && !targetEmployee) {
      console.error("Employee with the specified ID not found.");
      return 0;
    }

    const targetEmail = targetEmployee?.email || undefined;

    // Filtrer ferieregistreringer for target employee og given måned/årstal
    const filteredVacations = vacations.filter((vacation) => {
      // Tjekker kun registreringer for target employee
      if (vacation.employee !== targetEmail) return false;

      // Tjekker om registreringsdato passer med angivne måned/år
      if (vacation.date) {
        const vacationDate = new Date(vacation.date);
        return (
          vacationDate.getFullYear() === shownYear &&
          vacationDate.getMonth() === month
        );
      }
      return false;
    });

    // Udregner totale ferietimer for måneden
    let totalHours = 0;
    for (const vacation of filteredVacations) {
      if (vacation.start && vacation.end) {
        const [startHours, startMinutes] = vacation.start
          .split(":")
          .map(Number);
        const [endHours, endMinutes] = vacation.end.split(":").map(Number);

        const hoursWorked =
          endHours + endMinutes / 60 - (startHours + startMinutes / 60);

        totalHours += hoursWorked;
      }
    }

    // Tjekker om der findes ændring i SharePoint-listen for emailen på den valgte konsulents celle
    // Tjekker om der findes ændring i SharePoint-listen for måneden og året
    for (const listItem of listItems) {
      if (
        targetEmail === listItem.Title &&
        `${SHORTHAND_MONTHS[month]}-${shownYear}` === listItem.DatoN_x00f8_gle //DatoNøgle (ø er en unicode character)
      ) {
        
        totalHours += listItem.AntalTimer;
      }
    }

    return totalHours;
  };

  const sumOfVacationHours = (month: number): number => {
    let totalVacationHours = 0;

    employees.forEach((employee) => {
      if (!employee.id || !employee.invoiceTarget) {
        return;
      }
      totalVacationHours += getMonthlyEmployeeVacationHours(employee.id, month);
    });

    return Math.round(totalVacationHours);
  };

  const sumOfWorkHours = (month: number): number => {
    let totalWorkHours = 0;

    employees.forEach((employee) => {
      if (!employee.id || !employee.invoiceTarget) {
        return;
      }

      const monthlyWorkHours = calcWorkHoursForMonth(month);

      const vacationHours = getMonthlyEmployeeVacationHours(employee.id, month);

      totalWorkHours +=
        (monthlyWorkHours - vacationHours) * (employee.invoiceTarget / 100);
    });

    return totalWorkHours;
  };

  const sumOfBudget = (month: number): number => {
    return sumOfWorkHours(month) * Number(hourlyRate);
  };

  const yearlySumOf = (sumOf: SumOf): string => {
    let yearlySum = 0;

    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
      switch (sumOf) {
        case SumOf.WorkHours:
          yearlySum += sumOfWorkHours(monthIndex);
          break;
        case SumOf.VacationHours:
          yearlySum += sumOfVacationHours(monthIndex);
          break;
        case SumOf.Budget:
          if (hourlyRate === undefined) {
            throw new Error("Hourly rate is required for budget calculation.");
          }
          yearlySum += sumOfBudget(monthIndex);
          break;
      }
    }

    if (sumOf === SumOf.Budget) return formatAsDKK(yearlySum);
    else return separateThousands(yearlySum);
  };

  const generateEmployeeRows = (employeeList: EmployeeDTO[]): object[] => {
    const employeeRows: Record<string, string | number>[] = [];
    employeeList.forEach((employee) => {
      if (!employee.id || !employee.invoiceTarget) {
        return;
      }
      // Variabler der vises i årlige sum
      let yearlyVacationHours = 0;
      let yearlyWorkHoursTarget = 0;

      const monthlyData: Record<string, string> = {};

      SHORTHAND_MONTHS.forEach((monthName, monthIndex) => {
        if (!employee.id || !employee.invoiceTarget) {
          return;
        }
        const vacationHours = getMonthlyEmployeeVacationHours(
          employee.id,
          monthIndex
        );
        const workHoursTarget =
          ((calcWorkHoursForMonth(monthIndex) - vacationHours) *
            employee.invoiceTarget) /
          100;

        // Opdaterer iterativt den årlige sum
        yearlyVacationHours += vacationHours;
        yearlyWorkHoursTarget += workHoursTarget;

        monthlyData[monthName] = `${Math.round(vacationHours)} / ${Math.round(
          workHoursTarget
        )}`;
      });

      const sumData = `${Math.round(yearlyVacationHours)} / ${separateThousands(
        yearlyWorkHoursTarget
      )}`;
      employeeRows.push({
        label: `${employee.givenName} ${employee.surName}`,
        ...monthlyData,
        sum: sumData,
      });
    });
    return employeeRows;
  };

  const onCellClick = (
    rowIndex: number,
    columnKey: string,
    value: string | number
  ): void => {
    setIsEditmode(true);
    const employee = employees.find(
      (e) => `${e.givenName} ${e.surName}` === (rows[rowIndex] as any).label
    );
    console.log(
      `Celle: (${rowIndex}-${columnKey}-${shownYear}) klikket, med værdien ${value}.`
    );
    if (!employee || !employee.email) return;
    setModalInput({
      columnKey,
      email: employee.email,
      key: `${columnKey}-${shownYear}`,
    });
  };

  const onRenderItemColumn = (
    item: Record<string, string | number>,
    index: number | undefined,
    column: IColumn | undefined
  ): JSX.Element | null => {
    if (!column || index === undefined) return null;
    if (isAdmin && SHORTHAND_MONTHS.includes(column.key)) {
      return (
        <div
          className={styles.data_container}
          onClick={() =>
            onCellClick(index, column.key, item[column.fieldName || ""])
          }
        >
          {item[column.fieldName || ""]}
        </div>
      );
    }
    return <>{item[column.fieldName || ""]}</>;
  };

  const rows = [
    {
      label: "Arbejdsdage",
      ...SHORTHAND_MONTHS.reduce(
        (acc, month, index) => ({
          ...acc,
          [month]: calcWorkDaysForMonth(index),
        }),
        {}
      ),
      sum: sumOfWorkDays(TimeFormat.Days),
    },
    {
      label: "Arbejdstimer",
      ...SHORTHAND_MONTHS.reduce(
        (acc, month, index) => ({
          ...acc,
          [month]: Math.round(calcWorkHoursForMonth(index)),
        }),
        {}
      ),
      sum: separateThousands(sumOfWorkDays(TimeFormat.Hours)),
    },
    ...generateEmployeeRows(employees),
    {
      label: "Ferie i alt",
      ...SHORTHAND_MONTHS.reduce(
        (acc, month, index) => ({
          ...acc,
          [month]: Math.round(sumOfVacationHours(index)),
        }),
        {}
      ),
      sum: yearlySumOf(SumOf.VacationHours),
    },
    {
      label: "Udfakturerbare timer",
      ...SHORTHAND_MONTHS.reduce(
        (acc, month, index) => ({
          ...acc,
          [month]: separateThousands(sumOfWorkHours(index)),
        }),
        {}
      ),
      sum: yearlySumOf(SumOf.WorkHours),
    },
    {
      label: "Budget",
      ...SHORTHAND_MONTHS.reduce(
        (acc, month, index) => ({
          ...acc,
          [month]: formatAsDKK(sumOfBudget(index)),
        }),
        {}
      ),
      sum: yearlySumOf(SumOf.Budget),
    },
  ];

  return (
    <Stack>
      <NavBar context={context} />
      <Notifications
            notifications={notifications}
            onDismiss={(notif) =>
              setNotifications(notifications.filter((n) => n !== notif))
            }
          />
      {!!modalInput && (
        <EditModal
          isOpen={isEditMode}
          currentValue={0}
          onClose={() => setIsEditmode(false)}
          onSave={() => setModalInput(undefined)}
          input={modalInput}
        />
      )}
      <DetailsList
        items={rows}
        columns={columns}
        layoutMode={DetailsListLayoutMode.justified}
        selectionMode={0}
        onRenderItemColumn={onRenderItemColumn}
        styles={{
          root: {
            overflowX: "none",
            border: "1px solid #ccc",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          },
        }}
      />
    </Stack>
  );
};

export default SpreadsheetLayout;
