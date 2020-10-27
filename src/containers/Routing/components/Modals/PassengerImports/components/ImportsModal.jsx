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

import PassengerAddress from '../../PassengerAddress';
import CloseIcon from 'mdi-react/CloseIcon';
import mapCirclePassengerArea from '../../../../utils/mapCirclePassengerArea';
import { getMapsPlacesComponents, sleep } from '../../../../utils/utils';

export default function ImportsModal(
  { routes,createPassenger,addPassenger,addPassengerMarkerListener,deletePassenger,passengers,passengerUpdate,generalRadius,handleClose, open }) {
  
  function getAddresses(query, passenger) {
  debugger
    // Call the geocode method with the geocoding parameters, the callback and an error callback function (called if a communication error occurs):
    var search_string = importType === "location" ? `latlng=${query.lat()},${query.lng()}` : `${importType}=${query}`
    var url = `https://maps.googleapis.com/maps/api/geocode/json?${search_string}&language=pt-BR&key=AIzaSyDNWfLrFUktmNHEskagJQX-_PsUokgkJ_M`;
    return new Promise((solve, eject) => 
      axios.get(url).then((res)=> {

        if (res.data.error_message || res.data.status === "ZERO_RESULTS") {
          
          // console.log(data.error_message);
          console.log(res.data.error_message,res.data.status)
          solve({result:null,passenger})
          //Nome,Rua, Bairro, CEP
        } else {
          solve({result:res.data.results[0],passenger})
        }
        
      }).catch((err)=>{console.log(err)/*alert(err)*/})
      )
    
  }
  async function handleImportPromises(promises) {

    Promise.all(promises).then((items) => {
debugger
      console.log(items)
      items.forEach((item, key) => {
        var passenger = item.passenger
        if (item.result != null) {
          
          
          switch (importType) {
            case "location":

              var addressComponents = getMapsPlacesComponents(item.result.address_components)
              passenger.street = addressComponents.street
              passenger.neighborhood = addressComponents.neighborhood
              passenger.city = addressComponents.city
              passenger.cep = addressComponents.cep
              passenger.status = true
              break;
            case "address":
            default:
              passenger.setPosition(item.result.geometry.location)
          }
        }else{
          passenger.status = false
        }
        addPassengerMarkerListener(passenger.marker,passenger.getId())
      })
      passengerUpdate()
    }).catch(err => {
      alert("Erro na importação!")
      console.log(err)

    });
  }
  
  const handleOnDrop = async (data,generalRadius) => {

    async function digestRequests({ query, passenger, index }) {
      //bedtime ?
      if (index % 10 === 0) await sleep(2000)
      return getAddresses(query,passenger)
      //return findPlaceFromQuery(query, id)
    }
    var promises = []
    switch (importType) {
      case "address":

        data.map((el, index) => {

          const { matricula, nome, rua, bairro, cidade, cep } = el.data
          debugger
          
          var passenger = createPassenger({ radius:parseInt(generalRadius),routes,positon: null, identifier: matricula, name: nome, street: rua, neighborhood: bairro, city: cidade, cep })
          addPassenger(passenger)
          
          promises.push(digestRequests(
            {
              query: `${rua}+${bairro}+${cidade}+${cep}`,
              passenger: passenger,
              index
            }
          ))
        })

        handleImportPromises(promises)
        break;
      case "location":

        

        data.map((el, index) => {

          const { nome, matricula, lat, lng } = el.data
          
          let position = new window.google.maps.LatLng(lat, lng)
          var passenger = createPassenger({ radius:parseInt(generalRadius),routes,position, identifier: matricula, name: nome })
          addPassenger(passenger)
          promises.push(digestRequests(
            {
              query: position,
              passenger: passenger,
              index
            }
          ))
        })

        handleImportPromises(promises)
        break;
      default:
        alert("Sem tipo de importação selecionada!")
    }
    
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
            Importação de passageiros
            </Typography>
          <Button autoFocus color="inherit" onClick={handleClose}>
            Ok
            </Button>
        </Toolbar>
      </AppBar>
      <DialogTitle id="form-dialog-title">Importação de passageiros</DialogTitle>
      <DialogContent>
        <ProcessorDataTabs importType={importType} generalRadius={generalRadius} handleChangeImportType={(event) => { setImportType(event.target.value) }} handleOnDrop={handleOnDrop} />
        <DataVisualizationTable handleDelete={handleDelete} passengers={passengers} />
      </DialogContent>

    </Dialog>

  )
}
