/* eslint-disable @next/next/no-img-element */
import * as React from 'react';
import { useState, useEffect, useCallback } from "react"
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
import { organizationLogo, portalUrl } from '../../lib/system/settings';
import { useRouter } from 'next/router';
import Head from '../../lib/system/PageHead';
import { titleSuffix } from '../../lib/system/settings';
import setCookie from '../../lib/browser/setCookie';


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

    const router = useRouter();

    var login = useCallback((_e: any)=>{

        let topbarColor = "#29d"; 

        topbar.config({
            autoRun      : true,
            barThickness : 3,
            barColors    : {
                '0'      : topbarColor,
                '.25'    : topbarColor,
                '.50'    : topbarColor,
                '.75'    : topbarColor,
                '1.0'    : topbarColor
            },
            shadowBlur   : 10,
            shadowColor  : 'rgba(0,   0,   0,   .6)',
            className    : 'app-topbar'
        });

        topbar.show();
        setSubmittedLogin(true);
        let formdata = new FormData(document.getElementById("login-form") as HTMLFormElement);
        
        httpPostRequest(`${portalUrl}/api/login`,{
            "username": formdata.get("username"),
            "password": formdata.get("password")
        }).then(response=>{
            let data = response.data;

            openSnackBar(true);
            
            if (!data.error){
                setSnackbarSeverity("success");
                setSnackBarContent(<div>Login successful</div>);
                setCookie("token",data.token,365*100);
                router.push("/")
        
            }else{
                setSnackbarSeverity("error")
                setSnackBarContent(<div>{ data.error }</div>)
                setSubmittedLogin(false);
                topbar.hide();
            }
        })
    },[router])

    useEffect(function(){
        document.onkeydown = (e)=>{
            if (e.key == "Enter"){
                login(e);
            }
        }
    },[login])

    return (
        <>
            <Head>
                <title>Login | { titleSuffix }</title>
            </Head>
            <div style={{ backgroundColor: "#eaeaea", minHeight:"100vh" }}>
                <Center style={{ minHeight: "90vh" }}>
                    <WhiteBox style={{ width: "300px", maxWidth: "80vw" }}>
                        <Center style={{ marginBottom: "10px" }}>
                            <img alt="Origanization Logo" src={ organizationLogo } style={{ height: "100px" }} />
                        </Center>

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
                                        <IconButton onClick={_e=>{
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

                <Snackbar open={ snackBarIsOpened } autoHideDuration={6000} onClose={_e=>{ openSnackBar(false) }} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
                    <
                    // @ts-ignore
                    Alert onClose={_e=>{ openSnackBar(false) }} severity={ snackbarSeverity } sx={{ width: '100%' }}>
                        { snackBarContent }
                    </Alert>
                </Snackbar>
            </div>
        </>
    )
}


export default Home
