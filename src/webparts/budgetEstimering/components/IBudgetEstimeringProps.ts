import { WebPartContext } from "@microsoft/sp-webpart-base";
import IUser from "./interfaces/IUser";

export interface IBudgetEstimeringProps {
  isDarkTheme: boolean;
  environmentMessage: string;
  context: WebPartContext;
  hourlyRate: string;
  workHours: string;
  authUsers: IUser[];
}
