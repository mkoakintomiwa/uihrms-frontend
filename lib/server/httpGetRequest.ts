import axios from "axios";

export default function httpGetRequest(endpointUrl: string, token: string, data: Record<string, any> = {}, headers: Record<string, any> = {}){
    
    headers = {
        ...headers,
        'Authorization': `Bearer ${token}`
    }
    

    return axios({
        method: "GET",
        url: endpointUrl,
        headers,
        params: data
    });
}