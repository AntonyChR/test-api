import { HTTPMethod, IResponse } from "../context";

export async function makeRequest(requestConfig:{method: HTTPMethod, url: string} ): Promise<IResponse> {
    const {method, url} = requestConfig;
    try {

        const start = performance.now()
        const resp = await fetch(url, { method });
        const end = performance.now();
        const responseTimeInMiliseconds = Math.floor(end - start);

        const data = await resp.json(); 
        
        return {
            method,
            requestStatus: 'success',
            responseData: data,
            responseTimeInMiliseconds,
            status:resp.status
        };
    }catch(error){
        return {
            method,
            requestStatus: 'error',
            responseData: null,
            responseTimeInMiliseconds: null,
            status: null
        };
    }
}