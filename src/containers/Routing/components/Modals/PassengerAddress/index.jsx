import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Passenger from '../../../model/Passenger'
import Button from '@material-ui/core/Button';
import { DialogContentText, DialogTitle, TextField } from '@material-ui/core';
import mapCirclePassengerArea from '../../../utils/mapCirclePassengerArea';


export default function PassengerAddress(props) {
  const { passengerProps, routes, generalRadius } = props
  const { newPassengerComponents, openNewPassengerWindow, createPassenger, addPassenger, handleNewPassengerWindow } = passengerProps


  const ref = React.createRef();
  const [identifier, setIdentifier] = useState("")

  const getRoutes = () => {
    console.log('getting routes ...', routes)
    return routes
  }
  const insertPassenger = () => {
    if (newPassengerComponents) {
      //console.log(generalRadius)
      /*
       const passenger = createPassenger(
         { 
           id:newPassengerComponents.id,
           marker:newPassengerComponents.marker,
           centerPoint:mapCirclePassengerArea(newPassengerComponents.marker.getPosition(),generalRadius),
           radius:generalRadius,
           getRoutes,
           position:newPassengerComponents.position,
           identifier,
           status:true,
           street:newPassengerComponents.street,
           neighborhood:newPassengerComponents.neighborhood,
           city:newPassengerComponents.city,
           cep:newPassengerComponents.cep
         }
       )
       */
      
      addPassenger(newPassengerComponents)
      
      setIdentifier("")
      handleNewPassengerWindow()
    }

  }

  const cancelCreationAndClose = ()=>{
    newPassengerComponents.terminate()
    handleNewPassengerWindow()
  }
  return (
    <div id="address_dialog" ref={ref}>
      <Dialog open={openNewPassengerWindow} onClose={cancelCreationAndClose}>
        <DialogTitle id="form-dialog-title">Novo passageiro</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Adicione um nome ao passageiro para inseri-lo.
          </DialogContentText>

          <TextField autoFocus value={identifier} onChange={(e) => setIdentifier(e.target.value)} fullWidth margin="dense" label="Identificador" type="text" />
          <TextField fullWidth margin="dense" label="Rua" type="text" value={newPassengerComponents.street} />
          <TextField fullWidth margin="dense" label="Bairro" type="text" value={newPassengerComponents.neighborhood} />
          <TextField fullWidth margin="dense" label="Cidade" type="text" value={newPassengerComponents.city} />
          <TextField fullWidth margin="dense" label="CEP" type="text" value={newPassengerComponents.cep} />
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelCreationAndClose} color="primary">Cancelar</Button>
          <Button onClick={insertPassenger} disabled={!identifier || identifier.length < 4} color="primary">Inserir </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
