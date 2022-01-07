export default function getBinaryFromFile(file: File) {
    return new Promise<string>(function(resolve,reject){
        var reader = new FileReader();
        
        reader.readAsBinaryString(file);
        
        reader.onload = function () {
            resolve(reader.result?.toString() as string);
        };
        reader.onerror = function (error) {
            reject(error);
        };
    })
}