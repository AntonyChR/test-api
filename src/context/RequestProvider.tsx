import { FC, ReactNode, useReducer } from "react"
import { RequestContext } from "./"
import { requestReducer } from "./"
import { RequestStateProperties } from "./"

interface RequestProviderProps{
    children: ReactNode
}

const INITIAL_STATE = {
    requestHistory: null,
    request:{
        status       : 200,
        responseData : null,
        method       : 'GET',
        requestStatus: null,
        loading      : false, 
        responseTimeInSeconds: 0,
    }
}
export const RequestProvider:FC<RequestProviderProps> = ({children}) => {
    const [state, dispatch] = useReducer(requestReducer, INITIAL_STATE as RequestStateProperties);

    function setLoading (){

    }
    return (
        <RequestContext.Provider value={{...state, setLoading}}>
            {children}
        </RequestContext.Provider>
    )
}