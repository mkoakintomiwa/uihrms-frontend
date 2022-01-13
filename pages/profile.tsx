import { cloneElement, useEffect, useRef, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Main from '../lib/components/Main'
import Head from '../lib/system/PageHead'
import { api, organizationLogo, portalUrl, themeColor, titleSuffix } from '../lib/system/settings'
import Typography from '@mui/material/Typography'
import WhiteBox from '../lib/components/WhiteBox'
import PagePreloader from '../lib/components/PagePreloader'
import httpPostRequest from '../lib/network/httpPostRequest'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import ListItemText from '@mui/material/ListItemText'
import Link from 'next/link'
import Button from '@mui/material/Button'
import Title from '../lib/components/Title'
import axios from 'axios'
import httpGetRequest from '../lib/network/httpGetRequest'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextBox from '../lib/components/TextBox'
import HtmlSelected from '../lib/components/HtmlSelected'
import ImageFormView from '../lib/components/ImageFormView'
import Center from '../lib/components/Center'
import { Alert, Box, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { defaultObject } from '../lib/form/defaultObject'
import formValidationRules from '../lib/form/formValidationRules'
import validateForm from '../lib/form/validateForm'
import validationFormState from '../lib/form/validationFormState'
import defaultValidation from '../lib/form/validation-rules/defaultValidationRule'
import clearForm from '../lib/form/clearForm'
import defaultFormState from '../lib/form/defaultFormState'
import FormSelect from '../lib/components/FormSelect'
import FormImage from '../lib/components/FormImage'
import StatefulForm from '../lib/components/StatefulForm'
import formStateValuesToJson from '../lib/form/formStateValuesToJson'
import { AppContext } from '../lib/context/AppContext'
import UserDescription from '../lib/components/UserDescription'
import setFormStateDefinedValues from '../lib/form/setFormStateDefinedValues'
import datauriToFile from '../lib/browser/datauriToFile'
import Fab from '@mui/material/Fab';
import SaveIcon from "@mui/icons-material/Save"
import WhiteBarSpinner from '../lib/components/WhiteBarSpinner'
import CheckIcon from "@mui/icons-material/Check"
import SpaceBetween from '../lib/components/SpaceBetween'
import { useSnackbar } from 'notistack';
import IsMobileScreen from '../lib/browser/IsMobileScreen'


const Page: NextPage = () => {

	const [backgroundColor, setBackgroundColor] = useState("white");
    const [pageIsLoading, setPageIsLoading] = useState(true);
    const [addUserIsLoading, setAddUserIsLoading] = useState(false);
    const router = useRouter();
    const {contextValue, setContextValue} = useContext(AppContext);
    const [user, setUser] = useState({} as User);
    const [isSaving, setIsSaving] = useState(false);
    const [fabIcon, setFabIcon] = useState(<SaveIcon />);
    const [passwordDialogIsOpened, openPasswordDialog] = useState(false);
    const [changePasswordButtonText, setChangePasswordButtonText] = useState(<span>Change password</span>);
    const [changePasswordIsLoading, setChangePasswordIsLoading] = useState(false); 
    const [changePasswordState, setChangePasswordState] = useState({
        oldPassword: {
            value: "",
            helperText: "",
            error: false
        },
        newPassword: {
            value: "",
            helperText: "",
            error: false
        },
        confirmNewPassword: {
            value: "",
            helperText: "",
            error: false
        },
    })

    const isMobileScreen = IsMobileScreen();

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const { Swal } = contextValue;

    const userId = user.userId;

    const defaultFormObjects: Record<string,FormObject> = {
        "username":{
            label: "Username"
        },
        "name":{
            label: "Name"
        },
        "surname":{
            label: "Surname"
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

        if (Object.keys(user).length === 0 && userId){

            var pageApiData = async () => {
                
                let userData = await httpGetRequest(`${api}/user-data`,{
                    "user-id": userId
                });

                let passportResponse = await httpGetRequest(`${api}/user-passport-datauri`,{
                    "user-id": userId
                });
        
                return { userData, passportResponse }
            }

            
            pageApiData().then(pageData=>{
                
                    let userData = pageData.userData.data;
                    setUser(userData);
                
                    setFormState(prev=>{
                        let newState = setFormStateDefinedValues({
                            ...userData,
                            passport: datauriToFile(pageData.passportResponse.data.datauri,"passport"),
                        }, prev)

                        newState = {
                            ...newState,
                            passport: {
                                ...newState.passport,
                                placeholder: pageData.passportResponse.data.datauri
                            }
                        }

                        return newState;
                    });

                    setPageIsLoading(false);
                    setBackgroundColor("");
            
            });

        }
        
	},[userId, formState, user]);


    useEffect(function(){
        if (contextValue.user){

            const userId = contextValue.user.userId;

            var pageApiData = async () => {

                let passportResponse = await httpGetRequest(`${api}/user-passport-datauri`,{
                    "user-id": userId
                });
        
                return { passportResponse }
            }


            pageApiData().then(pageData=>{
                let userData = contextValue.user;
                setUser(userData!);

                setFormState(prev=>{
                    let newState = setFormStateDefinedValues({
                        ...userData,
                        passport: datauriToFile(pageData.passportResponse.data.datauri,"passport"),
                    }, prev)

                    newState = {
                        ...newState,
                        passport: {
                            ...newState.passport,
                            placeholder: pageData.passportResponse.data.datauri
                        }
                    }

                    return newState;
                });

                setPageIsLoading(false);
                setBackgroundColor("");
            });
        }
    },[contextValue.user])


	return (
		<>
			<Head>
				<title>Update profile | { titleSuffix }</title>
			</Head>

			<Main backgroundColor={ backgroundColor }>
                <div>
					{ !pageIsLoading?(
                        <WhiteBox style={{ width: isMobileScreen?"90vw": "500px" }}>  
                            <Typography variant='h6' sx={{  marginBottom: "15px" }}>Update Profile</Typography>
                            

                            <UserDescription user={ user } />

                            <SpaceBetween>
                                <div></div>
                                <Button color='primary' sx={{ fontSize: "14px" }} onClick={e=>{
                                    setChangePasswordState({
                                        oldPassword: {
                                            value: "",
                                            helperText: "",
                                            error: false
                                        },
                                        newPassword: {
                                            value: "",
                                            helperText: "",
                                            error: false
                                        },
                                        confirmNewPassword: {
                                            value: "",
                                            helperText: "",
                                            error: false
                                        },
                                    });
                                    setChangePasswordButtonText(<span>Change password</span>);
                                    setChangePasswordIsLoading(false);
                                    openPasswordDialog(true);
                                }}>Change Password</Button>

                            </SpaceBetween>

                            
                            <Box id="add-user-form" component="form">
                                
                                <StatefulForm formState={ formState } setFormState={ setFormState }  validationRules={ validationRules } />
                                
                            </Box>


                            <Dialog
                                open={ passwordDialogIsOpened }
                                onClose={e=>openPasswordDialog(false)}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {"Change password"}
                                </DialogTitle>

                                <DialogContent sx={{ width: "300px" }}>
                                    
                                    <UserDescription user={user} nameFontSize='16px' />


                                    <div>
                                        <TextField  label="Old Password" variant="standard" sx={{ width: "100%", marginBottom: "20px" }} value={ changePasswordState.oldPassword.value } type="password" helperText={ changePasswordState.oldPassword.helperText } error={ changePasswordState.oldPassword.error } onChange={e=>{
                                            let value = e.target.value;
                                            if (value.trim().length > 0){
                                                setChangePasswordState({
                                                    ...changePasswordState,
                                                    oldPassword:{
                                                        ...changePasswordState.oldPassword,
                                                        value,
                                                        error: false,
                                                        helperText: ""
                                                    }
                                                })
                                            }else{
                                                setChangePasswordState({
                                                    ...changePasswordState,
                                                    oldPassword:{
                                                        ...changePasswordState.oldPassword,
                                                        value,
                                                        error: true,
                                                        helperText: "Password cannot be left blank"
                                                    }
                                                })
                                            }

                                        }} />
                                    </div>

                                    <div>
                                        <TextField  label="New Password" variant="standard" sx={{ width: "100%", marginBottom: "20px" }} value={ changePasswordState.newPassword.value } type="password" helperText={ changePasswordState.newPassword.helperText } error={ changePasswordState.newPassword.error } onChange={e=>{
                                            let value = e.target.value;
                                            if (value.trim().length > 0){
                                                setChangePasswordState({
                                                    ...changePasswordState,
                                                    newPassword:{
                                                        ...changePasswordState.newPassword,
                                                        value,
                                                        error: false,
                                                        helperText: ""
                                                    }
                                                })
                                            }else{
                                                setChangePasswordState({
                                                    ...changePasswordState,
                                                    newPassword:{
                                                        ...changePasswordState.newPassword,
                                                        value,
                                                        error: true,
                                                        helperText: "Password cannot be left blank"
                                                    }
                                                })
                                            }

                                            if (changePasswordState.confirmNewPassword.value === value){
                                                setChangePasswordState({
                                                    ...changePasswordState,
                                                    newPassword:{
                                                        ...changePasswordState.newPassword,
                                                        value
                                                    },
                                                    confirmNewPassword:{
                                                        ...changePasswordState.confirmNewPassword,
                                                        error: false,
                                                        helperText: ""
                                                    }
                                                })
                                            }
                                        }} />
                                    </div>

                                    <div>
                                        <TextField  label="Confirm New Password" variant="standard" sx={{ width: "100%", marginBottom: "20px" }} type="password" helperText={ changePasswordState.confirmNewPassword.helperText } error={ changePasswordState.confirmNewPassword.error } value={ changePasswordState.confirmNewPassword.value } onChange={e=>{
                                            let value = e.target.value;
                                            if (value.trim().length > 0){
                                                if (changePasswordState.newPassword.value === value){
                                                    setChangePasswordState({
                                                        ...changePasswordState,
                                                        confirmNewPassword:{
                                                            ...changePasswordState.confirmNewPassword,
                                                            value,
                                                            error: false,
                                                            helperText: ""
                                                        }
                                                    })
                                                }else{
                                                    setChangePasswordState({
                                                        ...changePasswordState,
                                                        confirmNewPassword:{
                                                            ...changePasswordState.confirmNewPassword,
                                                            value,
                                                            error: true,
                                                            helperText: "Passwords do not match"
                                                        }
                                                    })
                                                }
                                            }else{
                                                setChangePasswordState({
                                                    ...changePasswordState,
                                                    confirmNewPassword:{
                                                        ...changePasswordState.confirmNewPassword,
                                                        value,
                                                        error: true,
                                                        helperText: "Password cannot be left blank"
                                                    }
                                                })
                                            }
                                        }} />
                                    </div>

                                </DialogContent>
                                
                                <DialogActions>
                                    
                                    <Button onClick={e=>{
                                        openPasswordDialog(false);
                                    }} color="error">Cancel</Button>

                                    <Button disabled={ changePasswordIsLoading } onClick={e=>{

                                        var isValidated = true;
                                        var bool = changePasswordState.newPassword.value === changePasswordState.confirmNewPassword.value;

                                        isValidated = isValidated && bool;

                                        let newChangePasswordState = changePasswordState;

                                        if (!bool){
                                            newChangePasswordState = {
                                                ...newChangePasswordState,
                                                confirmNewPassword:{
                                                    ...newChangePasswordState.confirmNewPassword,
                                                    error: true,
                                                    helperText: "Passwords do not match"
                                                }
                                            }
                                        }

                                        bool = changePasswordState.newPassword.value.trim().length > 0;

                                        isValidated = isValidated && bool;

                                        if (!bool){
                                            newChangePasswordState = {
                                                ...newChangePasswordState,
                                                newPassword:{
                                                    ...newChangePasswordState.newPassword,
                                                    error: true,
                                                    helperText: "Password cannot be left blank"
                                                }
                                            };
                                        }


                                        bool = changePasswordState.confirmNewPassword.value.trim().length > 0;

                                        isValidated = isValidated && bool;

                                        if (!bool){
                                            newChangePasswordState =  {
                                                ...newChangePasswordState,
                                                confirmNewPassword:{
                                                    ...newChangePasswordState.confirmNewPassword,
                                                    error: true,
                                                    helperText: "Password cannot be left blank"
                                                }
                                            };
                                        }

                                        setChangePasswordState(newChangePasswordState);

                                        if (isValidated){
                                            setChangePasswordButtonText(<CircularProgress size={ 14 } thickness={ 6 } />);
                                            setChangePasswordIsLoading(true)

                                            httpPostRequest(`${api}/update-self-password`,{
                                                user_id: userId,
                                                old_password: newChangePasswordState.oldPassword.value,
                                                new_password: newChangePasswordState.newPassword.value
                                            }).then(response=>{
                                                const { data } = response;

                                                if (!data.error){
                                                    enqueueSnackbar("Password successfully changed");
                                                }else{
                                                    Swal.fire({
                                                        html: <div>{ data.error }</div>,
                                                        icon: "error"
                                                    }); 
                                                }

                                                openPasswordDialog(false);
                                            });
                                        }

                                    }} autoFocus>
                                        { changePasswordButtonText }
                                    </Button>
                                </DialogActions>
                            </Dialog>


                            <Fab sx={{ position: "fixed", bottom: "50px", right: "50px", backgroundColor: themeColor, color: "white", '&:hover': {
                                backgroundColor: themeColor, color: "white"
                            } }} onClick={e=>{
                                if (!isSaving){
                                    setIsSaving(true);
                                    let validation = validateForm(validationRules,formState);

                                    if (validation.isValidated){
                                        
                                        setFabIcon(<WhiteBarSpinner />);

                                        httpPostRequest(`${api}/update-self-profile`, Object.assign({ user_id: userId },formStateValuesToJson(formState))).then(response=>{
                                        
                                            let { data } = response;

                                            if (!data.error){
                                                setFabIcon(<CheckIcon />);
                                                setUser(data as User);
                                                setContextValue({
                                                    ...contextValue,
                                                    user: data
                                                })

                                                setTimeout(function(){
                                                    setFabIcon(<SaveIcon />);
                                                },2000)
                                            }else{
                                                Swal.fire({
                                                    html: <div>{ data.error }</div>,
                                                    icon: "error"
                                                })
                                                setFabIcon(<SaveIcon />);
                                            }
                                            setIsSaving(false);
                                        })
                                        //setFormState(defaultFormState(defaultFormObjects));   
                                    }else{
                                        setFormState(validation.formState);
                                        setIsSaving(false);
                                        setFabIcon(<SaveIcon />);
                                    }
                                }
                            }}>
                                { fabIcon }
                            </Fab>
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
