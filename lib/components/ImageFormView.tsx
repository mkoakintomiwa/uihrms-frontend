/* eslint-disable @next/next/no-img-element */
import * as React from 'react';
import {useCallback,useState,useEffect} from 'react'
import Button from "@mui/material/Button"
import {useDropzone} from 'react-dropzone'
import ImageIcon from '@mui/icons-material/Image';
import Box from "@mui/material/Box"
import getBase64FromFile from "../browser/getBase64FromFile";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';



export default function ImageFormView(props: ImageFormViewProps) {

    const [snackBarIsOpened, openSnackBar] = useState(false);
    const [snackBarContent, setSnackBarContent] = useState(<div></div>)
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
	const [placeholderIsDefault, setPlaceholderIsDefault] = useState(!props.value);
	const [placeholderBase64, setPlaceholderBase64] = useState("");
	const [dragIsOngoing, setDragIsOngoing] = useState(false);

    let maxSize = typeof props.maxSize != "undefined" ? props.maxSize : Infinity;

	var FileListItems = function(files: any) {
		var b = new ClipboardEvent("").clipboardData || new DataTransfer()
		for (var i = 0, len = files.length; i<len; i++){ 
			b.items.add(files[i]);
		}
		return b.files
	}
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
	// (document.getElementsByName(props.name)[0] as HTMLInputElement).files = FileListItems(acceptedFiles);
    
	setDragIsOngoing(true);
	
	getBase64FromFile(acceptedFiles[0]).then((base64: any)=>{
		setDragIsOngoing(false)
		props.onChange(acceptedFiles[0]);

        if (acceptedFiles[0].size <= maxSize){
			setPlaceholderBase64(base64);
			setPlaceholderIsDefault(false);
        }else{
            openSnackBar(true);
            setSnackBarContent(<div>Image too large</div>);
            setSnackbarSeverity("error");
        }
    });
    //console.log();
  }, [props,maxSize]);


  	const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
   
	useEffect(function(){
		if (isDragActive){
			setPlaceholderIsDefault(false);
			setDragIsOngoing(true);
		}
	},[isDragActive]);

	const propsValue = props.value;

	useEffect(function(){
		if (!propsValue){
			setPlaceholderIsDefault(true);
		}
	},[propsValue])

	let imageStyle: any = props.fillParent?{ width: "100%", height: "100%" }:{ minWidth: "200px", maxWidth: "80vw", maxHeight: "60vh", width: props.width || "initial", height: props.height || "initial" };

	imageStyle = {
		...imageStyle,
		objectFit: "cover"
	};

  return (
    <div {...getRootProps()}>
        <input {...getInputProps()} />
        <input name={ props.name } type="file" style={{ display: "none" }} />
        <Button sx={{ minWidth: "200px", maxWidth: "80vw" }}>
            {placeholderIsDefault?(
				<ImageIcon style={props.fillParent?{ width: "100%", height: "100%" }:{ width: props.width || "200px", height: props.height || "200px",  minWidth: "200px", maxWidth: "80vw" }} />
			):(
				isDragActive || dragIsOngoing?
     			<Box component="span" sx={{ p: 2, border: '1px dashed grey', width: props.width || "200px", height: props.height || "200px" }}></Box>
				:
				<img alt="dragged_image" src={ placeholderBase64 } style= { imageStyle } />
			)}
        </Button>

        <Snackbar open={ snackBarIsOpened } autoHideDuration={6000} onClose={_e=>{ openSnackBar(false) }} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
            <
            // @ts-ignore
            Alert onClose={_e=>{ openSnackBar(false) }} severity={ snackbarSeverity } sx={{ width: '100%' }}>
                { snackBarContent }
            </Alert>
        </Snackbar>
    </div>
  )
}


interface ImageFormViewProps{
	name: string;

	value?: File;

    maxSize?: number; // in bytes

    fillParent?: boolean;

	width?: string;

	height?: string;

	onChange: (value: File) => void
}