import axios from "axios";

export default function httpPostRequest(endpointUrl: string, data: Record<string, any> = {}){
    var formdata = new FormData();

    for(let [key,value] of Object.entries(data)){
        formdata.append(key,value)
    }
    return axios({
        method: "POST",
        url: endpointUrl,
        headers: {
            "content-Type":"multipart/form-data"
        },
        "data": formdata
    })
}