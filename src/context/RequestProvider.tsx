import { FC, ReactNode, useReducer } from 'react';
import { useFetch } from '../hooks';
import { RequestContext } from './';
import { requestReducer } from './';
import { RequestStateProperties } from './';
import { HTTPMethod, IRequest } from './types';

import {actionTypes} from './'


interface RequestProviderProps {
    children: ReactNode;
}

const INITIAL_STATE:RequestStateProperties
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

    function startRequest(url: string) {
        dispatch({ type: actionTypes.Start, payload: url });
    }

    const { runRequest, abortController } = useFetch();

    function abortRequest() {
        abortController?.abort();
        dispatch({ type: actionTypes.Cancel });
    }

    async function makeRequest(url: string, method: HTTPMethod) {
        startRequest(url);
        const request = await runRequest(url, method);
        setRequest(request);
        addRequestToHistory(request);
        console.clear();
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
            }}
        >
            {children}
        </RequestContext.Provider>
    );
};
