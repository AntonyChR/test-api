export interface RequestState extends RequestStateMethods, RequestStateProperties {}

export interface RequestStateMethods {
    abortRequest: ()=>void;
    makeRequest: (url: string, method: HTTPMethod)=>void;
    setRequest: (r: IRequest)=>void;
    clearHistory: ()=>void;
    addCookies: (c: ICookies)=>void;
}

export interface RequestStateProperties{
    requestHistory: IRequest[];
    request: IRequest;
    loading:boolean;
}

export interface IRequest{
    url                      : string;
    status                   : Number | null;
    responseData             : any;
    method                   : HTTPMethod;
    responseTimeInMiliseconds: Number | null;
    requestTime              : string;
    cookies                  : ICookies;
    ok: boolean;
}

export interface ICookies {
    send: boolean;
    values: CookieValue[]; 
}
export interface CookieValue {
    [key:string]: string;
}

export type StatusText = 'success' | 'error' | 'canceled' | string;

export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
