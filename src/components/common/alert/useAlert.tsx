import { useState } from "react";
import { alertTypes } from "./alertTypes";

export const useAlert = () => {
    const [alertState, setAlertState] = useState<{
        show: boolean;
        message: string;
        type: alertTypes;
    }>({ show: false, message: '', type: 'info' });

    const alertSuccess =  (message:string) =>{
        setAlertState({
            show: true,
            message,
            type: 'success',
        });
    }
    const alertError =  (message:string) =>{
        setAlertState({
            show: true,
            message,
            type: 'error',
        });
    }
    const alertWarning =  (message:string) =>{
        setAlertState({
            show: true,
            message,
            type: 'warning',
        });
    }
    const alertInfo =  (message:string) =>{
        setAlertState({
            show: true,
            message,
            type: 'info',
        });
    }

    const hideAlert = () => setAlertState({...alertState, show: false});

    return {
        alertState,
        alertError,
        alertInfo,
        alertSuccess,
        alertWarning,
        hideAlert
    }
};