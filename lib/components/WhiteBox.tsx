import * as React from "react"

export default (props: ContainerProps)=>{    
    let style: React.CSSProperties = { 
        backgroundColor: "white", 
        width: "100%",
        padding: "30px",
        //margin-top: 50px,
        borderRadius: "18px",
        boxShadow: "0 0 5px rgba(0,0,0,0.3)"
    }

    switch(props.variant){
        case "main":
            style = {
                ...style,
                width: "400px",
                maxWidth: "70vw",
                marginTop: "20px"
            }
        break;
            
    }


    style = {
        ...style,
        ...props.style
    }

    return(
        <div style={style}>
            {props.children}
        </div>
    )
}

interface ContainerProps{

    variant?: "main" | "contain" | "fill";

    children?: any;

    style?: React.CSSProperties
}