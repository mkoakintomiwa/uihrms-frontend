import { AxiosError } from "axios";

export default function catchAxiosError(error: AxiosError){
    console.log(error.message);
}