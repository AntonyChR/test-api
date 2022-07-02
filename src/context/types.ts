export interface RequestState extends RequestStateMethods, RequestStateProperties {}


export interface RequestStateMethods {
    setLoading: Function;
    setResponse: Function;
    addRequestToHistory: Function;
}

export interface RequestStateProperties{
    requestHistory: IResponse[] | [];
    request: IResponse;
    loading:boolean;
}

export interface IResponse{
    status       : Number | null,
    responseData : any,
    method       : HTTPMethod,
    requestStatus: 'success' | 'error' | null,
    responseTimeInMiliseconds: Number | null,
}

export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';