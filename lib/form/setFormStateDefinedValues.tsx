import cloneDeep from "lodash.clonedeep";

export default function setFormStateDefinedValues(definedValues: Record<string,any>, formState: Record<string, FormObject>){
    for (let [key,value] of Object.entries(definedValues)){
        if (typeof formState[key] != "undefined"){
            formState[key]["value"] = value;
        }
    }
    return cloneDeep(formState);
}