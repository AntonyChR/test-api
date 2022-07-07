import { HTTPMethod, IResponse, StatusText } from "../context";

export async function makeRequest(requestConfig: { method: HTTPMethod, url: string, abortController:AbortController }): Promise<IResponse> {
    const { method, url, abortController } = requestConfig;
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const start = performance.now()
    const response = await fetch(url, { method, signal:abortController.signal });
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

    return {
        requestTime: `${hours}:${minutes}:${seconds}`,
        url,
        method,
        statusText,
        responseData: data,
        responseTimeInMiliseconds,
        status: response.status
    };

}