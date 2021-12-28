import * as React from "react"
import { useState, useEffect } from "react"
import Script from "next/script";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MuiButton from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import CalculateIcon from '@mui/icons-material/Calculate';
import NotificationIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/MessageRounded';
import httpPostRequest from "../network/httpPostRequest";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import MuiAccordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import CircularProgress from '@mui/material/CircularProgress'
import SpaceBetween from '../components/SpaceBetween'
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import CircularPreloader from '../../lib/components/CircularPreloader';
import Dialog from "@mui/material/Dialog"
import HtmlSelected from '../../lib/components/HtmlSelected';
import { Menu, Button } from 'antd';
import LogoutIcon from "@mui/icons-material/Logout"
import { portalUrl } from "../system/settings";
import catchAxiosError from "../network/catchAxiosError";
import { useRouter } from "next/router";

import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
  } from '@ant-design/icons';

const { SubMenu } = Menu;


export default function(props: MainProps){
    const [menuItems, setMenuItems] = useState({});
    const [menuDropdownIsVisible, showMenuDropdown] = useState(false);
    const [menuDropdownClientX, setmenuDropdownClientX] = useState(0);
    const [menuDropdownContent, setMenuDropdownContent] = useState(<div></div>);
    const theme = useTheme();
    const isMobileScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [swipeableDrawerAnchor, setSwipeableDrawerAnchor ] = useState("left" as "top" | "right" | "bottom" | "left");
    const [swipeableDrawerIsVisible, showSwipeableDrawer] = useState(false);
    const [swipeableDrawerContent, setSwipeableDrawerContent] = useState(<div></div>);
    // const [newNotificationsData, setNewNotificationsData] = useState({
    //     messages: initNewMessages,
    //     notifications: initNewNotifications
    // });
    // const [newMessages, setNewMessages] = useState(initNewMessages);
    // const [newNotifications, setNewNotifications] = useState(initNewNotifications);


    const [circularPreloaderTitle, setCircularPreloaderTitle] = useState("");
	const [circularPreloaderIsOpened, showCircularPreloader] = useState(false);

    const [schoolBranches, setSchoolBranches] = useState([]);

    const [modalIsOpened, openModal] = useState(false);
    const [modalContent, setModalContent] = useState(<div></div>);

    const [mainContent, setMainContent] = useState(<div></div>);

    const router = useRouter();

    let darkThemeColor = "#001529";

     
    useEffect(()=>{

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
        //@ts-ignore
        //document.querySelector(".app-topbar").style.top = 50;
        //$(".topbar").css("top",navbarHeight);
        topbar.progress("0.7");
        topbar.hide();


        window.onbeforeunload = function(){
            
            //if (platform.is_android()) Android.destroyAd();

            //pp('show');
            topbar.show();

            setTimeout(function(){
                //pp('hide');
                topbar.hide();
            },30000);

        };


        httpPostRequest(`${portalUrl}/api/login-status`).then(response=>{
            if (response.data.isLoggedIn){
                setMainContent(
                    Object.keys({'l':'k'}).length > 0?
                    
                        
                        <Box sx={{ flexGrow: 1 }}>
                            <div className="sidebar">
                                <Menu
                                    defaultSelectedKeys={['12']}
                                    defaultOpenKeys={['sub1','sub2']}
                                    mode="inline"
                                    theme="dark"
                                    inlineCollapsed={ false }
                                    >
                                    <Menu.Item key="1" icon={<PieChartOutlined />} onClick={e=>{
                                        router.push("/users/34as8363oe9032a");
                                    }}>
                                        Option 1
                                    </Menu.Item>
                                    <Menu.Item key="2" icon={<DesktopOutlined />}>
                                        Option 2
                                    </Menu.Item>
                                    <Menu.Item key="3" icon={<ContainerOutlined />}>
                                        Option 3
                                    </Menu.Item>
                                    <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
                                        <Menu.Item key="5">Option 5</Menu.Item>
                                        <Menu.Item key="6">Option 6</Menu.Item>
                                        <Menu.Item key="7">Option 7</Menu.Item>
                                        <Menu.Item key="8">Option 8</Menu.Item>
                                    </SubMenu>
                                    <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
                                        <Menu.Item key="9">Option 9</Menu.Item>
                                        <Menu.Item key="10">Option 10</Menu.Item>
                                        <SubMenu key="sub3" title="Submenu">
                                        <Menu.Item key="11">Option 11</Menu.Item>
                                        <Menu.Item key="12">Option 12</Menu.Item>
                                        </SubMenu>
                                    </SubMenu>
                                </Menu>
                                
                                <Box sx={{ position: "fixed", bottom: 0, backgroundColor: darkThemeColor }}>
                                    <Divider sx={{ backgroundColor: "white" }} />
                                    
                                    <MuiButton color="info" variant="contained" sx={{ width: "300px", height: "50px", backgroundColor: darkThemeColor, '&:hover':{ backgroundColor: darkThemeColor } }} onClick={e=>{
                                        localStorage.removeItem("token");
                                        router.push("users/login");
                                    }}>
                                        <SpaceBetween style={{ fontSize: "14px" }}>
                                            <div>Log out</div>
                                            <LogoutIcon />
                                        </SpaceBetween>
                                    </MuiButton>
                                </Box>
                                
                            </div>
        
                            <div className="no-navbar" style={{ marginTop: "50px" }}>
                                { props.children }
                            </div>
                            
                            <SwipeableDrawer
                                anchor= { swipeableDrawerAnchor }
                                open={ swipeableDrawerIsVisible }
                                onClose={e=>{
                                    showSwipeableDrawer(false)
                                }}
                                onOpen={e=>{
                                    showSwipeableDrawer(true)
                                }}
                            >
                                { swipeableDrawerContent }
                            </SwipeableDrawer>
        
                            <CircularPreloader isloading={ circularPreloaderIsOpened } title={ circularPreloaderTitle } />
        
                            <Dialog open={ modalIsOpened }>
                                { modalContent }
                            </Dialog>
                        
                        </Box>   
        
                    :<div></div>
                )
            }else{
                router.push("users/login");
            }
        }).catch(error=>{
            catchAxiosError(error);
        });

    },[]);


    // useEffect(function(){
    //     if (newNotificationsData.messages > newMessages || newNotificationsData.notifications > newNotifications){
    //         playNotification();
    //     }

    //     setNewMessages(newNotificationsData.messages);
    //     setNewNotifications(newNotificationsData.notifications);
    // },[newNotificationsData])


    let menuStyle = {
        marginRight: "20px",
        marginLeft: "20px",
        fontSize: "15px",
        cursor: "pointer",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textDecoration: "none",
        height: "50px"
    }

    
    let chevronDown = <FontAwesomeIcon icon="chevron-down" style={{ fontSize: "12px" }} />

    const Accordion = styled((props: any) => (
        <MuiAccordion disableGutters={ true } elevation={0} square {...props} />
      ))(({ theme }) => ({
        border: `unset`,
        '&:not(:last-child)': {
          borderBottom: 0,
        },
        '&:before': {
          display: 'none',
        },
    }));

    let sidenavpaddingLeft = 20;

    let menuCommonIconButtons = 
        <>
            {/* <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
                <CalculateIcon />
            </IconButton>


            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                href={`${relDirname}/users/messages/log`}
            >
                <Badge badgeContent={ newMessages } color="error" invisible={ newMessages === 0 }>
                    <MessageIcon />
                </Badge>
            </IconButton>


            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                href={`${relDirname}/users/notifications`}
            >
                <Badge badgeContent={ newNotifications } color="error" invisible={ newNotifications === 0 }>
                    <NotificationIcon />
                </Badge>
            </IconButton> */}
        </>;


    const UserMenuItem = (props: any)=>{
        
        return <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }} {...props}>

            <Avatar src={ props.user.dp } sx={{ width: 30, height: 30, /* boxShadow: "0 0 3px white" */ }} />

            <div style={{ marginLeft: "5px", marginRight: "5px", maxWidth: "200px" }}>{ props.user.name }</div>

            { props.chevronDown === false ? "" : chevronDown }
        </Box>
    }
    

    const loggingOut = (e: any)=>{
        showSwipeableDrawer(false);
        setCircularPreloaderTitle("Logging out...")
        showCircularPreloader(true);
        window.location.href = `${relDirname}/log-out`
    }

    return(
        <>

        {/* <Script src="/static/topbar/topbar.min.js" strategy="beforeInteractive" />

        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/antd/4.17.4/antd.min.css' integrity='sha512-MIam2KgzIIyxRmfAqAM8+3pvkqhSqtHQVjlFx9v3SwfNPXgB6OW/LHtjWlfj4r5AtgOlLdn2ip7Yb2ndyP7KEQ==' crossOrigin='anonymous' referrerPolicy='no-referrer' /> */}

        { mainContent }
    </>
    );
}



function AppIcon(icon: AppIcon){
    let appIcon: JSX.Element = <div></div>;

    if (["fas","fab"].includes(icon.type)){
        appIcon = <FontAwesomeIcon icon={[icon.type, icon.class]} />
    }

    if (icon.type === "link"){
        appIcon = <img style={{
            maxWidth: "20px",
            height: "16px",
            margin: "0px 5px"
        }} src={ icon.url } />
    }

    return appIcon;
}


function playNotification(){
	new Audio(`${portalUrl}/assets/iphone-whatsapp-notification-brief.mp3`).play();
}


type AppIcon = {
    
    type?: any;

    class?: any;

    url?: any;
}

interface MainProps{
    showBackgroundImage?: boolean;

    children: any;
}