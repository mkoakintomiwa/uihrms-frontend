import * as React from "react"

var Container = (props: ContainerProps)=>{    
    let style = props.style;
    
    if (props.fullscreen){
        style = { width:"100vw", height: "100vh", ...style };
    }

    if (props.color){
        style = { backgroundColor: props.color, ...style }
    }

    if (props.centralize){
        style = { display: "flex", justifyContent: "center", alignItems: "center", ...style }
    }
    
    return(
        <div style={style}>
            {props.children}
        </div>
    )
}

export default Container;

interface ContainerProps{

    children?: any;

    style?: React.CSSProperties

    fullscreen?: any;

    color?: string;

    centralize?: any;
}