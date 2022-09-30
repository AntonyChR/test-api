import { FC, ReactNode, useReducer } from 'react';
import {clearCookies, saveCookies} from '../helpers/cookies';
import { useFetch } from '../hooks';
import { RequestContext } from './';
import { requestReducer } from './';
import { RequestStateProperties } from './';
import { HTTPMethod, IRequest } from './';

import {actionTypes, ICookies} from './'


interface RequestProviderProps {
    children: ReactNode;
}

export const INITIAL_STATE:RequestStateProperties
 = {
    requestHistory: [],
    loading: false,
    request: {
        url         : '',
        status      : null,
        responseData: null,
        method      : 'GET',
        ok          : false,
        requestTime: '',
        cookies:{
            send: true,
            values: [{ cookieKey_0: '', cookieValue_0: '' }],
        },
        body:{key:"value"},
        responseTimeInMiliseconds: null,
    },
};
export const RequestProvider: FC<RequestProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(requestReducer, INITIAL_STATE);

    function setRequest(r: IRequest) {
        dispatch({ type: actionTypes.Set, payload: r });
    }

    function addRequestToHistory(r: IRequest) {
        dispatch({ type: actionTypes.AddToHistory, payload: r });
    }

    function startRequest(url: string, method: HTTPMethod) {
        dispatch({ type: actionTypes.Start, payload: {url,method} });
    }

    const { runRequest, abortController } = useFetch();

    function abortRequest() {
        abortController?.abort();
        dispatch({ type: actionTypes.Cancel });
    }

    function addCookies(c: ICookies){
        dispatch({type:actionTypes.AddCookies, payload: c})
    }

    async function makeRequest(url: string, method: HTTPMethod) {
        if(state.request.cookies.send){
            saveCookies(state.request.cookies.values)
        }
        startRequest(url, method);
        const reponseData = await runRequest(url, method,state.request.body,state.request.cookies.send);
        setRequest({...state.request, ...reponseData});
        addRequestToHistory({...state.request, ...reponseData});
        clearCookies(state.request.cookies.values)
    }

    function setBody(body:any){
        dispatch({type:actionTypes.SetBody, payload:body})
    }

    function clearHistory() {
        dispatch({ type: actionTypes.ClearHistory});
    }
    return (
        <RequestContext.Provider
            value={{
                ...state,

                //methods
                clearHistory,
                setRequest,
                makeRequest,
                abortRequest,
                addCookies,
                setBody
            }}
        >
            {children}
        </RequestContext.Provider>
    );
};
