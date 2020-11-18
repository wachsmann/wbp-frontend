import React, { useState, useEffect, useRef } from 'react';

import Scrollbar from 'react-smooth-scrollbar';
import MainCard from './MainCard';
import RouteList from './RouteList'
import RouteSideBar from './RouteCard/RouteSideBar'
import Divider from '@material-ui/core/Divider';


import WaypointInfo from './Modals/WaypointInfo'
import PassengerAddress from './Modals/PassengerAddress';
import PassengerInfo from './Modals/PassengerInfo';
import { STOP } from '../utils/constants';
import Typography from '@material-ui/core/Typography';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import { NaturePeople } from '@material-ui/icons';
export default React.forwardRef((props, ref) => {
  const { routeProps, passengerProps,vehicleProps,waypoints, generalRadius, passengerModalOpen, setPassengerModalOpen, passengerSelected,distance} = props

  const [open, setOpen] = useState(false)
  const [infoModalOpen, setInfoModalOpen] = useState(false)

  const [waypointInfo, setWaypointInfo] = useState()
  const [waypointName, setWaypointName] = useState()

  useEffect(() => {
    if (!!routeProps.routeSelected) {
      /**
       * 
       * Hide Routes and show waypoints
       */
 
      routeProps.routeSelected.accentuate(true)

    }
  }, [open])
  const handleOpen = () => {
    setOpen(!open);
    if (open) {
      /**
       * show routes and hide waypoints 
      */
      
      routeProps.routeSelected.accentuate(false)
      routeProps.setRouteSelected()
    }
  }
  const handleItemClick = (routeId) => {
    if(!!routeProps.routes[routeId] && (!!routeProps.routes[routeId].getDestiny() && !!routeProps.routes[routeId].getOrigin())){
      handleOpen()
      routeProps.setRouteSelected(routeProps.routes[routeId])
    }
    
  }
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }
  const onDragEnd = ({ result, wpts }) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }
    
    var waypointsArray = reorder(
      Object.values(wpts),
      result.source.index,
      result.destination.index
    );
      debugger
    var newWaypoints = {}
    waypointsArray.map((el, index) => {
      el.setLabel(index)
      newWaypoints[el.getId()] = el
    })
    
    routeProps.routeSelected.setWaypoints(newWaypoints)
    
  }
  const handleDelete = (index) => routeProps.routeSelected.removeWaypoint(index)
  const handleWaypointClick = (waypointId) => {

    const currentSelected = routeProps.routeSelected

    if (currentSelected) {

      let waypoint = currentSelected.waypoints[waypointId]

      if (waypoint && waypoint.getWaypointType() === STOP) {

        var wpts = currentSelected.waypoints
        wpts = Object.keys(wpts).filter((key) => wpts[key].getWaypointType() === STOP)

        let index = Object.keys(wpts).findIndex((k) => wpts[k] === waypointId)
        waypoint.setAddress(currentSelected.getLeg()[index].end_address)
        setWaypointInfo(waypoint)
        setWaypointName(waypoint.getName())
        setInfoModalOpen(!infoModalOpen)
      }
    }
  }
  const handleWaypointInfoClose = () => {
    setInfoModalOpen(!infoModalOpen)
    setWaypointInfo(null)
  }

  const handleSetWaypointName = (name) => { setWaypointName(name) }


  const handlePassengerInfoClose = () => { setPassengerModalOpen(false) }


  return (
    <div ref={ref}>

      <WaypointInfo
        open={infoModalOpen}
        waypoint={waypointInfo}
        handleClose={handleWaypointInfoClose}
        handleInfoModal={handleWaypointClick}
        waypointName={waypointName}
        setWaypointName={handleSetWaypointName}
        
      />

      {
        passengerSelected &&
        <PassengerInfo
          open={passengerModalOpen}
          deletePassenger={passengerProps.deletePassenger}

          passenger={passengerSelected}
          routes={routeProps.routes}
          closePassengerWindow={handlePassengerInfoClose}


        />}
      <PassengerAddress
        routes={routeProps.routes}
        passengerProps={passengerProps}
        generalRadius={generalRadius}
      />


      <div className="sidebar sidebar--show" style={{ paddingTop: 0 }}>
        <Scrollbar className="sidebar__scroll scroll">
          <div className="sidebar__wrapper sidebar__wrapper--desktop">
            <MainCard {...props} />
            <div className="general_infos">
            <Typography className="info" variant="caption" display="block">
            <HourglassEmptyIcon />Tempo estimado:{distance}
            </Typography>
            <Typography className="info" variant="caption" display="block">
            <EmojiPeopleIcon />Passageiros: {passengerProps.passengers && Object.keys(passengerProps.passengers).length}
            </Typography>
            <Typography className="info" variant="caption" display="block">
            <NaturePeople />Pontos de embarque: {waypoints && Object.keys(waypoints).length}
            </Typography>
            <Typography className="info" variant="caption" display="block">
            <DirectionsBusIcon />Veículos: {vehicleProps.vehicles && Object.keys(vehicleProps.vehicles).length}
            </Typography>
            </div>
         
            <Divider />
            <RouteList routes={routeProps.routePlan} removeRoute={routeProps.removeRoute} handleItemClick={handleItemClick} />
            {
              routeProps.routeSelected ?
                <RouteSideBar route={routeProps.routeSelected} eventHandlers={{ handleOpen, onDragEnd, handleDelete, handleWaypointClick }} open={open} /> :
                ''
            }
          </div>
          <div className="sidebar__wrapper sidebar__wrapper--mobile"></div>
        </Scrollbar>
      </div>



    </div>
  )
})
