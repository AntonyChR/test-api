import { useState } from "react"
import { HTTPMethod } from "../context";
import { getCurrentTime } from "../helpers";

export const useFetch = () => {
    const [abortController, setAbort] = useState<AbortController | undefined>(undefined);

    const runRequest = async (url: string, method: HTTPMethod) => {
        const newAbortController = new AbortController();
        const signal = newAbortController.signal;
        setAbort(newAbortController);

        const requestTime = getCurrentTime();

        const start = performance.now();
        const response = await fetch(url, { method, signal});
        const end = performance.now();

        const responseText = await response.clone().text();

        const responseTimeInMiliseconds = Math.floor(end - start);

        const statusText =
            response.statusText || (response.ok ? 'success' : 'error');
        let data = null;

        try {
            if(response.ok){
                data = await response.json();
            }
            
        } catch (error) {
            if (data === null && responseText) {
                data = responseText;
            }
        }

        return {
            requestTime,
            url,
            method,
            statusText,
            responseData: data,
            responseTimeInMiliseconds,
            status: response.status,
        };

    }

    return { abortController, runRequest }
}