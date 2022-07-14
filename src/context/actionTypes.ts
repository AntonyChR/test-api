import { IRequest } from "./types";

export type RequestActionTypes = 
    | {type: '[Request] start', payload: string}
    | {type: '[Request] cancel request'}
    | {type: '[Request] set request', payload: IRequest}
    | {type: '[History] add request', payload: IRequest}
    | {type: '[History] clear history'}