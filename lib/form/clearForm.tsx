import cloneDeep from "lodash.clonedeep";
import { scrollPageContent } from "../dom/scrollPageContent";

export default function clearForm(formState: any){
    let newFormState = cloneDeep(formState);

    for(const [name, formObject] of Object.entries(newFormState as Record<any,any>)){
        newFormState[name].value = "";
    }

    scrollPageContent();

    return newFormState;
}