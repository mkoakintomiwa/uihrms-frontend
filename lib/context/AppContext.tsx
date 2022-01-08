import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import Swal from 'sweetalert2'
import withReactContent, { ReactSweetAlert } from 'sweetalert2-react-content'

export type AppContextObject = {
    
    initialLoadIsReady?: boolean;

    user?: User;

    menuItems?: any;

    sidebarState: any;

    Swal: typeof Swal & ReactSweetAlert;

    topbar: TopBar;
}

type AppContextState = {

    contextValue: AppContextObject;

    setContextValue: Dispatch<SetStateAction<AppContextObject>>;   
}

export var AppContext = createContext({} as AppContextState);

export default function AppContextProvider(props:any){
    
    const [contextValue, setContextValue] = useState({ 
        initialLoadIsReady: false,  
        Swal: withReactContent(Swal),
    } as AppContextObject);

    useEffect(function(){
        if (!contextValue.topbar){
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

            setContextValue({ ...contextValue, topbar  })
        }
    },[contextValue]);

    return <AppContext.Provider value={{ contextValue, setContextValue }}>
        { props.children }
    </AppContext.Provider>
};