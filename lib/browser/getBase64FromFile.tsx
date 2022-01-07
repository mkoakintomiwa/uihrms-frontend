export default function getBase64FromFile(file: File) {
    return new Promise<string>(function(resolve,reject){
        var reader = new FileReader();
        
        reader.readAsDataURL(file);
        
        reader.onload = function () {
            resolve(reader.result?.toString() as string);
        };
        reader.onerror = function (error) {
            reject(error);
        };
    })
}