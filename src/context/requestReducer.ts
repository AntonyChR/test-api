import { RequestActionTypes } from "./actionTypes";
import { RequestStateProperties } from "./types";


export function requestReducer(state: RequestStateProperties, action: RequestActionTypes): RequestStateProperties {
    switch (action.type) {
        case '[Request] start':
            return { ...state, loading: true,request:{...state.request, url: action.payload}};
        case '[Request] set request':
            return { ...state, request: action.payload, loading:false };
        case '[Request] cancel request':
            return { ...state, loading: false, request: { ...state.request, responseData: 'Canceled'} }
        case '[History] add request':
            return { ...state, requestHistory: [action.payload, ...state.requestHistory] };
        case '[History] clear history':
            return {...state, requestHistory:[]}
        default:
            return state
    }
}
