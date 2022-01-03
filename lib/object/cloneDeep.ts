export default function cloneDeep(object: any){
    return JSON.parse(JSON.stringify(object));
}