import * as React from "react"

var Title = (props: ContainerProps)=>{    
    let style = {  
        fontFamily: "Open Sans,Roboto,Arial,sans-serif",
        lineHeight: "2.5rem",
        fontSize: "1.8rem",
        letterSpacing: 0,
        fontWeight: 400,
        color: "#202124",
        ...props.style
    }
    return(
        <div style={style}>
            {props.children}
        </div>
    )
}

export default Title;

interface ContainerProps{

    children?: any;

    style?: React.CSSProperties
}