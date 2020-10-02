import React, {useState, useEffect} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import InfoForm from './InfoForm';
import Button from '@material-ui/core/Button';

import {getMapsPlacesComponents} from '../../..//utils/utils'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { FormControl, TextField, InputLabel, Select, MenuItem} from '@material-ui/core';
import SearchPlacesInput from '../../MapControls/SearchPlaces/SearchPlacesInput';



export default function PassengerInfo(props) {
  const {
    passenger,
    routes,
    open,
    deletePassenger,
    closePassengerWindow
    
    
  } = props

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  const ref = React.createRef();


  const classes = useStyles();

  const [passengerName, setPassengerName] = React.useState(passenger.identifier)

  const [routeId, setRouteId] = React.useState(passenger.routeId)
  const [address, setAddress] = React.useState(passenger.street)


  const handleSearchPlacesSelected = (place) => {
    const { geometry } = place 

    if(place.address_components){
      const {street,city,neighborhood} = getMapsPlacesComponents(place.address_components)
      
      passenger.city = city
      passenger.neighborhood = neighborhood
      passenger.street = street
      setAddress(street)
    }

    
    if(geometry){
      passenger.setPosition(geometry.location)
      window.google.maps.event.trigger(passenger.marker, 'dragend',{latLng:()=>passenger.marker.getPosition()});
    }
      
    
  }

  const handleChange = (event) => {
    setRouteId(event.target.value);
    passenger.routeId = event.target.value

  }

  const handleDelete = () => {
    deletePassenger(passenger.getId())
    closePassengerWindow()
  }
  
  
  const handleWaypointNameChange = (e)=>{
    //setWaypointName(e.target.value)
    console.log("handleWaypointNameChange",e)
  }
  

 
  return (
    <div id="passenger_info_modal" ref={ref}>
    <Dialog open={open} onClose={closePassengerWindow}  maxWidth={"lg"} aria-labelledby="form-dialog-title">
      
      <DialogContent>
      
      <FormControl fullWidth className={classes.margin}>
        <TextField

          onChange={e => {
            setPassengerName(e.target.value)
            passenger.identifier = (e.target.value)
          }
          }
          value={passengerName}
          label="Matrícula" />
      </FormControl>

      <FormControl fullWidth className={classes.margin}>
        <SearchPlacesInput value={address} handleSearchPlacesSelected={handleSearchPlacesSelected} />
      </FormControl>
      <FormControl fullWidth className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Rotas</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={routeId}
          onChange={handleChange}
        >
          { routes && Object.keys(routes).map((key, index) => {
            let route = routes[key]
            return <MenuItem value={route.getId()}>{route.getName()}</MenuItem>
          }
          )
          }



        </Select>
      </FormControl>
      </DialogContent>
      <DialogActions>
      <Button onClick={closePassengerWindow} color="primary">Cancelar</Button>
        <Button onClick={handleDelete} color="primary">Excluir</Button>
        <Button onClick={closePassengerWindow} color="primary">Ok</Button>
        
      </DialogActions>
    </Dialog>
  </div>
  );
}
