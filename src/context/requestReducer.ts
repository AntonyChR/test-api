import { RequestActionTypes } from "./actionTypes";
import { RequestStateProperties } from "./types";


export function requestReducer(state: RequestStateProperties, action: RequestActionTypes): RequestStateProperties {
    switch (action.type) {
        case '[Request] start':
            return { ...state, loading: true};
        case '[Request] set request':
            return { ...state, request: action.payload, loading:false };
        case '[Request] cancel request':
            return { ...state, loading: false, request: { ...state.request, responseData: null, statusText: 'canceled' } }
        case '[History] add request':
            return { ...state, requestHistory: [action.payload, ...state.requestHistory] };
        case '[History] clear history':
            return {...state, requestHistory:[]}
        default:
            return state
    }
}