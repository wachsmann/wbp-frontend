import React, {useState, useEffect} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import { useSelector } from 'react-redux';


export default function SaveInfo(props) {
  const {
      open,
      handleRoutingSave,
      handleClose,
      routingName,
      setRoutingName
  } = props
  const ref = React.createRef();
  const onClickClose = () => {
    setRoutingName(routingName)
    handleClose()
  }


  return (
    <div id="save_info_modal" ref={ref}>
    <Dialog open={open} onClose={onClickClose}  maxWidth={"lg"} aria-labelledby="form-dialog-title">
      
      <DialogContent>
      <TextField autoFocus value={routingName} onChange={(e) => setRoutingName(e.target.value)} fullWidth margin="dense"  label="Nome da roteirização" type="text" /> 
      </DialogContent>
      <DialogActions>
      <Button onClick={onClickClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={()=>handleRoutingSave(routingName)} disabled={routingName.length < 5 } color="primary">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  </div>
  );
}
