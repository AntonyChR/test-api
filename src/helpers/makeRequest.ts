import { HTTPMethod, IResponse, StatusText } from "../context";

function handleErrors(response: Response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}
export async function makeRequest({ method, url }: { method: HTTPMethod, url: string }): Promise<IResponse> {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const start = performance.now()
    const response = await fetch(url, { method });
    const response2 =  await response.clone().text();
    
    const end = performance.now();
    
    const responseTimeInMiliseconds = Math.floor(end - start);
    
    const statusText = response.statusText || (response.ok? 'success': 'error')
    let data=null;
    try{
        data = (response.ok)? await response.json() :null;
    }catch(error){

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