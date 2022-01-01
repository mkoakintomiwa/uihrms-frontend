import * as React from "react"

export default function PageBox(props: ContainerProps){    
    let style: React.CSSProperties = { 
        backgroundColor: "white", 
        width: "100%",
        padding: "30px",
        //margin-top: 50px,
        boxShadow: "0 0 5px rgba(0,0,0,0.3)"
    }


    return(
        <div style={style} {...props}>
            {props.children}
        </div>
    )
}

interface ContainerProps{

    variant?: "main" | "contain" | "fill";

    children?: any;

    style?: React.CSSProperties
}