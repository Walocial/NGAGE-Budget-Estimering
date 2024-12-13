import { WebPartContext } from "@microsoft/sp-webpart-base";
import { spfi, SPFI, SPFx } from "@pnp/sp"
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

export default class SharepointService {
  private _sp: SPFI;
  private _context: WebPartContext;
    private static instance: SharepointService;

  public static get Instance(): SharepointService {
    return this.instance
  }

    public static Init(context: WebPartContext){
        this.instance = new SharepointService(context);
    }

  // Creates sp object on class instance
  constructor(context: WebPartContext) {
    this._sp = spfi().using(SPFx(context));
    this._context = context;
  }

  // Return public sp object
  public getSP(): SPFI {
    return this._sp;
  }

  // Return context object
  public getContext(): WebPartContext {
    return this._context;
  }
}
