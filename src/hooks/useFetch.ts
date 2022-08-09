import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useState } from 'react';
import { HTTPMethod } from '../context';
import { getCurrentTime } from '../helpers';

export const useFetch = () => {
    const [abortController, setAbort] = useState<AbortController | undefined>(
        undefined
    );

    const runRequest = async (url: string, method: HTTPMethod) => {
        const newAbortController = new AbortController();
        setAbort(newAbortController);

        const requestTime = getCurrentTime();
        const start = performance.now();
        const config: AxiosRequestConfig = {
            url,
            method,
            signal: newAbortController.signal,
            validateStatus(status) {
                return true;
            },
        };
        const response = await axios(config);

        const end = performance.now();
        const responseTimeInMiliseconds = Math.floor(end - start);

        return {
            requestTime,
            url,
            method,
            responseData: response.data,
            responseTimeInMiliseconds,
            status: response.status,
            ok: response.status < 400,
        };
    };

    return { abortController, runRequest };
};
