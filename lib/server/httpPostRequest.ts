import axios from "axios";
import FormData from "form-data"

export default function httpPostRequest(endpointUrl: string, token: string, data: Record<string, any> = {}, headers: Record<string, any> = {}){
    var formdata = new FormData();

    for(let [key,value] of Object.entries(data)){
        formdata.append(key,value)
    }

    headers = {
        "content-Type":"multipart/form-data",
        ...headers
    };
    
    headers = {
        ...headers,
        'Authorization': `Bearer ${token}`
    }

    return axios({
        method: "POST",
        url: endpointUrl,
        headers,
        data: formdata
    });
}