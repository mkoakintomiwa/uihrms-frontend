import { scrollPageContent } from "../dom/scrollPageContent";
import cloneDeep from "lodash.clonedeep"

export default function validateForm(validationRules: any, formState: Record<string,FormObject>){
    let validated = true;
    let notValidatedIndex = -1;
    for(const [name, formObject] of Object.entries(formState as Record<string,FormObject>)){
        formState[name] = validationRules[name](formObject.value,formObject);
        validated = validated && formState[name].validated!;
        if (!formState[name].validated!){
            notValidatedIndex++;
        }

        if (notValidatedIndex === 0){
            if (formObject.type === "image"){
                document.getElementById(`image-${name}`)?.scrollIntoView();
                // scrollPageContent(document.getElementById("page-content")?.scrollTop! - 20)
            }else{
                document.querySelector(`[name="${name}"]`)?.scrollIntoView();
            
                if (formObject.type === "select"){
                    scrollPageContent(document.getElementById("page-content")?.scrollTop! - 50)
                }else{
                    scrollPageContent(document.getElementById("page-content")?.scrollTop! - 20)
                }
            }
        }
    }

    return {
        formState: cloneDeep(formState),
        isValidated: validated
    }
}