import { actionTypes, RequestAction } from "./actionTypes";
import { RequestStateProperties } from "./types";


export function requestReducer(state: RequestStateProperties, action: RequestAction): RequestStateProperties {
    switch (action.type) {
        case actionTypes.Start:
            return { ...state, loading: true,request:{...state.request, ...action.payload}};
        case actionTypes.Set:
            return { ...state, request: action.payload, loading:false };
        case actionTypes.Cancel:
            return { ...state, loading: false, request: { ...state.request, responseData: 'Canceled'} }
        case actionTypes.AddToHistory:
            return { ...state, requestHistory: [action.payload, ...state.requestHistory] };
        case actionTypes.ClearHistory:
            return {...state, requestHistory:[]}
        case actionTypes.AddCookies:
            return {...state, request:{...state.request, cookies: action.payload}}
        case actionTypes.SetBody:
            return {...state, request:{...state.request, body: action.payload}}
        default:
            return state
    }
}
