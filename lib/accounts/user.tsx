import axios from "axios"

export default function User(publicAddress: string){
	return new Promise<User>(resolve=>{
		axios({
            method: "GET",
			url:`${ajax}/user`,
			params:{
				public_address: publicAddress
			}
		}).then(response=>{
            resolve(response.data);
        });
	});
}