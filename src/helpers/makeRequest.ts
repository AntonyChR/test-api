import { HTTPMethod, IResponse, StatusText } from "../context";

function handleErrors(response: Response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}
export async function makeRequest(requestConfig: { method: HTTPMethod, url: string }): Promise<IResponse> {
    const { method, url } = requestConfig;
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const start = performance.now()
    const resp = await fetch(url, { method });
    const end = performance.now();

    const responseTimeInMiliseconds = Math.floor(end - start);

    const statusText = resp.statusText || (resp.ok? 'success': 'error')
    let data=null;
    try{
        data = (resp.ok)? await resp.json() :null;
    }catch(error){

    }


    return {
        requestTime: `${hours}:${minutes}:${seconds}`,
        url,
        method,
        statusText,
        responseData: data,
        responseTimeInMiliseconds,
        status: resp.status
    };

}