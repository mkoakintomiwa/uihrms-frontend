export default function noValidateValidationRule(value: any, formObject: any){
    formObject.value = value;
    formObject.validated = true;
    return formObject;
}