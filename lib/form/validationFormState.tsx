import cloneDeep from "lodash.clonedeep";

export default function validationFormState(fieldId: string, value: any, validationRules: any, formState: any){
    let newFormState = cloneDeep(formState);
    newFormState[fieldId] = validationRules[fieldId](value,newFormState[fieldId]);
    return newFormState;
}