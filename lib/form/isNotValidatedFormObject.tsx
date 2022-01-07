export default function isNotValidatedFormObject(helperText: string, formObject: FormObject){
    formObject.helperText = helperText;
    formObject.error = true;
    formObject.validated = false;
}