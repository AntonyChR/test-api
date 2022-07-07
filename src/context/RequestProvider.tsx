import { FC, ReactNode, useEffect, useReducer } from 'react';
import { RequestContext } from './';
import { requestReducer } from './';
import { RequestStateProperties } from './';
import { IResponse } from './types';

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

    function setLoading(url: string) {
        dispatch({ type: '[Request] loading', payload: url });
    }
    function setResponse(r: IResponse) {
        dispatch({ type: '[Request] set response', payload: r });
    }

    function addRequestToHistory(r: IResponse) {
        dispatch({ type: '[History] add request', payload: r });
    }

    function setRequestFinished(r: IResponse) {
        dispatch({
            type: '[State] finished request',
            payload: { laoding: false, response: r },
        });
    }

    const abortController = new AbortController();

    function abortRequest() {
        abortController.abort();
        dispatch({
            type: '[Request] cancel request',
        });
    }

    return (
        <RequestContext.Provider
            value={{
                ...state,
                abortController,

                //methods
                setLoading,
                setResponse,
                addRequestToHistory,
                setRequestFinished,
                abortRequest,
            }}
        >
            {children}
        </RequestContext.Provider>
    );
};
