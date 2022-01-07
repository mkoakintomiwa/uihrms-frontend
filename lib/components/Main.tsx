import * as React from "react"
import { useState, useEffect, useContext } from "react"
import Box from '@mui/material/Box';
import MuiButton from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import httpPostRequest from "../network/httpPostRequest";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import MuiAccordion from '@mui/material/Accordion';
import CircularPreloader from '../../lib/components/CircularPreloader';
import Dialog from "@mui/material/Dialog"
import { Layout } from "antd";
import { api, portalUrl } from "../system/settings";
import catchAxiosError from "../network/catchAxiosError";
import { useRouter } from "next/router";
import Center from "./Center";
import PagePreloader from "./PagePreloader";
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarFooter } from 'react-pro-sidebar';
import { AppContext } from "../context/AppContext";
import AysDialog from "./AysDialog";
import addClassName from "../dom/addClassName";
import Link from "next/link";


export default function(props: MainProps){

    let pagePadding =  typeof props.pagePadding != "undefined" ? props.pagePadding : true;


    const theme = useTheme();
    const isMobileScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [swipeableDrawerAnchor, setSwipeableDrawerAnchor ] = useState("left" as "top" | "right" | "bottom" | "left");
    const [swipeableDrawerIsVisible, showSwipeableDrawer] = useState(false);
    const [swipeableDrawerContent, setSwipeableDrawerContent] = useState(<div></div>);


    const [circularPreloaderTitle, setCircularPreloaderTitle] = useState("");
	const [circularPreloaderIsOpened, showCircularPreloader] = useState(false);

    const [modalIsOpened, openModal] = useState(false);
    const [modalContent, setModalContent] = useState(<div></div>);
    const [pageContentIsVisible, showPageContent] = useState(false);
    const [appIsLoading, setAppIsLoading] = useState(true);
    const [menuItems, setMenuItems] = useState({} as Record<string,any>);
    const [user, setUser] = useState({} as any);

    let backgroundColor = props.backgroundColor || "#efefef";
    
    const [aysObject, ays] = useState({
        open: false,
        title: "",
        content: "",
        action: ()=>{}
    });

    const { contextValue, setContextValue} = useContext(AppContext);

    let sidebarActiveElementId = "";

    var onSubmenuToggle = (isOpened: boolean, roleId: string) => {
        if (!contextValue.sidebarState) contextValue.sidebarState = {};
        if (!contextValue.sidebarState.menu) contextValue.sidebarState.menu = {};

        contextValue.sidebarState.menu[roleId] = {
            isOpened
        }
        setContextValue(contextValue);
    }


    const router = useRouter();
    
     
    useEffect(()=>{

        topbar.hide();

        if (!contextValue.initialLoadIsReady){
            
            httpPostRequest(`${api}/login-status`).then(response=>{
                let user = response.data;
                contextValue.user = user;
                if (user.isLoggedIn){
                    //document.title = `${user.name} | ${titleSuffix}`;
                    httpPostRequest(`${api}/menu-items`).then(response=>{
                        let menuItems = response.data;
                        contextValue.menuItems = menuItems;
                        contextValue.initialLoadIsReady = true;
                        setContextValue(contextValue);
                        setAppIsLoading(false);
                        setUser(user);
                        setMenuItems(menuItems);
                        showPageContent(true);
                    });
    
                }else{
                    router.push("users/login");
                }
            }).catch(error=>{
                catchAxiosError(error);
            });
        }else{
            setAppIsLoading(false);
            setUser(contextValue.user);
            setMenuItems(contextValue.menuItems);
            showPageContent(true);
        }

    },[]);


    useEffect(function(){
        if (sidebarActiveElementId){
            let proSidebarLayout = document.getElementsByClassName("pro-sidebar-layout")[0] as HTMLElement;

            if (!contextValue.sidebarState) contextValue.sidebarState = {};

            if (typeof contextValue.sidebarState.scrollTop != "undefined"){
                proSidebarLayout.scrollTop = contextValue.sidebarState.scrollTop;
            }else{
                proSidebarLayout.scrollTop = document.getElementById(sidebarActiveElementId)?.offsetTop || 0;
            }

            proSidebarLayout.onscroll = function(e){
                contextValue.sidebarState.scrollTop = proSidebarLayout.scrollTop;
                setContextValue(contextValue);
            };
        }
    },[sidebarActiveElementId]);


    // useEffect(function(){
    //     if (contextValue.initialLoadIsReady){
    //         showPageContent(true);
    //     }
    // },[sidebarContent])

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


    return(
        <>
            {!appIsLoading?(
                <div style={{ display: "flex" }}>
                
                    <div style={{ display: "flex" }}>

                        <ProSidebar className="sidebar">
                            <Menu className="sidebar-width" iconShape="circle">
                                
                                <MenuItem className={ "/" === router.pathname ? "pro-menu-active" : ""  } icon={AppIcon({
                                    type: "fas",
                                    class: "gauge"
                                })}>
                                    <Link href="/">Dashboard</Link>
                                </MenuItem>


                                {Object.keys(menuItems).map((roleId: string)=>{
                                    let menu = menuItems[roleId];
                                    
                                    let menuItemElement: JSX.Element; 
                                    
                                    if (typeof menu.submenu != "undefined"){
                                        let submenu = menu.submenu;

                                        let submenuIsOpened = false;

                                        Object.keys(submenu).map((submenuRoleId: string)=>{
                                            let submenuRole = submenu[submenuRoleId];

                                            submenuIsOpened ||= submenuRole.route === router.pathname;

                                            if (submenuRole.route === router.pathname){
                                                sidebarActiveElementId = `submenu-${submenuRoleId}`;
                                                onSubmenuToggle(true, roleId);
                                            }
                                        });

                                        let submenuDefaultOpen = false;

                                        if (typeof contextValue.sidebarState?.menu != "undefined"){
                                            submenuDefaultOpen = contextValue.sidebarState?.menu[roleId]?.isOpened === true;
                                        }
                                        
                                        menuItemElement = (
                                            <SubMenu key={`menu-${roleId}`} icon={ AppIcon(menu.icon) } title={menu.title} onOpenChange={isOpened=>{

                                                onSubmenuToggle(isOpened, roleId);
                                                
                                            }} defaultOpen={ submenuDefaultOpen || submenuIsOpened } onClick={e=>{
                                                addClassName("react-slidedown-transition",document.getElementsByClassName("react-slidedown"));
                                            }}>
                                                {Object.keys(submenu).map((submenuRoleId: string)=>{
                                                    let submenuRole = submenu[submenuRoleId];
                                                    
                                                    return <MenuItem id={`submenu-${submenuRoleId}`} className={ submenuRole.route === router.pathname ? "pro-menu-active" : ""  } key={`submenu-${submenuRoleId}`} onClick={e=>{
                                                        
                                                        contextValue.sidebarState.menu[roleId]['selected'] = submenuRoleId;
                                                        
                                                        setContextValue(contextValue);

                                                        // if (submenuRole.route){
                                                        //     router.push(submenuRole.route);
                                                        // }
                                                    }}>
                                                        {!submenuRole.route?(
                                                            <div>{ submenuRole.title }</div>
                                                        ):(
                                                            <Link href={ submenuRole.route }>{ submenuRole.title }</Link>
                                                        )}
                                                    </MenuItem>
                                                })}
                                            </SubMenu>
                                        )
                                    }else{
                                        
                                        sidebarActiveElementId = `menu-${roleId}`;

                                        menuItemElement = (
                                            <MenuItem id={`menu-${roleId}`} className={ menu.route === router.pathname ? "pro-menu-active" : ""  } key={`menu-${roleId}`} icon={ AppIcon(menu.icon) } onClick={e=>{
                                                // if (menu.route){
                                                //     router.push(menu.route);
                                                // }
                                            }}>
                                                {menu.route?<Link href={ menu.route }>{ menu.title }</Link>:<div>{ menu.title }</div>}
                                                
                                            </MenuItem>
                                        );
                                    }
                                    return menuItemElement;
                                })}

                            </Menu>


                            <Box className="sidebar-bg-color sidebar-width" sx={{ position: "fixed", bottom: 0, borderTop: "1px solid rgba(179,184,212,.2)" }}>
                                

                                <div
                                    className="sidebar-btn-wrapper"
                                    style={{
                                        padding: '20px 24px',
                                    }}
                                >
                                    <MuiButton className="sidebar-btn" onClick={ e=>{
                                        ays({
                                            open: true,
                                            title: "Log out?",
                                            content: "Are you sure you want to log out",
                                            action:()=>{
                                            
                                                setAppIsLoading(true);
                                    
                                                httpPostRequest(`${api}/logout`).then(response=>{
                                                    localStorage.removeItem("token");
                                                    router.push("/users/login");
                                                });
                                                setContextValue({} as any);
                                            }
                                        });
                                    } }>
                                        <Center>
                                            { AppIcon({
                                                "type": "fas",
                                                "class": "arrow-right-from-bracket"
                                            }) }
                                            <span style={{ fontSize: "14px", position: "relative", top: "1.4px", fontWeight: 400 }}>
                                                Log out
                                            </span>
                                        </Center>
                                    </MuiButton>
                                </div>

                            </Box>
                        </ProSidebar> 
                    </div>

                    {pageContentIsVisible?(
                        <div id="page-content"  className="overflow-scroll" style={{ maxHeight: "100vh", height: "100vh", overflowY: "auto", "width": "100%", backgroundColor }}>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", "padding": pagePadding ? "30px": "0px" }}>
                                { props.children }
                            </div>
                        </div>
                    ):<></>}
                
                </div>

              
            ) : (
                <PagePreloader />
            )}

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

            <AysDialog open={ aysObject.open } onClose={()=>{
                ays({  ...aysObject, open: false })
            }} title={ aysObject.title } content={ aysObject.content } action={ aysObject.action } />
        </>
    );
}



function AppIcon(icon: AppIcon){
    let appIcon: JSX.Element = <div></div>;

    if (typeof icon != "undefined"){
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

    pagePadding?: boolean;

    backgroundColor?: string;
}