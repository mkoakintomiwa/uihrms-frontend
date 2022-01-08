export default function formStateValuesToJson(formState: Record<string, FormObject>){
    let json: Record<string, any> = {};
    for(let [fieldId, formObject] of Object.entries(formState)){
        json[fieldId] = formObject.value;
    }
    return json;
}