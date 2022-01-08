import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"

export default function TextBox(props: TextBoxProps){
    var { state, name } = props;

    return (
        <Box mb={5}>
            <TextField  {...props} name={ name } label={ state.label } variant="standard" style={{ width: "100%" }} multiline helperText={ state.helperText } error={ state.error } value={ state.value } onChange={ props.onChange } spellCheck={ false } />
        </Box>
    )
}

interface TextBoxProps{

    children?: any;

    style?: React.CSSProperties

    name: string;

    state?: any;

    label?: string;

    value?: string;

    error?: boolean;

    helperText?: string;

    onChange?: (e: any)=>void;
}