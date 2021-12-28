import axios from "axios";

export default function httpPostRequest(endpointUrl: string, data: Record<string, any> = {}, headers: Record<string, any> = {}){
    var formdata = new FormData();

    for(let [key,value] of Object.entries(data)){
        formdata.append(key,value)
    }

    headers = {
        "content-Type":"multipart/form-data",
        ...headers
    };

    let token = localStorage.getItem("token");

    if (token){
        headers = {
            ...headers,
            'Authorization': `Bearer ${token}`
        }
    }

    return axios({
        method: "POST",
        url: endpointUrl,
        headers,
        data: formdata
    });
}