import { defaultObject } from "./defaultObject";

export default function defaultFormState(formState: Record<string, FormObject>){
    
    let newFormState = {} as Record<string, FormObject>;

    for(const [name, formObject] of Object.entries(formState as Record<any,any>)){
        newFormState[name] = {
            ...defaultObject,
            ...formObject
        }            
    }

    return newFormState;
}