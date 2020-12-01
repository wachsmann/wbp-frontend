import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ProcessorDataTabs from './ProcessorDataTabs';
import DataVisualizationTable from './DataVisualizationTable';

import { AppBar, IconButton, Typography, Toolbar, makeStyles } from '@material-ui/core';
import Passenger from '../../../../model/Passenger'
import axios from 'axios';
import google from '../../../../../../config/google'
import {mongoObjectId,getMapsPlacesComponents,sleep,getRandomColor} from '../../../../utils/utils'
import PassengerAddress from '../../PassengerAddress';
import CloseIcon from 'mdi-react/CloseIcon';
import mapCirclePassengerArea from '../../../../utils/mapCirclePassengerArea';

export default function ImportsModal(
  { vehicles,createVehicle,addVehicle,deletePassenger,generalRadius,handleClose, open }) {
  
  const handleOnDrop = async (data,generalRadius) => {
    var promises = []
  
        data.map((el, index) => {

          const { prefixo,placa,capacidade} = el.data
          
                    
          var vehicle = createVehicle({ prefix:prefixo,plate:placa,capacity:capacidade})
          debugger
          addVehicle(vehicle)
         
        })
  }

  const [importType, setImportType] = React.useState('address')

  const handleDelete = (id) => {

    deletePassenger(id)

    return
  }
  const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
  }));
  const classes = useStyles();
 
  return (
    <Dialog fullScreen open={open} onClose={handleClose} maxWidth={"lg"} aria-labelledby="imports-form">
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
          Importação de veículos
            </Typography>
          <Button autoFocus color="inherit" onClick={handleClose}>
            Ok
            </Button>
        </Toolbar>
      </AppBar>
      <DialogTitle id="form-dialog-title">Importação de veículos</DialogTitle>
      <DialogContent>
        <ProcessorDataTabs   handleOnDrop={handleOnDrop} />
        <DataVisualizationTable handleDelete={handleDelete} vehicles={vehicles} />
      </DialogContent>

    </Dialog>

  )
}
