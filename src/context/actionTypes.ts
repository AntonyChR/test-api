import { IResponse } from "./types";

export type RequestActionTypes = 
    | {type: '[Request] start', payload: string}
    | {type: '[Request] cancel request'}
    | {type: '[Request] set response',   payload: IResponse}
    | {type: '[History] add request',    payload: IResponse}
    | {type: '[History] clear history'}