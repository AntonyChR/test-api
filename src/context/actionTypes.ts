import { IResponse } from "./types";

export type RequestActionTypes = 
    | {type: '[Request] change loading', payload: boolean}
    | {type: '[Request] set response', payload: IResponse}
    | {type: '[History] add request', payload: IResponse}