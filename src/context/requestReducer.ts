import { RequestActionTypes } from "./actionTypes";
import { RequestStateProperties } from "./types";


export function requestReducer(state: RequestStateProperties, action: RequestActionTypes): RequestStateProperties {
    switch (action.type) {
        case '[Request] start':
            return { ...state, loading: true, request: { ...state.request, url: action.payload } };
        case '[Request] set response':
            return { ...state, request: action.payload, loading:false };
        case '[History] add request':
            return { ...state, requestHistory: [action.payload, ...state.requestHistory] };
        case '[State] finished request':
            return { ...state, request: action.payload.response, loading: action.payload.laoding, requestHistory: [action.payload.response, ...state.requestHistory] };
        case '[Request] cancel request':
            return { ...state, loading: false, request: { ...state.request, responseData: null, statusText: 'canceled' } }

        default:
            return state
    }
}