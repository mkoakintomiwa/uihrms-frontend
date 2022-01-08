import { cloneElement, useEffect, useRef, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Main from '../../../lib/components/Main'
import Head from '../../../lib/system/PageHead'
import { api, organizationLogo, portalUrl, titleSuffix } from '../../../lib/system/settings'
import Typography from '@mui/material/Typography'
import WhiteBox from '../../../lib/components/WhiteBox'
import PagePreloader from '../../../lib/components/PagePreloader'
import httpPostRequest from '../../../lib/network/httpPostRequest'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import ListItemText from '@mui/material/ListItemText'
import Link from 'next/link'
import Button from '@mui/material/Button'
import Title from '../../../lib/components/Title'
import axios from 'axios'
import httpGetRequest from '../../../lib/network/httpGetRequest'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextBox from '../../../lib/components/TextBox'
import HtmlSelected from '../../../lib/components/HtmlSelected'
import ImageFormView from '../../../lib/components/ImageFormView'
import Center from '../../../lib/components/Center'
import { Box } from '@mui/material'
import { defaultObject } from '../../../lib/form/defaultObject'
import formValidationRules from '../../../lib/form/formValidationRules'
import validateForm from '../../../lib/form/validateForm'
import validationFormState from '../../../lib/form/validationFormState'
import defaultValidation from '../../../lib/form/validation-rules/defaultValidationRule'
import clearForm from '../../../lib/form/clearForm'
import defaultFormState from '../../../lib/form/defaultFormState'
import FormSelect from '../../../lib/components/FormSelect'
import FormImage from '../../../lib/components/FormImage'
import StatefulForm from '../../../lib/components/StatefulForm'
import formStateValuesToJson from '../../../lib/form/formStateValuesToJson'
import { AppContext } from '../../../lib/context/AppContext'


const Page: NextPage = () => {

	const [backgroundColor, setBackgroundColor] = useState("white");
    const [pageIsLoading, setPageIsLoading] = useState(true);
    const [addUserIsLoading, setAddUserIsLoading] = useState(false);
    const router = useRouter();
    const {contextValue, setContextValue} = useContext(AppContext);

    const { Swal } = contextValue;

    const defaultFormObjects: Record<string,FormObject> = {
        "user_type":{
            label: "User Type",
            type: "select",
            options: {
                "Admin": "Admin",
                "Employee": "Employee",
                "HR": "HR",
                "Manager": "Manager"
            } 
        },
        "username":{
            label: "Username"
        },
        "name":{
            label: "Name"
        },
        "surname":{
            label: "Surname"
        },
        "title":{
            label: "Title"
        },
        "email":{
            label: "Email Address",
            type: "email"
        },
        "phone":{
            label: "Phone Number",
            type: "phone-number"
        },
        "passport":{
            label: "Passport (<80kb)",
            type: "image",
            maxSize: 80000
        }
    };

    const [formState, setFormState] = useState(defaultFormState(defaultFormObjects));


    let validationRules = formValidationRules({}, formState);

    

	useEffect(function(){

        var pageApiData = async () => {
    
            return {  }
        }

        
        pageApiData().then(pageData=>{
            
            setPageIsLoading(false);
            setBackgroundColor("");
        
        });
        
	},[]);


	return (
		<>
			<Head>
				<title>Add User | { titleSuffix }</title>
			</Head>

			<Main backgroundColor={ backgroundColor }>
                <div>
					{ !pageIsLoading?(
                        <WhiteBox style={{ width: "500px" }}>  
                            <Typography variant='h6' sx={{  marginBottom: "15px" }}>Add User</Typography>

                            <div style={{ color: "red", marginBottom: "30px", textAlign: "center" }}>All fields are required</div>

                            
                            <Box id="add-user-form" component="form">
                                
                                <StatefulForm formState={ formState } setFormState={ setFormState }  validationRules={ validationRules } />
                                
                                
                                <Center style={{ marginTop: "30px" }}>
                                    <Button variant="contained" disabled={ addUserIsLoading } onClick={e=>{
                                        setAddUserIsLoading(true);
                                        topbar.show();
                                        let validation = validateForm(validationRules,formState);

                                        if (validation.isValidated){
                                            httpPostRequest(`${api}/add-user`, formStateValuesToJson(formState)).then(response=>{
                                                let { data } = response;

                                                if (!data.error){
                                                    router.push(`/admin/manage-roles/${data.userId}`);
                                                }else{
                                                    Swal.fire({
                                                        html: <div>{ data.error }</div>,
                                                        icon: "error"
                                                    })
                                                }
                                            })
                                            //setFormState(defaultFormState(defaultFormObjects));   
                                        }else{
                                            setFormState(validation.formState);
                                        }
                                    }} >Add User</Button>
                                </Center>


                            </Box>
                        </WhiteBox>
                    ) : (
                        <PagePreloader height="80vh" />
                    ) }
				</div>
			</Main>
		</>
	)
}

export default Page;
