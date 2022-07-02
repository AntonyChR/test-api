export interface RequestState extends RequestStateMethods, RequestStateProperties {}


export interface RequestStateMethods {
    setLoading: Function;
}

export interface RequestStateProperties{
    requestHistory: IRequest[] | null;
    request: IRequest;
}

export interface IRequest{
    status       : Number,
    responseData : any,
    method       : HTTPMethod,
    requestStatus: 'success' | 'error' | null,
    loading      : boolean, 
    responseTimeInSeconds: Number,
}

export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';