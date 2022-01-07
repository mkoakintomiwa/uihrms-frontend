import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";


export default function FormSelect(props: HTMLSelectedProps){
    const { state, name } = props;

    let hasPlaceholder = typeof props.hasPlaceholder != "undefined" ? props.hasPlaceholder : false;

    return (
        <>
            <FormControl sx={{ marginBottom: "30px", width: "100%" }} error={ state.error }>
                <InputLabel>{ state.label }</InputLabel>
                
                <Select
                    value={ state.value }
                    label={ state.label }
                    onChange={ props.onChange }
                    name={ name } 
                >
                    {(hasPlaceholder)?(
                        <MenuItem value="">
                            <em>-Select-</em>
                        </MenuItem>
                    ):(
                        []
                    )}

                    {Object.keys(props.options).map(key=>{
                        let value = props.options[key];
                        return <MenuItem key={`menu-item-${key}`} value={key}>{value}</MenuItem>
                    })}
                </Select>
                <FormHelperText>{ state.helperText }</FormHelperText>
            </FormControl>
        </>
    )
}


interface HTMLSelectedProps{

    children?: any;

    style?: React.CSSProperties;

    options: Record<string, string>;

    name: string;

    state: FormObject;

    label?: string;

    value?: string;

    error?: boolean;

    helperText?: string;

    hasPlaceholder?: string;

    onChange?: (e: any)=>void;
}