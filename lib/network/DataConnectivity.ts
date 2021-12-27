import axios from "axios"

class DataConnectivity{
	
	timeout: number;

	constructor(timeout:number = 3000){
		this.timeout = timeout;
	}

	isConnected(){
		let timeout = this.timeout;
		return new Promise<boolean>(function(resolve){
			
            axios.get("https://httpbin.org/get").then(response=>{
                resolve(true);
            }).catch(error=>{
                resolve(false);
            });
		});	
	}


	reconnect(failedCallback: Function){
		let _this = this;
		_this.isConnected().then(_isConnected=>{
			if (_isConnected){
				_this.reconnect(failedCallback);
			}else{
				setTimeout(function(){
					failedCallback();
					_this.reconnect(failedCallback);
				},1000);
			}
		});
	}

}

export default DataConnectivity;