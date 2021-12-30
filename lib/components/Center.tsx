import * as React from "react"

export default function Center(props: ContainerProps){    
    let style = { display: "flex", justifyContent: "center", alignItems: "center", ...props.style }

    if (props.fullscreen){
        style = {
            ...style,
            width: "100vw",
            height: "100vh"
        }
    }

    return(
        <div style={style}>
            {props.children}
        </div>
    )
}



interface ContainerProps{

    children?: any;

    style?: React.CSSProperties;

    fullscreen?: boolean;
}