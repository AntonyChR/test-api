import { RequestActionTypes } from "./actionTypes";
import { RequestStateProperties } from "./types";


export function requestReducer(state: RequestStateProperties, action: RequestActionTypes): RequestStateProperties {
    switch (action.type) {
        case '[Request] change loading':
            return { ...state, loading: action.payload };
        case '[Request] set response':
            return { ...state, request: action.payload };
        case '[History] add request':
            return {...state, requestHistory:[action.payload, ...state.requestHistory]}
        default:
            return state
    }
}