export interface RequestState extends RequestStateMethods, RequestStateProperties {}

export interface RequestStateMethods {
    abortRequest: Function;
    makeRequest: Function;
    setResponse: Function;
    clearHistory: Function;
}

export interface RequestStateProperties{
    requestHistory: IResponse[] | [];
    request: IResponse;
    loading:boolean;
    abortController: AbortController;
}

export interface IResponse{
    url                      : string;
    status                   : Number | null,
    responseData             : any,
    method                   : HTTPMethod,
    statusText               : StatusText,
    responseTimeInMiliseconds: Number | null,
    requestTime              : string;
    ok: boolean;

}

export type StatusText = 'success' | 'error' | 'canceled' | string;

export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';