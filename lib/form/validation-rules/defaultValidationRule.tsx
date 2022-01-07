import validateEmail from "../../functions/validateEmail";
import validatePhoneNumber from "../../functions/validatePhoneNumber";
import isNotValidatedFormObject from "../isNotValidatedFormObject";
import isValidatedFormObject from "../isValidatedFormObject";

export default function defaultValidationRule(value: any, formObject: FormObject){
    formObject.value = value;

    switch (formObject.type){
        case "text":
            if (formObject.value!.trim().length === 0){
                isNotValidatedFormObject("This field is required",formObject);
            }else{
                isValidatedFormObject(formObject);
            }
        break;


        case "email":
            if (formObject.value!.trim().length === 0){
                isNotValidatedFormObject("This field is required",formObject);
            }else{
                if (validateEmail(value)){
                    isValidatedFormObject(formObject);
                }else{
                    isNotValidatedFormObject("Invalid email",formObject);
                }
            }
        break;

        case "phone-number":
            if (formObject.value!.trim().length === 0){
                isNotValidatedFormObject("This field is required",formObject);
            }else{
                if (validatePhoneNumber(value)){
                    isValidatedFormObject(formObject);
                }else{
                    isNotValidatedFormObject("Invalid phone number",formObject);
                }
            }
        break;

        case "select":
            if (formObject.value!.trim().length === 0){
                isNotValidatedFormObject("Select one of the options",formObject);
            }else{
                isValidatedFormObject(formObject);
            }
        break;


        case "image":
            if (!formObject.value){
                isNotValidatedFormObject("Invalid image",formObject);
            }else{
                
                if (formObject.value.size <= formObject.maxSize!){
                    isValidatedFormObject(formObject);
                }else{
                    isNotValidatedFormObject("Invalid image",formObject);
                }
            }
        break;
    }

    return formObject;
}

