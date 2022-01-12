import { sbAdminThemeColors } from "../themes/sb-admin/colors";
import AppIcon from "./AppIcon";


export default function SideColorWhiteBox(props: SideColorWhiteBoxProps){

    let color: string = "";

    switch(props.color){
        case "success":
            color = sbAdminThemeColors.success;
        break;

        case "primary":
            color = sbAdminThemeColors.primary;
        break;

        case "info":
            color = sbAdminThemeColors.info;
        break;

        case "warning":
            color = sbAdminThemeColors.warning;
        break;
    }

    return (
        <div style={{ width: "100%", height: "105px", backgroundColor: "white", borderLeft: `0.25rem ${color} solid`, borderRadius: "5px", display: "flex", alignItems: "center", paddingRight: "20px", paddingLeft: "20px", boxShadow: "0 .15rem 1.75rem 0 rgba(58,59,69,.15)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                
                <div style={{ width: "100%" }}>
                    <div style={{ color: color, fontSize: ".7rem", fontWeight: 700, marginBottom: "5px" }}>{ props.title }</div>

                    <div style={{ color: "#5a5c69", fontSize: "1.25rem", fontWeight: 700, lineHeight: 1.2, width: "100%" }}>
                        { props.children }
                    </div>
                </div>

                <div>
                    <AppIcon type={ props.icon.type } class={ props.icon.class } style={{ fontSize: "2em", color: "#dddfeb", fontWeight: 900 }} />
                </div>

            </div>
        </div>
    );
}


interface SideColorWhiteBoxProps{
    children?: any;

    color?: "success" | "primary" | "info" | "warning";

    title?: string;

    icon?: any;
}