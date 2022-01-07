
import validationFormState from "../form/validationFormState";
import FormImage from "./FormImage";
import FormSelect from "./FormSelect";
import TextBox from "./TextBox";

export default function StatefulForm(props: StatefulFormProps){
    
    const { formState, setFormState, validationRules } = props;

    return (
        <>
            {Object.keys(formState).map(fieldId=>{
                let formObject = formState[fieldId];

                let key = `form-field-${fieldId}`;

                switch(formObject.type){
                    case "text":
                        return ( 
                            <TextBox key={ key } name={ fieldId } state={ formObject } onChange={e=>{
                                setFormState(validationFormState(fieldId,e.target.value,validationRules,formState));
                            }} />
                        );
                    break;

                    case "select":
                        return ( 
                            <FormSelect name={ fieldId } key={ key } state={ formObject } options={ formObject.options! } onChange={e=>{
                                setFormState(validationFormState(fieldId,e.target.value,validationRules,formState));
                            }} />
                        );
                    break;

                    case "email":
                        return (
                            <TextBox key={ key } name={ fieldId } state={ formObject } onChange={e=>{
                                setFormState(validationFormState(fieldId,e.target.value,validationRules,formState));
                            }} />
                        );
                    break;

                    case "phone-number":
                        return (
                            <TextBox key={ key } name={ fieldId } state={ formObject } onChange={e=>{
                                setFormState(validationFormState(fieldId,e.target.value,validationRules,formState));
                            }} />
                        );
                    break;

                    case "image":
                        return (
                            <FormImage name={ fieldId } key={ key } state={ formObject } onChange={file=>{
                                setFormState(validationFormState(fieldId, file,validationRules,formState));
                            }}  />
                        );
                    break;
                }
            })}
        </>
    );
}



interface StatefulFormProps{

    formState: Record<string,FormObject>;
     
    setFormState: any; 
    
    validationRules: any;
}