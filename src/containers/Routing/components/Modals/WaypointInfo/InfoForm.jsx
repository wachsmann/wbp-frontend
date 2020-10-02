/* eslint-disable react/no-children-prop */
import React, { useState } from 'react';


import TextField from '@material-ui/core/TextField';

import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';

import RoomIcon from '@material-ui/icons/Room'
import MapIcon from '@material-ui/icons/Map';
import SearchPlacesInput from '../../MapControls/SearchPlaces/SearchPlacesInput';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
export default function InfoForm(props) {
  const {nearPassengers} = props
  const handleSearchPlacesSelected = (place) => {
    //console.log(nearPassengers)
    const { geometry } = place
    props.waypointInfo.setPosition(geometry.location)
    window.google.maps.event.trigger(props.waypointInfo.getMarker(), 'dragend',{latLng:()=>props.waypointInfo.getPosition()});
    
  }
  const classes = useStyles();
  return (
    <div>
      <FormControl fullWidth className={classes.margin}>
        <TextField
          
          onChange={props.handleWaypointNameChange}
          value={props.waypointName}
          label="Ponto" />
      </FormControl>

      <FormControl fullWidth className={classes.margin}>
        <SearchPlacesInput value={props.address} handleSearchPlacesSelected={handleSearchPlacesSelected} />
      </FormControl>
      
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align="right">Endereço</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {nearPassengers && Object.keys(nearPassengers).map((key) => (
              <TableRow key={nearPassengers[key].name}>
                <TableCell component="th" scope="row">
                  {nearPassengers[key].name}
                </TableCell>
                <TableCell align="right">{nearPassengers[key].street}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
