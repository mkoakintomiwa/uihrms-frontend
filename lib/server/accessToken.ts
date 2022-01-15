import getCookie from "./getCookie";

export default function accessToken(req: any){
    return getCookie("token",req.headers.cookie) || "";
}