export default function getArrayBufferFromFile(file: File) {
    return new Promise<ArrayBuffer>(function(resolve,reject){
        var reader = new FileReader();
        
        reader.readAsArrayBuffer(file);
        
        reader.onload = function () {
            resolve(reader.result as ArrayBuffer);
        };
        reader.onerror = function (error) {
            reject(error);
        };
    })
}