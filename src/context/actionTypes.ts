import { ICookies, HTTPMethod, IRequest } from './types';


export enum actionTypes {
    Start        = '[Request] start',
    Cancel       = '[Request] cancel request',
    Set          = '[Request] set request',
    AddCookies   = '[Request] add cookies',
    AddToHistory = '[History] add request',
    ClearHistory = '[History] clear history',
}

interface StartPayload {
    url: string;
    method: HTTPMethod
}
export type RequestAction =
    | { type: actionTypes.Start; payload: StartPayload }
    | { type: actionTypes.Set; payload: IRequest}
    | { type: actionTypes.AddToHistory; payload: IRequest}
    | { type: actionTypes.Cancel }
    | { type: actionTypes.ClearHistory}
    | { type: actionTypes.AddCookies; payload: ICookies}
