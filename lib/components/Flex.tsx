import * as React from "react"

export default (props: ContainerProps)=>{    
    let style = { display: "flex", ...props.style }

    if (props.alignItems) style["alignItems"] = props.alignItems;

    if (props.justifyContent) style["justifyContent"] = props.justifyContent;

    return(
        <div style={style}>
            {props.children}
        </div>
    )
}



interface ContainerProps{

    children?: any;

    style?: React.CSSProperties

    alignItems?: AlignSetting;

    justifyContent?: AlignSetting;
}