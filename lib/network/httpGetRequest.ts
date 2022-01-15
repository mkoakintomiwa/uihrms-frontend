import axios from "axios";

export default function httpGetRequest(endpointUrl: string, data: Record<string, any> = {}, headers: Record<string, any> = {}){

    let token = localStorage.getItem("token");

    if (token){
        headers = {
            ...headers,
            'Authorization': `Bearer ${token}`
        }
    }

    return axios({
        method: "GET",
        url: endpointUrl,
        headers,
        params: data
    });
}