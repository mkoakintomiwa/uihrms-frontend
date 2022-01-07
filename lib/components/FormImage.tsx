import Center from "./Center";
import ImageFormView from "./ImageFormView";

export default function FormImage(props: FormImageProps){
    
    const { state, name } = props;

    return ( 
        <div id={ `image-${name}` }>
            <Center style={{ width: "100%", flexDirection: "column" }}>
                <Center>{ state.label }</Center>
                { state.error ? <Center style={{ color: "#d32f2f" }}>{ state.helperText }</Center> : <></> }
                <Center>
                    <ImageFormView value={ state.value } name={ name } maxSize={ state.maxSize! || Infinity } width={ state.width || "200px" } height={ state.height || "200px" } onChange = { props.onChange! } />
                </Center>
            </Center>
        </div>
    )
}


interface FormImageProps{

    children?: any;

    style?: React.CSSProperties;

    state: FormObject;

    name: string;

    label?: string;

    value?: string;

    error?: boolean;

    helperText?: string;

    hasPlaceholder?: string;

    onChange?: (e: File) => void;

    width?: string;

    height?: string;

    maxSize?: number;
}