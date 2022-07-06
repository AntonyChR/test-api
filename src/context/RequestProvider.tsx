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
        requestTime:''
    },
};
export const RequestProvider: FC<RequestProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(
        requestReducer,
        INITIAL_STATE as RequestStateProperties
    );

    function setLoading(isLoading: boolean) {
        dispatch({ type: '[Request] change loading', payload: isLoading });
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

    return (
        <RequestContext.Provider
            value={{
                ...state,

                //methods
                setLoading,
                setResponse,
                addRequestToHistory,
                setRequestFinished,
            }}
        >
            {children}
        </RequestContext.Provider>
    );
};
