/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface AcceptRequestRequestDTO {
    /** @format date-time */
    start?: string;
    /** @format date-time */
    end?: string;
    /** @format int32 */
    repeated?: number;
  }
  
  export interface CreateCustomerRequestDTO {
    /** @format int32 */
    cvr?: number;
    name?: string | null;
    /** @format int32 */
    hourlyRate?: number;
    active?: boolean;
    /** @format int32 */
    crmid?: number | null;
    teamsId?: string | null;
    /** @format int32 */
    economicId?: number | null;
  }
  
  export interface CreateInvoiceDTO {
    /** @format int32 */
    erpInvoiceId?: number | null;
    /** @format int32 */
    customerId?: number;
    headline?: string | null;
    /** @format date-time */
    invoiceDate?: string | null;
    savedToERP?: boolean;
  }
  
  export interface CreateInvoiceLineDTO {
    /** @format int32 */
    itemNumber?: number | null;
    lineText?: string | null;
    /** @format float */
    numberOfUnits?: number | null;
    /** @format float */
    unitPrice?: number | null;
  }
  
  export interface CreateInvoiceLineRegistrationDTO {
    /** @format int32 */
    invoiceLineId?: number;
    /** @format int32 */
    registrationId?: number;
  }
  
  export interface CreatePhaseDTO {
    title?: string | null;
    /** @format int32 */
    projectId?: number;
  }
  
  export interface CreateProjectRequestDTO {
    name?: string | null;
    /** @format int32 */
    customerId?: number;
    /** @format int32 */
    hourlyRate?: number;
    invoiceable?: boolean;
    /** @format int32 */
    projectStatus?: number;
  }
  
  export interface CreateRegistrationRequestDTO {
    shortDescription?: string | null;
    description?: string | null;
    /** @format int32 */
    projectId?: number;
    /** @format int32 */
    phaseId?: number | null;
    /** @format date-time */
    date?: string;
    start?: string | null;
    end?: string | null;
    /** @format double */
    time?: number;
    invoiceable?: boolean;
    employee?: string | null;
    /** @format int32 */
    registrationType?: number;
    /** @format int32 */
    forecastEstimate?: number;
  }
  
  export interface CreateRequestRequstDTO {
    title?: string | null;
    shortDescription?: string | null;
    /** @format int32 */
    estimatedHours?: number | null;
    createRegistrationRequestDTO?: CreateRegistrationRequestDTO;
  }
  
  export interface CustomerDTO {
    /** @format int32 */
    id?: number;
    /** @format int32 */
    cvr?: number;
    name?: string | null;
    /** @format int32 */
    hourlyRate?: number | null;
    active?: boolean;
    /** @format int32 */
    crmid?: number | null;
    teamsId?: string | null;
    /** @format int32 */
    economicId?: number | null;
  }
  
  export interface DateOnly {
    /** @format int32 */
    year?: number;
    /** @format int32 */
    month?: number;
    /** @format int32 */
    day?: number;
    dayOfWeek?: DayOfWeek;
    /** @format int32 */
    dayOfYear?: number;
    /** @format int32 */
    dayNumber?: number;
  }
  
  /** @format int32 */
  export enum DayOfWeek {
    Value0 = 0,
    Value1 = 1,
    Value2 = 2,
    Value3 = 3,
    Value4 = 4,
    Value5 = 5,
    Value6 = 6,
  }
  
  export interface EditCustomerRequestDTO {
    /** @format int32 */
    id?: number;
    /** @format int32 */
    cvr?: number;
    name?: string | null;
    /** @format int32 */
    hourlyRate?: number | null;
    active?: boolean;
    /** @format int32 */
    crmid?: number | null;
    teamsId?: string | null;
    /** @format int32 */
    economicId?: number | null;
  }
  
  export interface EditInvoiceDTO {
    /** @format int32 */
    invoiceId?: number;
    /** @format int32 */
    erpInvoiceId?: number | null;
    /** @format int32 */
    customerId?: number;
    headline?: string | null;
    /** @format date-time */
    invoiceDate?: string | null;
    savedToERP?: boolean;
  }
  
  export interface EditInvoiceLineDTO {
    /** @format int32 */
    invoiceLineId?: number;
    /** @format int32 */
    itemNumber?: number | null;
    lineText?: string | null;
    /** @format float */
    numberOfUnits?: number | null;
    /** @format float */
    unitPrice?: number | null;
  }
  
  export interface EditPhaseDTO {
    /** @format int32 */
    id?: number;
    title?: string | null;
    /** @format int32 */
    projectId?: number;
  }
  
  export interface EditProjectRequestDTO {
    /** @format int32 */
    id?: number;
    name?: string | null;
    /** @format int32 */
    customerId?: number | null;
    /** @format int32 */
    hourlyRate?: number | null;
    invoiceable?: boolean;
    /** @format int32 */
    projectStatus?: number;
  }
  
  export interface EditRegistrationRequestDTO {
    shortDescription?: string | null;
    description?: string | null;
    /** @format int32 */
    projectId?: number | null;
    /** @format int32 */
    phaseId?: number | null;
    /** @format date-time */
    date?: string | null;
    start?: string | null;
    end?: string | null;
    /** @format double */
    time?: number | null;
    invoiceable?: boolean;
    /** @format int32 */
    registrationType?: number | null;
    /** @format int32 */
    forecastEstimate?: number | null;
  }
  
  export interface EditRequestsRequestDTO {
    /** @format int32 */
    id?: number;
    title?: string | null;
    shortDescription?: string | null;
    /** @format int32 */
    registrationId?: number | null;
    /** @format int32 */
    estimatedHours?: number | null;
    createRegistrationRequestDTO?: CreateRegistrationRequestDTO;
  }
  
  export interface EmployeeDTO {
    /** @format int32 */
    id?: number;
    email?: string | null;
    givenName?: string | null;
    surName?: string | null;
    allocatable?: boolean;
    /** @format int32 */
    invoiceTarget?: number | null;
    hireDate?: DateOnly;
    hiredWithVacation?: boolean | null;
  }
  
  export interface InvoiceDTO {
    /** @format int32 */
    invoiceId?: number;
    /** @format int32 */
    erpInvoiceId?: number | null;
    /** @format int32 */
    customerId?: number;
    headline?: string | null;
    /** @format date-time */
    invoiceDate?: string | null;
    savedToERP?: boolean;
  }
  
  export interface InvoiceLineDTO {
    /** @format int32 */
    invoiceLineId?: number;
    /** @format int32 */
    itemNumber?: number | null;
    lineText?: string | null;
    /** @format float */
    numberOfUnits?: number | null;
    /** @format float */
    unitPrice?: number | null;
  }
  
  export interface InvoiceLineRegistrationDTO {
    /** @format int32 */
    invoiceLineId?: number;
    /** @format int32 */
    registrationId?: number;
  }
  
  export interface PhaseDTO {
    /** @format int32 */
    id?: number;
    title?: string | null;
    /** @format int32 */
    projectId?: number;
  }
  
  export interface ProblemDetails {
    type?: string | null;
    title?: string | null;
    /** @format int32 */
    status?: number | null;
    detail?: string | null;
    instance?: string | null;
    [key: string]: any;
  }
  
  export interface ProjectDTO {
    /** @format int32 */
    id?: number;
    name?: string | null;
    /** @format int32 */
    customerId?: number | null;
    /** @format int32 */
    hourlyRate?: number | null;
    invoiceable?: boolean;
    /** @format int32 */
    projectStatus?: number;
  }
  
  export interface ProjectStatusDTO {
    /** @format int32 */
    id?: number;
    name?: string | null;
  }
  
  export interface RegistrationDTO {
    /** @format int32 */
    id?: number;
    shortDescription?: string | null;
    description?: string | null;
    /** @format int32 */
    projectId?: number | null;
    /** @format int32 */
    phaseId?: number | null;
    /** @format date-time */
    date?: string | null;
    start?: string | null;
    end?: string | null;
    /** @format double */
    time?: number | null;
    invoiceable?: boolean;
    employee?: string | null;
    /** @format int32 */
    registrationType?: number | null;
    /** @format int32 */
    forecastEstimate?: number | null;
  }
  
  export interface RegistrationTypeDTO {
    /** @format int32 */
    id?: number;
    name?: string | null;
  }
  
  export interface RequestsDTO {
    /** @format int32 */
    id?: number;
    title?: string | null;
    shortDescription?: string | null;
    /** @format int32 */
    registrationId?: number | null;
    accepted?: boolean | null;
    /** @format int32 */
    estimatedHours?: number | null;
  }
  
  export type QueryParamsType = Record<string | number, any>;
  export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;
  
  export interface FullRequestParams extends Omit<RequestInit, "body"> {
    /** set parameter to `true` for call `securityWorker` for this request */
    secure?: boolean;
    /** request path */
    path: string;
    /** content type of request body */
    type?: ContentType;
    /** query params */
    query?: QueryParamsType;
    /** format of response (i.e. response.json() -> format: "json") */
    format?: ResponseFormat;
    /** request body */
    body?: unknown;
    /** base url */
    baseUrl?: string;
    /** request cancellation token */
    cancelToken?: CancelToken;
  }
  
  export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;
  
  export interface ApiConfig<SecurityDataType = unknown> {
    baseUrl?: string;
    baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
    securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
    customFetch?: typeof fetch;
  }
  
  export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
    data: D;
    error: E;
  }
  
  type CancelToken = Symbol | string | number;
  
  export enum ContentType {
    Json = "application/json",
    FormData = "multipart/form-data",
    UrlEncoded = "application/x-www-form-urlencoded",
    Text = "text/plain",
  }
  
  export class HttpClient<SecurityDataType = unknown> {
    public baseUrl: string = "";
    private securityData: SecurityDataType | null = null;
    private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
    private abortControllers = new Map<CancelToken, AbortController>();
    private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);
  
    private baseApiParams: RequestParams = {
      credentials: "same-origin",
      headers: {},
      redirect: "follow",
      referrerPolicy: "no-referrer",
    };
  
    constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
      Object.assign(this, apiConfig);
    }
  
    public setSecurityData = (data: SecurityDataType | null) => {
      this.securityData = data;
    };
  
    protected encodeQueryParam(key: string, value: any) {
      const encodedKey = encodeURIComponent(key);
      return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
    }
  
    protected addQueryParam(query: QueryParamsType, key: string) {
      return this.encodeQueryParam(key, query[key]);
    }
  
    protected addArrayQueryParam(query: QueryParamsType, key: string) {
      const value = query[key];
      return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
    }
  
    protected toQueryString(rawQuery?: QueryParamsType): string {
      const query = rawQuery || {};
      const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
      return keys
        .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
        .join("&");
    }
  
    protected addQueryParams(rawQuery?: QueryParamsType): string {
      const queryString = this.toQueryString(rawQuery);
      return queryString ? `?${queryString}` : "";
    }
  
    private contentFormatters: Record<ContentType, (input: any) => any> = {
      [ContentType.Json]: (input: any) =>
        input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
      [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
      [ContentType.FormData]: (input: any) =>
        Object.keys(input || {}).reduce((formData, key) => {
          const property = input[key];
          formData.append(
            key,
            property instanceof Blob
              ? property
              : typeof property === "object" && property !== null
                ? JSON.stringify(property)
                : `${property}`,
          );
          return formData;
        }, new FormData()),
      [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
    };
  
    protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
      return {
        ...this.baseApiParams,
        ...params1,
        ...(params2 || {}),
        headers: {
          ...(this.baseApiParams.headers || {}),
          ...(params1.headers || {}),
          ...((params2 && params2.headers) || {}),
        },
      };
    }
  
    protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
      if (this.abortControllers.has(cancelToken)) {
        const abortController = this.abortControllers.get(cancelToken);
        if (abortController) {
          return abortController.signal;
        }
        return void 0;
      }
  
      const abortController = new AbortController();
      this.abortControllers.set(cancelToken, abortController);
      return abortController.signal;
    };
  
    public abortRequest = (cancelToken: CancelToken) => {
      const abortController = this.abortControllers.get(cancelToken);
  
      if (abortController) {
        abortController.abort();
        this.abortControllers.delete(cancelToken);
      }
    };
  
    public request = async <T = any, E = any>({
      body,
      secure,
      path,
      type,
      query,
      format,
      baseUrl,
      cancelToken,
      ...params
    }: FullRequestParams): Promise<HttpResponse<T, E>> => {
      const secureParams =
        ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
          this.securityWorker &&
          (await this.securityWorker(this.securityData))) ||
        {};
      const requestParams = this.mergeRequestParams(params, secureParams);
      const queryString = query && this.toQueryString(query);
      const payloadFormatter = this.contentFormatters[type || ContentType.Json];
      const responseFormat = format || requestParams.format;
  
      return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        },
        signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
        body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
      }).then(async (response) => {
        const r = response.clone() as HttpResponse<T, E>;
        r.data = null as unknown as T;
        r.error = null as unknown as E;
  
        const data = !responseFormat
          ? r
          : await response[responseFormat]()
              .then((data) => {
                if (r.ok) {
                  r.data = data;
                } else {
                  r.error = data;
                }
                return r;
              })
              .catch((e) => {
                r.error = e;
                return r;
              });
  
        if (cancelToken) {
          this.abortControllers.delete(cancelToken);
        }
  
        if (!response.ok) throw data;
        return data;
      });
    };
  }
  
  /**
   * @title NGAGEFinancialBackendAPI
   * @version 1.0
   */
  export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    api = {
      /**
       * No description
       *
       * @tags Customers
       * @name CustomersList
       * @request GET:/api/customers
       */
      customersList: (params: RequestParams = {}) =>
        this.request<CustomerDTO[], any>({
          path: `/api/customers`,
          method: "GET",
          format: "json",
          ...params,
        }),
  
      /**
       * No description
       *
       * @tags Customers
       * @name CustomersCreate
       * @request POST:/api/customers
       */
      customersCreate: (data: CreateCustomerRequestDTO, params: RequestParams = {}) =>
        this.request<void, any>({
          path: `/api/customers`,
          method: "POST",
          body: data,
          type: ContentType.Json,
          ...params,
        }),
  
      /**
       * No description
       *
       * @tags Customers
       * @name CustomersActiveList
       * @request GET:/api/customers/active
       */
      customersActiveList: (params: RequestParams = {}) =>
        this.request<CustomerDTO[], any>({
          path: `/api/customers/active`,
          method: "GET",
          format: "json",
          ...params,
        }),
  
      /**
       * No description
       *
       * @tags Customers
       * @name CustomersUpdate
       * @request PUT:/api/customers/{id}
       */
      customersUpdate: (id: number, data: EditCustomerRequestDTO, params: RequestParams = {}) =>
        this.request<void, ProblemDetails>({
          path: `/api/customers/${id}`,
          method: "PUT",
          body: data,
          type: ContentType.Json,
          ...params,
        }),
  
      /**
       * No description
       *
       * @tags Customers
       * @name CustomersDelete
       * @request DELETE:/api/customers/{id}
       */
      customersDelete: (id: number, params: RequestParams = {}) =>
        this.request<void, any>({
          path: `/api/customers/${id}`,
          method: "DELETE",
          ...params,
        }),
  
      /**
       * No description
       *
       * @tags Employee
       * @name EmployeeList
       * @request GET:/api/employee
       */
      employeeList: (params: RequestParams = {}) =>
        this.request<EmployeeDTO[], any>({
          path: `/api/employee`,
          method: "GET",
          format: "json",
          ...params,
        }),
  
      /**
       * No description
       *
       * @tags Invoice
       * @name InvoiceList
       * @request GET:/api/invoice
       */
      invoiceList: (params: RequestParams = {}) =>
        this.request<InvoiceDTO[], any>({
          path: `/api/invoice`,
          method: "GET",
          format: "json",
          ...params,
        }),
  
      /**
       * No description
       *
       * @tags Invoice
       * @name InvoiceCreate
       * @request POST:/api/invoice
       */
      invoiceCreate: (data: CreateInvoiceDTO, params: RequestParams = {}) =>
        this.request<void, ProblemDetails>({
          path: `/api/invoice`,
          method: "POST",
          body: data,
          type: ContentType.Json,
          ...params,
        }),
  
      /**
       * No description
       *
       * @tags Invoice
       * @name InvoiceUpdate
       * @request PUT:/api/invoice/{id}
       */
      invoiceUpdate: (id: number, data: EditInvoiceDTO, params: RequestParams = {}) =>
        this.request<void, ProblemDetails>({
          path: `/api/invoice/${id}`,
          method: "PUT",
          body: data,
          type: ContentType.Json,
          ...params,
        }),
  
      /**
       * No description
       *
       * @tags Invoice
       * @name InvoiceDelete
       * @request DELETE:/api/invoice/{id}
       */
      invoiceDelete: (id: number, params: RequestParams = {}) =>
        this.request<void, any>({
          path: `/api/invoice/${id}`,
          method: "DELETE",
          ...params,
        }),
  
      /**
       * No description
       *
       * @tags InvoiceLine_Registrations
       * @name InvoicelinesRegistrationsList
       * @request GET:/api/invoicelines_registrations
       */
      invoicelinesRegistrationsList: (params: RequestParams = {}) =>
        this.request<InvoiceLineRegistrationDTO[], any>({
          path: `/api/invoicelines_registrations`,
          method: "GET",
          format: "json",
          ...params,
        }),
  
      /**
       * No description
       *
       * @tags InvoiceLine_Registrations
       * @name InvoicelinesRegistrationsCreate
       * @request POST:/api/invoicelines_registrations
       */
      invoicelinesRegistrationsCreate: (data: CreateInvoiceLineRegistrationDTO, params: RequestParams = {}) =>
        this.request<void, ProblemDetails>({
          path: `/api/invoicelines_registrations`,
          method: "POST",
          body: data,
          type: ContentType.Json,
          ...params,
        }),
  
      /**
       * No description
       *
       * @tags InvoiceLine_Registrations
       * @name InvoicelinesRegistrationsDelete
       * @request DELETE:/api/invoicelines_registrations/{id}
       */
      invoicelinesRegistrationsDelete: (id: number, params: RequestParams = {}) =>
        this.request<void, any>({
          path: `/api/invoicelines_registrations/${id}`,
          method: "DELETE",
          ...params,
        }),
  
      /**
       * No description
       *
       * @tags invoiceLinesLine
       * @name InvoicelinesList
       * @request GET:/api/invoicelines
       */
      invoicelinesList: (params: RequestParams = {}) =>
        this.request<InvoiceLineDTO[], any>({
          path: `/api/invoicelines`,
          method: "GET",
          format: "json",
          ...params,
        }),
  
      /**
       * No description
       *
       * @tags invoiceLinesLine
       * @name InvoicelinesCreate
       * @request POST:/api/invoicelines
       */
      invoicelinesCreate: (data: CreateInvoiceLineDTO, params: RequestParams = {}) =>
        this.request<void, ProblemDetails>({
          path: `/api/invoicelines`,
          method: "POST",
          body: data,
          type: ContentType.Json,
          ...params,
        }),
  
      /**
       * No description
       *
       * @tags invoiceLinesLine
       * @name InvoicelinesUpdate
       * @request PUT:/api/invoicelines/{id}
       */
      invoicelinesUpdate: (id: number, data: EditInvoiceLineDTO, params: RequestParams = {}) =>
        this.request<void, ProblemDetails>({
          path: `/api/invoicelines/${id}`,
          method: "PUT",
          body: data,
          type: ContentType.Json,
          ...params,
        }),
  
      /**
       * No description
       *
       * @tags invoiceLinesLine
       * @name InvoicelinesDelete
       * @request DELETE:/api/invoicelines/{id}
       */
      invoicelinesDelete: (id: number, params: RequestParams = {}) =>
        this.request<void, any>({
          path: `/api/invoicelines/${id}`,
          method: "DELETE",
          ...params,
        }),
  
      /**
       * No description
       *
       * @tags Phase
       * @name PhaseList
       * @request GET:/api/phase
       */
      phaseList: (params: RequestParams = {}) =>
        this.request<PhaseDTO[], any>({
          path: `/api/phase`,
          method: "GET",
          format: "json",
          ...params,
        }),
  
      /**
       * No description
       *
       * @tags Phase
       * @name PhaseCreate
       * @request POST:/api/phase
       */
      phaseCreate: (data: CreatePhaseDTO, params: RequestParams = {}) =>
        this.request<void, ProblemDetails>({
          path: `/api/phase`,
          method: "POST",
          body: data,
          type: ContentType.Json,
          ...params,
        }),
  
      /**
       * No description
       *
       * @tags Phase
       * @name PhaseUpdate
       * @request PUT:/api/phase/{id}
       */
      phaseUpdate: (id: number, data: EditPhaseDTO, params: RequestParams = {}) =>
        this.request<void, any>({
          path: `/api/phase/${id}`,
          method: "PUT",
          body: data,
          type: ContentType.Json,
          ...params,
        }),
  
      /**
       * No description
       *
       * @tags Phase
       * @name PhaseDelete
       * @request DELETE:/api/phase/{id}
       */
      phaseDelete: (id: number, params: RequestParams = {}) =>
        this.request<void, any>({
          path: `/api/phase/${id}`,
          method: "DELETE",
          ...params,
        }),
  
      /**
       * No description
       *
       * @tags Projects
       * @name ProjectsList
       * @request GET:/api/projects
       */
      projectsList: (params: RequestParams = {}) =>
        this.request<ProjectDTO[], any>({
          path: `/api/projects`,
          method: "GET",
          format: "json",
          ...params,
        }),
  
      /**
       * No description
       *
       * @tags Projects
       * @name ProjectsCreate
       * @request POST:/api/projects
       */
      projectsCreate: (data: CreateProjectRequestDTO, params: RequestParams = {}) =>
        this.request<void, ProblemDetails>({
          path: `/api/projects`,
          method: "POST",
          body: data,
          type: ContentType.Json,
          ...params,
        }),
  
      /**
       * No description
       *
       * @tags Projects
       * @name ProjectsCustomerDetail
       * @request GET:/api/projects/customer/{id}
       */
      projectsCustomerDetail: (id: number, params: RequestParams = {}) =>
        this.request<ProjectDTO[], any>({
          path: `/api/projects/customer/${id}`,
          method: "GET",
          format: "json",
          ...params,
        }),
  
      /**
       * No description
       *
       * @tags Projects
       * @name ProjectsUpdate
       * @request PUT:/api/projects/{id}
       */
      projectsUpdate: (id: number, data: EditProjectRequestDTO, params: RequestParams = {}) =>
        this.request<void, ProblemDetails>({
          path: `/api/projects/${id}`,
          method: "PUT",
          body: data,
          type: ContentType.Json,
          ...params,
        }),
  
      /**
       * No description
       *
       * @tags Projects
       * @name ProjectsDelete
       * @request DELETE:/api/projects/{id}
       */
      projectsDelete: (id: number, params: RequestParams = {}) =>
        this.request<void, any>({
          path: `/api/projects/${id}`,
          method: "DELETE",
          ...params,
        }),
  
      /**
       * No description
       *
       * @tags ProjectStatus
       * @name ProjectStatusList
       * @request GET:/api/projectStatus
       */
      projectStatusList: (params: RequestParams = {}) =>
        this.request<ProjectStatusDTO[], any>({
          path: `/api/projectStatus`,
          method: "GET",
          format: "json",
          ...params,
        }),
  
      /**
       * No description
       *
       * @tags Registrations
       * @name RegistrationsList
       * @request GET:/api/registrations
       */
      registrationsList: (params: RequestParams = {}) =>
        this.request<RegistrationDTO[], any>({
          path: `/api/registrations`,
          method: "GET",
          format: "json",
          ...params,
        }),
  
      /**
       * No description
       *
       * @tags Registrations
       * @name RegistrationsCreate
       * @request POST:/api/registrations
       */
      registrationsCreate: (data: CreateRegistrationRequestDTO, params: RequestParams = {}) =>
        this.request<void, ProblemDetails>({
          path: `/api/registrations`,
          method: "POST",
          body: data,
          type: ContentType.Json,
          ...params,
        }),
  
      /**
       * No description
       *
       * @tags Registrations
       * @name RegistrationsEmployeeDetail
       * @request GET:/api/registrations/employee/{mail}
       */
      registrationsEmployeeDetail: (
        mail: string,
        query?: {
          /** @format date-time */
          startDate?: string;
          /** @format date-time */
          endDate?: string;
        },
        params: RequestParams = {},
      ) =>
        this.request<any, ProblemDetails>({
          path: `/api/registrations/employee/${mail}`,
          method: "GET",
          query: query,
          ...params,
        }),
  
      /**
       * No description
       *
       * @tags Registrations
       * @name RegistrationsDateList
       * @request GET:/api/registrations/date
       */
      registrationsDateList: (
        query?: {
          /** @format date-time */
          startDate?: string;
          /** @format date-time */
          endDate?: string;
        },
        params: RequestParams = {},
      ) =>
        this.request<RegistrationDTO[], any>({
          path: `/api/registrations/date`,
          method: "GET",
          query: query,
          format: "json",
          ...params,
        }),
  
      /**
       * No description
       *
       * @tags Registrations
       * @name RegistrationsTypeDetail
       * @request GET:/api/registrations/type/{type}
       */
      registrationsTypeDetail: (
        type: number,
        query?: {
          /** @format date-time */
          startDate?: string;
          /** @format date-time */
          endDate?: string;
        },
        params: RequestParams = {},
      ) =>
        this.request<RegistrationDTO[], any>({
          path: `/api/registrations/type/${type}`,
          method: "GET",
          query: query,
          format: "json",
          ...params,
        }),
  
      /**
       * No description
       *
       * @tags Registrations
       * @name RegistrationsUpdate
       * @request PUT:/api/registrations/{id}
       */
      registrationsUpdate: (id: number, data: EditRegistrationRequestDTO, params: RequestParams = {}) =>
        this.request<void, ProblemDetails>({
          path: `/api/registrations/${id}`,
          method: "PUT",
          body: data,
          type: ContentType.Json,
          ...params,
        }),
  
      /**
       * No description
       *
       * @tags Registrations
       * @name RegistrationsDelete
       * @request DELETE:/api/registrations/{id}
       */
      registrationsDelete: (id: number, params: RequestParams = {}) =>
        this.request<void, any>({
          path: `/api/registrations/${id}`,
          method: "DELETE",
          ...params,
        }),
  
      /**
       * No description
       *
       * @tags RegistrationType
       * @name RegistrationTypeList
       * @request GET:/api/registrationType
       */
      registrationTypeList: (params: RequestParams = {}) =>
        this.request<RegistrationTypeDTO[], any>({
          path: `/api/registrationType`,
          method: "GET",
          format: "json",
          ...params,
        }),
  
      /**
       * No description
       *
       * @tags Request
       * @name RequestsList
       * @request GET:/api/Requests
       */
      requestsList: (params: RequestParams = {}) =>
        this.request<RequestsDTO[], any>({
          path: `/api/Requests`,
          method: "GET",
          format: "json",
          ...params,
        }),
  
      /**
       * No description
       *
       * @tags Request
       * @name RequestsCreate
       * @request POST:/api/Requests
       */
      requestsCreate: (data: CreateRequestRequstDTO, params: RequestParams = {}) =>
        this.request<void, ProblemDetails>({
          path: `/api/Requests`,
          method: "POST",
          body: data,
          type: ContentType.Json,
          ...params,
        }),
  
      /**
       * No description
       *
       * @tags Request
       * @name RequestsUpdate
       * @request PUT:/api/Requests/{id}
       */
      requestsUpdate: (id: number, data: EditRequestsRequestDTO, params: RequestParams = {}) =>
        this.request<void, ProblemDetails>({
          path: `/api/Requests/${id}`,
          method: "PUT",
          body: data,
          type: ContentType.Json,
          ...params,
        }),
  
      /**
       * No description
       *
       * @tags Request
       * @name RequestsDelete
       * @request DELETE:/api/Requests/{id}
       */
      requestsDelete: (id: number, params: RequestParams = {}) =>
        this.request<void, any>({
          path: `/api/Requests/${id}`,
          method: "DELETE",
          ...params,
        }),
  
      /**
       * No description
       *
       * @tags Request
       * @name RequestsAcceptPartialUpdate
       * @request PATCH:/api/Requests/{id}/accept
       */
      requestsAcceptPartialUpdate: (id: number, data: AcceptRequestRequestDTO, params: RequestParams = {}) =>
        this.request<void, ProblemDetails>({
          path: `/api/Requests/${id}/accept`,
          method: "PATCH",
          body: data,
          type: ContentType.Json,
          ...params,
        }),
  
      /**
       * No description
       *
       * @tags Request
       * @name RequestsRejectPartialUpdate
       * @request PATCH:/api/Requests/{id}/reject
       */
      requestsRejectPartialUpdate: (id: number, params: RequestParams = {}) =>
        this.request<void, ProblemDetails>({
          path: `/api/Requests/${id}/reject`,
          method: "PATCH",
          ...params,
        }),
    };
  }
  