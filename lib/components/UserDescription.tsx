import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Flex from "./Flex";
import ImageAvatar from "./ImageAvatar";

export default function UserDescription(props: UserDescriptionProps){
    const { contextValue, setContextValue } = useContext(AppContext);
    const user = typeof props.user != "undefined" ? props.user : contextValue.user!;

    return (
        <Flex style={{ marginBottom: "20px" }}>
            <ImageAvatar src={ user.passport } />
            <div style={{ marginLeft: "15px" }}>
                <Typography sx={{ fontSize: props.nameFontSize || "19px" }}>{ user.name }</Typography>
            <div style={{ fontSize: "14px", color: "gray" }}>{ user.title }</div>
            </div>
        </Flex>       
    )
}

interface UserDescriptionProps{
    user?: User;

    nameFontSize?: string;
}