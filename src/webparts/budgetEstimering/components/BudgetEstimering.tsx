import * as React from "react";
import SpreadsheetLayout from "./layout/Layout";
import GlobalContextProvider from "../context/GlobalContext";
import { IBudgetEstimeringProps } from "./IBudgetEstimeringProps";
import styles from "./BudgetEstimering.module.scss";

const BudgetEstimering: React.FC<IBudgetEstimeringProps> = ({
  context,
  hourlyRate,
  workHours,
  authUsers,
}) => {
  return (
      <div className={styles.budgetEstimering}>
        <GlobalContextProvider context={context}>
          <SpreadsheetLayout context={context} hourlyRate={hourlyRate} workHours={workHours} authUsers={authUsers}/>
        </GlobalContextProvider>
      </div>
    );
  }

export default BudgetEstimering;