import { createContext, Dispatch, SetStateAction, useState } from "react";

export type AppContextObject = {
    
    initialLoadIsReady?: boolean;

    user?: User;

    menuItems?: any;

    sidebarState: any;
}

type AppContextState = {

    contextValue: AppContextObject;

    setContextValue: Dispatch<SetStateAction<AppContextObject>>;   
}

export var AppContext = createContext({} as AppContextState);

export default function AppContextProvider(props:any){
    
    const [contextValue, setContextValue] = useState({ initialLoadIsReady: false } as AppContextObject);

    return <AppContext.Provider value={{ contextValue, setContextValue }}>
        { props.children }
    </AppContext.Provider>
};