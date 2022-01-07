import defaultValidationRule from "./validation-rules/defaultValidationRule";

export default function formValidationRules(validationRules: Record<string,(value:any, formObject: any)=>any>, formState: any){
    
    for (const [key,value] of Object.entries(formState)){
        if (typeof validationRules[key] === "undefined"){
            validationRules[key] = defaultValidationRule;   
        }
    }
    return validationRules;
}