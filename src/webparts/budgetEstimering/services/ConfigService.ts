import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPHttpClient } from "@microsoft/sp-http";
import CacheService from "./CacheService";

export interface IConfigItem {
  key: string;
  // eslint-disable-next-line
  value: any;
}

export default class ConfigService {
  public static async GetConfig(
    context: WebPartContext
  ): Promise<IConfigItem[]> {
    const cached = CacheService.Load<IConfigItem[]>("configuration");
    if (cached) return cached;
    
    const items = await context.httpClient
      .get(
        `${window.location.origin}/_api/web/lists/GetByTitle('Configuration')/items`,
        SPHttpClient.configurations.v1,
        {
          headers: { Accept: "application/json; odata=verbose" },
        }
      )
      .then((r) => r.json())
      .then(
        (data) =>
          // Any from Sharepoint REST API
          // eslint-disable-next-line
          data.d.results.map((r: any) => {
            return { key: r.Title, value: r.Value };
          }) as IConfigItem[]
      );

    CacheService.Save("configuration", items, 24 * 3);

    return items;
  }
}
