// function htmlSelected(selected: string,attributes: string,contentObject: Object, has_placeholder=true){
//     if (has_placeholder){
// 		contentObject = Object.assign({
// 			"":"-Select-"
// 		},contentObject);
// 	}
//     let select=`<select ${attributes}>`;
// 	Object.keys(contentObject).forEach(function(k: string){
// 		let v = contentObject[k];
//         let f;
//         if (k===selected){
// 			f = `selected`;
// 		}else{
// 			f = '';
// 		}
		
// 		select+=`<option value='${k}' ${f}>${v}</option>`;
// 	});
// 	select+='</select>';
	
// 	return select;
// };

import * as React from "react"
import { useState } from "react"
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default (props: ContainerProps)=>{    
    let options = props.options;

    let defaultValue = typeof props.selected != "undefined" ? props.selected : "";
    let hasPlaceholder = typeof props.hasPlaceholder != "undefined" ? props.hasPlaceholder : true;

    const [value, setValue] = useState(defaultValue);
    
    if (hasPlaceholder){
        options = {
            "":"-Select-",
            ...options
        };
    }


    return(
        <Select value={value} onChange={e=>{
            setValue(e.target.value);
        }} {...props}>
            {Object.keys(options).map(key=>{
                let value = options[key];
                return <MenuItem value={key}>{value}</MenuItem>
            })}
        </Select>        
    )
}



interface ContainerProps{

    children?: any;

    value?: string;

    selected?: string;

    style?: React.CSSProperties;

    options?: any;

    hasPlaceholder?: boolean;
}