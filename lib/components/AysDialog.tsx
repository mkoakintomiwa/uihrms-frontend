import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AysDialog(props: AysDialogProps) {

	return (
		<div>
		<Dialog
			open={props.open}
			onClose={ props.onClose }
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">
				{ props.title }
			</DialogTitle>
			
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					{ props.content }
				</DialogContentText>	
			</DialogContent>
				<DialogActions>
				<Button onClick={ props.onClose }>No</Button>
				
				<Button onClick={ e=>{
					props.onClose();

					setTimeout(function(){
						props.action();
					},200);
				} } autoFocus>
					Yes
				</Button>
			</DialogActions>
		</Dialog>
		</div>
	);
}

interface AysDialogProps{
    open: boolean;

    onClose: ()=>void

    title: string;

    content: string;

    action: ()=>void;
}