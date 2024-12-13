import { Api } from "../components/interfaces";

export default class BackEndService {
  private static _instance: Api<{}>;

  public static Init(baseUrl: string): void {
    if (!this._instance) {
      this._instance = new Api({
        baseUrl: baseUrl,
        baseApiParams: {
          headers: {
            "Content-Type": "application/json",
            "api-key": "API-KEY-REMOVED-FROM-GITHUB-VERSION",
          },
        },
      });
    }
  }

  public static get Api() {
    if (!this._instance) {
      throw new Error("BackEndService not initialized. Call Init first.");
    }
    return this._instance.api;
  }
}
