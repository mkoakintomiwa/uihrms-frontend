import * as React from "react"
import CircularProgress  from "@mui/material/CircularProgress"
import Dialog from "@mui/material/Dialog"
import Center from "../components/Center"

export default (props: ContainerProps)=>{    
    
    return(
        <Dialog open={ props.isloading }>
            <Center style={{ padding:"30px", paddingTop: "20px", minWidth: "200px", maxWidth: "60vw" }}>
                <div>
                    {props.title?
                        <Center style={{ marginBottom: "10px", fontSize: "15px", fontWeight: 600 }}>{ props.title }</Center>
                    :""}
                    <Center style={{ padding: "10px" }}>
                        <CircularProgress />
                    </Center>
                </div>
            </Center>
        </Dialog>
    )
}



interface ContainerProps{

    children?: any;

    style?: React.CSSProperties;

    isloading: boolean;

    title?: string;
}