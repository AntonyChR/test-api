import { IRequest } from './types';


export enum actionTypes {
    Start        = '[Request] start',
    Cancel       = '[Request] cancel request',
    Set          = '[Request] set request',
    AddToHistory = '[History] add request',
    ClearHistory = '[History] clear history',
}

export type RequestAction =
    | { type: actionTypes.Start; payload: string }
    | { type: actionTypes.Set; payload: IRequest}
    | { type: actionTypes.AddToHistory; payload: IRequest}
    | { type: actionTypes.Cancel }
    | { type: actionTypes.ClearHistory}
