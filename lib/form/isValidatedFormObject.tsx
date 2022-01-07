export default function isValidatedFormObject(formObject: FormObject){
    formObject.helperText = "";
    formObject.error = false;
    formObject.validated = true;
}