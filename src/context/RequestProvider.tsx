import { FC, ReactNode, useEffect, useReducer } from 'react';
import { getCurrentTime } from '../helpers';
import { useFetch } from '../hooks';
import { RequestContext } from './';
import { requestReducer } from './';
import { RequestStateProperties } from './';
import { HTTPMethod, IResponse } from './types';

interface RequestProviderProps {
    children: ReactNode;
}

const INITIAL_STATE = {
    requestHistory: [],
    loading: false,
    request: {
        url: '',
        status: null,
        responseData: null,
        method: 'GET',
        statusText: '',
        responseTimeInMiliseconds: null,
        requestTime: '',
    },
};
export const RequestProvider: FC<RequestProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(
        requestReducer,
        INITIAL_STATE as RequestStateProperties
    );

    function setResponse(r: IResponse) {
        dispatch({ type: '[Request] set response', payload: r });
    }

    function addRequestToHistory(r:IResponse){
        dispatch({type: '[History] add request', payload:r})
    }

    const startRequest = (url: string) =>
        dispatch({ type: '[Request] start', payload: url });

    const { runRequest, abortController } = useFetch();
    function abortRequest() {
        abortController?.abort();
        dispatch({
            type: '[Request] cancel request',
        });
    }

    async function makeRequest(url:string, method:HTTPMethod) {
        startRequest(url);
        const response = await runRequest(url, method);
        setResponse(response);  
        addRequestToHistory(response);                      
    }
    return (
        <RequestContext.Provider
            value={{
                ...state,

                //methods
                setResponse,
                makeRequest,
                abortRequest,
            }}
        >
            {children}
        </RequestContext.Provider>
    );
};
