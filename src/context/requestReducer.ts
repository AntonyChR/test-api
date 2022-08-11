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
        default:
            return state
    }
}
