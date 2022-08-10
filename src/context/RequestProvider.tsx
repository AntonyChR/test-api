import { FC, ReactNode, useEffect, useReducer } from 'react';
import { useFetch } from '../hooks';
import { RequestContext } from './';
import { requestReducer } from './';
import { RequestStateProperties } from './';
import { HTTPMethod, IRequest } from './types';

interface RequestProviderProps {
    children: ReactNode;
}

const INITIAL_STATE:RequestStateProperties
 = {
    requestHistory: [],
    loading: false,
    request: {
        url: '',
        status: null,
        responseData: null,
        method: 'GET',
        responseTimeInMiliseconds: null,
        requestTime: '',
        ok: false,
    },
};
export const RequestProvider: FC<RequestProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(
        requestReducer,
        INITIAL_STATE);

    function setRequest(r: IRequest) {
        dispatch({ type: '[Request] set request', payload: r });
    }

    function addRequestToHistory(r: IRequest) {
        dispatch({ type: '[History] add request', payload: r });
    }

    function startRequest(url: string) {
        dispatch({ type: '[Request] start', payload: url });
    }

    const { runRequest, abortController } = useFetch();

    function abortRequest() {
        abortController?.abort();
        dispatch({ type: '[Request] cancel request' });
    }

    async function makeRequest(url: string, method: HTTPMethod) {
        startRequest(url);
        const request = await runRequest(url, method);
        setRequest(request);
        addRequestToHistory(request);
        console.clear();
    }

    function clearHistory() {
        dispatch({ type: '[History] clear history' });
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
