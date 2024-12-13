import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";
import { PropertyFieldPeoplePicker } from "@pnp/spfx-property-controls";
import * as strings from "BudgetEstimeringWebPartStrings";
import BudgetEstimering from "./components/BudgetEstimering";
import { IBudgetEstimeringProps } from "./components/IBudgetEstimeringProps";
import BackEndService from "./services/BackEnd";
import ConfigService from "./services/ConfigService";
import IUser from "./components/interfaces/IUser";
import SharepointService from "./services/SharePointService";

export interface IBudgetEstimeringWebPartProps {
  hourlyRate: string;
  workHours: string;
  authUsers: IUser[];
}

export default class BudgetEstimeringWebPart extends BaseClientSideWebPart<IBudgetEstimeringWebPartProps> {
  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = "";

  public render(): void {
    const element: React.ReactElement<IBudgetEstimeringProps> =
      React.createElement(BudgetEstimering, {
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        context: this.context,
        hourlyRate: this.properties.hourlyRate || "1132",
        workHours: this.properties.workHours || "7.5",
        authUsers: this.properties.authUsers
      });

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    const config = await ConfigService.GetConfig(this.context);
    SharepointService.Init(this.context);
    const backendEndpoint = config.find(
      (c) => c.key === "timemanagement_backend"
    )?.value;
    if (!backendEndpoint) throw new Error("Failed to fetch backend endpoint");

    BackEndService.Init(backendEndpoint);

    return this._getEnvironmentMessage().then((message) => {
      this._environmentMessage = message;
    });
  }

  private _getEnvironmentMessage(): Promise<string> {
    if (!!this.context.sdks.microsoftTeams) {
      // running in Teams, office.com or Outlook
      return this.context.sdks.microsoftTeams.teamsJs.app
        .getContext()
        .then((context) => {
          let environmentMessage: string = "";
          switch (context.app.host.name) {
            case "Office": // running in Office
              environmentMessage = this.context.isServedFromLocalhost
                ? strings.AppLocalEnvironmentOffice
                : strings.AppOfficeEnvironment;
              break;
            case "Outlook": // running in Outlook
              environmentMessage = this.context.isServedFromLocalhost
                ? strings.AppLocalEnvironmentOutlook
                : strings.AppOutlookEnvironment;
              break;
            case "Teams": // running in Teams
            case "TeamsModern":
              environmentMessage = this.context.isServedFromLocalhost
                ? strings.AppLocalEnvironmentTeams
                : strings.AppTeamsTabEnvironment;
              break;
            default:
              environmentMessage = strings.UnknownEnvironment;
          }

          return environmentMessage;
        });
    }

    return Promise.resolve(
      this.context.isServedFromLocalhost
        ? strings.AppLocalEnvironmentSharePoint
        : strings.AppSharePointEnvironment
    );
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const { semanticColors } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty(
        "--bodyText",
        semanticColors.bodyText || null
      );
      this.domElement.style.setProperty("--link", semanticColors.link || null);
      this.domElement.style.setProperty(
        "--linkHovered",
        semanticColors.linkHovered || null
      );
    }
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupName: "Konstante værdier",
              groupFields: [
                PropertyPaneTextField("hourlyRate", {
                  label: "Timeløn (DKK)",
                  description:
                    "Indtast den timeløn, der anvendes i beregningen",
                  value: this.properties.hourlyRate || "1132",
                  onGetErrorMessage: (value: string) =>
                    isNaN(Number(value)) ? "Indtast et gyldigt tal" : "",
                }),
                PropertyPaneTextField("workHours", {
                  label: "Arbejdstimer pr. dag",
                  description: "Indtast antallet af daglige arbejdstimer",
                  value: this.properties.workHours || "7.5",
                  onGetErrorMessage: (value: string) =>
                    isNaN(Number(value)) ? "Indtast et gyldigt tal" : "",
                }),
              ],
            },
            {
              groupName: "Sikkerhedsindstillinger",
              groupFields: [
                PropertyFieldPeoplePicker("authUsers", {
                  key: "peoplePickerField",
                  label: "Administrative brugere",
                  onPropertyChange(propertyPath, oldValue, newValue) {
                    console.log(propertyPath, oldValue, newValue);
                    this.properties[propertyPath] = newValue;
                  },
                  initialData: this.properties.authUsers, 
                  context: this.context as any,
                  properties: this.properties,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
