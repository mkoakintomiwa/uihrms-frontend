import * as React from "react"

export default (props: ContainerProps)=>{    
    let style = { display: "flex", justifyContent: "center", alignItems: "center", ...props.style }
    return(
        <div style={style}>
            {props.children}
        </div>
    )
}



interface ContainerProps{

    children?: any;

    style?: React.CSSProperties
}