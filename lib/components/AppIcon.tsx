import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/* eslint-disable @next/next/no-img-element */
export default function AppIcon(icon: AppIconProps){
    let appIcon: JSX.Element = <div></div>;

    if (typeof icon != "undefined"){
        if (["fas","fab"].includes(icon.type)){
            appIcon = <FontAwesomeIcon icon={[icon.type, icon.class]} style={ icon.style || {} } />
        }

        if (icon.type === "link"){
            appIcon = <img style={{
                maxWidth: "20px",
                height: "16px",
                margin: "0px 5px"
            }} src={ icon.url } alt="..." />
        }
    }

    return appIcon;
}


type AppIconProps = {
    
    type?: any;

    class?: any;

    url?: any;

    style?: React.CSSProperties;
}
