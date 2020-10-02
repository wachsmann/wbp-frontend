import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ConfigurationForm from './ConfigurationForm';

export default function ConfigurationModal(props) {
    

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}  maxWidth={"md"} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Configurações</DialogTitle>
        <DialogContent>
          <DialogContentText>
            
          </DialogContentText>
          <ConfigurationForm {...props}/>
        </DialogContent>
        <DialogActions>
          
          <Button onClick={props.handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
