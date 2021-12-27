import * as React from 'react';
import { useState, useEffect } from "react"
import Center from "../../lib/components/Center";
import WhiteBox from "../../lib/components/WhiteBox"
import Typography from "@mui/material/Typography"
import TextField from '@mui/material/TextField';
import PersonIcon from "@mui/icons-material/Person"
import KeyIcon from "@mui/icons-material/Key"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import IconButton from "@mui/material/IconButton"
import InputAdornment from '@mui/material/InputAdornment';
import Button from "@mui/material/Button"
import CircularPreloader from "../../lib/components/CircularPreloader"
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import httpPostRequest from "../../lib/network/httpPostRequest"
import type { NextPage } from 'next'
import Head from 'next/head'


const Alert = React.forwardRef(function Alert(props, ref: any) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Home: NextPage = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [preloaderTitle, setPreloaderTitle] = useState("");
    const [snackBarIsOpened, openSnackBar] = useState(false);
    const [snackBarContent, setSnackBarContent] = useState(<div></div>)
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [submittedLogin, setSubmittedLogin] = useState(false);

    var login = (e: any)=>{
        setSubmittedLogin(true);
        let formdata = new FormData(document.getElementById("login-form") as HTMLFormElement);
        httpPostRequest(`${portalUrl}/api/login`,{
            "username": formdata.get("username"),
            "password": formdata.get("password")
        }).then(response=>{
            let data = response.data;

            openSnackBar(true);
            
            if (data.success){
                setSnackbarSeverity("success");
                setSnackBarContent(<div>Login successful</div>);
                window.location.href = portalUrl;
            }else{
                setSnackbarSeverity("error")
                setSnackBarContent(<div>{ data.message }</div>)
                setSubmittedLogin(false);
            }
        })
    }

    useEffect(function(){
        document.onkeydown = (e)=>{
            if (e.key == "Enter"){
                login(e);
            }
        }
    },[])

    return (
        <>
            <Center style={{ minHeight: "90vh" }}>
                <WhiteBox style={{ width: "250px", maxWidth: "80vw" }}>
                    {/* <Center style={{ marginBottom: "10px" }}>
                        <img alt="Origanization Logo" src={ organizationLogo } style={{ height: "100px" }} />
                    </Center> */}

                    <Center>
                        <Typography variant="h6" textAlign="center" style={{ marginBottom: "5px", maxWidth: "250px" }}>Human Resources Management System</Typography>
                    </Center>
                    
                    <Center>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>University of Ibadan</Typography>
                    </Center>

                    <form style={{ width: "100%" }} id="login-form">
                        <TextField
                            variant="standard"
                            label="Username"
                            name="username"
                            InputProps={{
                                startAdornment: <InputAdornment position="start"> 
                                    <PersonIcon  color="action" />
                                </InputAdornment>
                                ,
                            }}
                            sx={{ width: "100%", marginTop: "30px" }}
                        />

                        
                        <TextField
                            variant="standard"
                            label="Password"
                            type={showPassword?"text":"password"}
                            name="password"
                            InputProps={{
                                startAdornment: <InputAdornment position="start"> 
                                    <KeyIcon color="action" />
                                </InputAdornment>
                                ,
                                endAdornment:  <InputAdornment position="end"> 
                                    <IconButton onClick={e=>{
                                        setShowPassword(!showPassword);
                                    }}>
                                        {showPassword?<VisibilityOff color="action" />:<Visibility color="action" />}
                                    </IconButton>
                                </InputAdornment>
                            }}
                            sx={{ width: "100%", marginTop: "30px" }}
                        />


                        <Center style={{ marginTop: "30px" }}>
                            <Button variant="contained" onClick={ login } disabled={ submittedLogin }>Login</Button>
                        </Center>
                    </form>
                </WhiteBox>
            </Center>

            <CircularPreloader isloading={ isLoading } title={ preloaderTitle } />

            <Snackbar open={ snackBarIsOpened } autoHideDuration={6000} onClose={e=>{ openSnackBar(false) }} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
                <
                // @ts-ignore
                Alert onClose={e=>{ openSnackBar(false) }} severity={ snackbarSeverity } sx={{ width: '100%' }}>
                    { snackBarContent }
                </Alert>
            </Snackbar>
        </>
    )
}


export default Home