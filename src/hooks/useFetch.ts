import { useState } from "react"
import { HTTPMethod } from "../context";
import { getCurrentTime } from "../helpers";

export const useFetch = () => {
    const [abortController, setAbort] = useState<AbortController | undefined>(undefined);

    const runRequest = async (url: string, method: HTTPMethod) => {
        const newAbortController = new AbortController();
        setAbort(newAbortController);

        const mode = url.includes('http://localhost') ? 'no-cors':'cors';
        const requestTime  = getCurrentTime();
        const start        = performance.now();
        const response     = await fetch(url, { method, mode, signal: newAbortController.signal});
        const end          = performance.now();
        const responseText = await response.clone().text();
        const statusText   = response.statusText || (response.ok ? 'success' : 'error');
        const responseTimeInMiliseconds = Math.floor(end - start);
        let data = null;

        try {
            if(response.ok) data = await response.json();
        } catch (error) {
            if (data === null && responseText) data = responseText;
        }

        return {
            requestTime,
            url,
            method,
            statusText,
            responseData: data,
            responseTimeInMiliseconds,
            status: response.status,
            ok: response.status < 400
        };
    }

    return { abortController, runRequest }
}
