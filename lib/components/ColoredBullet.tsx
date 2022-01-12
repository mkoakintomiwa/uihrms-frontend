import { sbAdminThemeColors } from "../themes/sb-admin/colors";

export default function ColoredBullet(props: ColoredBulletProps){
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
        <span style={{ ...props.style }} {...props}>
            <i className="fas fa-circle" style={{ color }}></i> { props.label || ""}
        </span>
    )


}


interface ColoredBulletProps{
    children?: any;

    color?: "success" | "primary" | "info" | "warning";

    label?: string;

    style?: React.CSSProperties;
}