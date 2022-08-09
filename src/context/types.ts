export interface RequestState extends RequestStateMethods, RequestStateProperties {}

export interface RequestStateMethods {
    abortRequest: Function;
    makeRequest: Function;
    setRequest: Function;
    clearHistory: Function;
}

export interface RequestStateProperties{
    requestHistory: IRequest[] | [];
    request: IRequest;
    loading:boolean;
    abortController: AbortController;
}

export interface IRequest{
    url                      : string;
    status                   : Number | null,
    responseData             : any,
    method                   : HTTPMethod,
    responseTimeInMiliseconds: Number | null,
    requestTime              : string;
    ok: boolean;

}

export type StatusText = 'success' | 'error' | 'canceled' | string;

export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';