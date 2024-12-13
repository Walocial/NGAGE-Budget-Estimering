import * as React from "react";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import {
  EmployeeDTO,
  RegistrationDTO,
} from "../components/interfaces";
import { getDynamicNoWorkDates } from "../components/utils/dateUtils";
import SharepointService from "../services/SharePointService";
import { IFerieTimerListItem } from "../components/interfaces/IFerieTimerListItem";

export enum NotificationType {
  Success,
  Info,
  Warning,
  Error,
}

export interface INotification {
  type: NotificationType;
  message: string;
}

export interface IGlobalContext {
  loading: boolean;
  setLoading: React.Dispatch<boolean>;
  employees: EmployeeDTO[];
  setEmployees: React.Dispatch<EmployeeDTO[]>;
  vacations: RegistrationDTO[];
  setVacations: React.Dispatch<RegistrationDTO[]>;
  shownYear: number;
  setShownYear: React.Dispatch<number>;
  noWorkDates: { day: number; month: number }[];
  setNoWorkDates: React.Dispatch<{ day: number; month: number }[]>;
  hourlyRate: number;
  setHourlyRate: React.Dispatch<number>;
  isEditMode: boolean;
  setIsEditmode: React.Dispatch<boolean>;
  listItems: IFerieTimerListItem[];
  setListItems: React.Dispatch<any[]>;
  notifications: INotification[];
  setNotifications: React.Dispatch<INotification[]>;
}

export const GlobalContext = React.createContext<IGlobalContext | undefined>(
  undefined
);

const GlobalContextProvider: React.FC<
  React.PropsWithChildren<{ context: WebPartContext }>
> = ({ children, context }) => {
  const [employees, setEmployees] = React.useState<EmployeeDTO[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [vacations, setVacations] = React.useState<RegistrationDTO[]>(
    []
  );
  const [shownYear, setShownYear] = React.useState<number>(new Date().getFullYear())
  const [noWorkDates, setNoWorkDates] = React.useState<{ day: number; month: number }[]>(getDynamicNoWorkDates(new Date().getFullYear()));
  const [hourlyRate, setHourlyRate] = React.useState<number>(1132);
  const [isEditMode, setIsEditmode] = React.useState<boolean>(false);
  const [listItems, setListItems] = React.useState<any[]>([])
  const [notifications, setNotifications] = React.useState<INotification[]>([]);

  React.useEffect(() => {
    setNoWorkDates(getDynamicNoWorkDates(shownYear));
    console.log(shownYear, noWorkDates)
  }, [shownYear]);

  React.useEffect(() => {
    console.log(listItems)
  }, [listItems])

  React.useEffect(() => {
    (async() => {
      const listItems = await SharepointService.Instance.getSP().web.lists.getByTitle("Ferietimer").items()
      setListItems(listItems);
    })()
  }, [])

  if (loading) return <>Loading...</>;

  return (
    <>
      <GlobalContext.Provider
        value={{
          loading,
          setLoading,
          employees,
          setEmployees,
          vacations,
          setVacations,
          shownYear,
          setShownYear,
          noWorkDates,
          setNoWorkDates,
          hourlyRate,
          setHourlyRate,
          isEditMode,
          setIsEditmode,
          listItems,
          setListItems,
          notifications,
          setNotifications
        }}
      >
        <>{children}</>
      </GlobalContext.Provider>
    </>
  );
};

export default GlobalContextProvider;
