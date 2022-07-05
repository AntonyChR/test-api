export interface RequestState extends RequestStateMethods, RequestStateProperties {}

export interface RequestStateMethods {
    setLoading: Function;
    setResponse: Function;
    addRequestToHistory: Function;
    setFinishedRequest: Function;
}

export interface RequestStateProperties{
    requestHistory: IResponse[] | [];
    request: IResponse;
    loading:boolean;
}

export interface IResponse{
    url          : string;
    status       : Number | null,
    responseData : any,
    method       : HTTPMethod,
    statusText: StatusText,
    responseTimeInMiliseconds: Number | null,
    requestTime: string;

}
export type StatusText = 'success' | 'error' | string;

export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';