import { FC, ReactNode, useEffect, useReducer } from 'react';
import { getCurrentTime } from '../helpers';
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

    function abortRequest() {
        dispatch({
            type: '[Request] cancel request',
        });
    }

    const startRequest = (url:string) => dispatch({type:'[Request] start', payload:url})



    async function makeRequest (url:string, method:HTTPMethod){
        startRequest(url);
        const requestTime = getCurrentTime();
        const start = performance.now()
        const response = await fetch(url, {
            method
        });
        const responseText = await response.clone().text();
        const end = performance.now();
    
        const responseTimeInMiliseconds = Math.floor(end - start);
    
        const statusText = response.statusText || (response.ok ? 'success' : 'error')
        let data = null;
    
        try {
            data = (response.ok) ? await response.json() : null;
        } catch (error) {
            if (data === null && responseText) {
                data = responseText;
            }
        }

        setResponse ({
            requestTime,
            url,
            method,
            statusText,
            responseData: data,
            responseTimeInMiliseconds,
            status: response.status
        });

    }

    return (
        <RequestContext.Provider
            value={{
                ...state,

                //methods
                makeRequest,
                abortRequest,
            }}
        >
            {children}
        </RequestContext.Provider>
    );
};
