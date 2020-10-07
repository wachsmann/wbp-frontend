import React, { useState, useEffect } from 'react';
import Map from "./Map"

import classNames from 'classnames'
import { ORIGIN, DESTINY, STOP,ADDRESS,SOFT, LIGHT} from "../utils/constants"
import {mongoObjectId,getMapsPlacesComponents,sleep,getRandomColor} from '../utils/utils'


import { renderToString } from 'react-dom/server'
import { RoutePolyline, Route, Waypoint,Vehicle, RouteServiceModel, PassengerServiceModel,Passenger } from '../../Routing/model'
import Origin from './Icons/Origin'
import Destiny from './Icons/Destiny'

import mapCirclePassengerArea from '../utils/mapCirclePassengerArea';

import objectKeyRemover from '../utils/objectKeyRemover';
import { actions as routingAction } from '../../../redux/reducers/routingReducer'
import darkMode from '../utils/darkMode';

import Loader from './Loader';
import RoutingService from '../../../redux/services/RoutingService';
import { useDispatch, useSelector } from 'react-redux';

import { withRouter } from 'react-router';

import newMarker from '../utils/newMarker';

import store from '../../App/store';
import { initMap } from '../utils/waypointsProcessor';
import { socketFactory } from '../utils/socketFactory';
import WaypointServiceModel from '../model/WaypointServiceModel'
import DepotServiceModel from '../model/DepotServiceModel';
import { VehicleServiceModel } from '../model/VehicleServiceModel';
var sock;
const RoutingMap = (props) => {
  const { editMode, history } = props
  const id = editMode ? props.match.params.id : null

  const dispatch = useDispatch()


  const serviceRouting = new RoutingService(routingAction)
 
  const passengerControlRef = React.createRef();
  const vehicleControlRef = React.createRef();
  const solveControlRef = React.createRef();
  const configurationControlRef = React.createRef();
  const mainSideBarRef = React.createRef();
  const topBarActionsRef = React.createRef();

  const handleSolveAction = () => { 
    const visits = WaypointServiceModel(waypointsRef.current) 
    const vehicles = VehicleServiceModel(vehiclesRef.current) 
    const origin = DepotServiceModel(originMarkerRef.current)
    const destiny = DepotServiceModel(destinyMarkerRef.current)
    if(
      visits.length > 0 && 
      vehicles.length > 0 &&
      !!origin &&
      !!destiny
    ){
     
      sock.send('/app/clear');
     
      //dispatch(serviceRouting.solve({origin,destiny,vehicles,visits}))
      sock.send('/app/planning', JSON.stringify({origin,destiny,vehicles,visits}));
        
          sock.subscribe('/topic/route', (message) => {
            
            Object.keys(routesRef.current).map((route)=>{
              removeRoute(route)
            })
            const plan = JSON.parse(message.body);
            
            setRoutePlan(plan)
            //dispatch(serviceRouting.solution(plan))
            setDistance(plan.distance)
            if(plan.routes){
              plan.routes.forEach((route)=>{
                let newRoute = new Route(route)
                //console.log(newRoute)
                setRoutes({ ...routesRef.current, ...{ [newRoute.getId()]: newRoute } })
              })
            }
            
          });
    }else{
      alert("Configurações incompletas, por favor insira passageiros, veículos, origem e destino!")
    }
   
  }

  const [routePlan, setRoutePlan] = useState()
  const [loading, setLoading] = useState(true)
  const handleLoading = (status) => setLoading(status)

  /** PIN TYPE */
  const [pinType, _setPinType] = useState(ORIGIN)
  const pinTypeRef = React.useRef(pinType)
  const setPinType = data => {

    pinTypeRef.current = data
    _setPinType(data)
  }
  
  useEffect(() => {
    function sucessCallback(res){
      console.log('open');
      
      
    }
    function errorCallback(res){}
    sock = socketFactory(sucessCallback,errorCallback)
    console.log(sock)
   
    sock.onopen = function() {
       
    };
   
    sock.onmessage = function(e) {
        console.log('message', e.data);
        sock.close();
    };
  
  
    sock.onclose = function() {
        console.log('close');
    };
    if (editMode) {
      
      //dispatch(service.getItem('routing', id))
      const routingUnsubscribe = store.subscribe(() => {
        
        const { routing } = store.getState()
        if (!!routing.item) {
          if (!!!window.google) {
            alert("Google Maps não carregou corretamente, por favor cheque sua internet e tente novamente!")
          } else {
            routingUnsubscribe()
            
            fetchRouting(routing.item)
          }
        }
      })
     
      return () => { 
        routingUnsubscribe()
      }
    }
  }, [])
  const fetchRouting = async (routing) => {

    if (!!routing && routing.id) {
      //Configurations 
      
      setGeneralRadius(routing.radiusRange)
      
      
      var bounds = new window.google.maps.LatLngBounds();
      //Set fixed destiny and bounds

      //Routes
      if (!!routing.routes && routing.routes.length > 0) {
        
        //One Destiny
        let position = !!routing.routes[0].destiny ? { lat: routing.routes[0].destiny.lat, lng: routing.routes[0].destiny.lng } : { lat: 0, lng: 0 }
        bounds.extend(position);
        setFixedMark(setMarkerIcon({ marker: newMarker({ position }), type: DESTINY }))
/*
        if (!!fixedMarker)
          fixedMarker.addListener("dragend", calculateAndDisplayRoute)
*/
        //ready to mount routings
        routing.routes.map((route) => {
          var newRoute = null
        
              if (route.origin) {
                let position = { lat: route.origin.coordinates[1], lng: route.origin.coordinates[0] }
                bounds.extend(position)

                let marker = setMarkerIcon({ color: route.color, marker: newMarker({ position }), type: ORIGIN })
                //Route
                //newRoute = new Route({ id: route.id, name: route.name, fixedMarker, marker, color: route.color })

                //setRoutes({ ...routesRef.current, ...{ [newRoute.getId()]: newRoute } })


              }
           

          if (!!newRoute) {
            
           
          }

        })
        window.map.fitBounds(bounds)
        window.map.panToBounds(bounds)
      }
      //Passengers
      if (!!routing.clusterPoints) {
        routing.clusterPoints.map((passenger) => {
          if (!!passenger) {
            const { name, street, neighborhood, city, cep } = passenger
            let position = !!passenger.position ? { lat: passenger.position.coordinates[1], lng: passenger.position.coordinates[0] } : { lat: 0, lng: 0 }
            addPassenger(createPassenger({ position, identifier: passenger.id, name, street, neighborhood, city, cep }))
          }

        })
      }

      handleLoading(false)

    }
  }


  /** ROUTE */
  
  const handleRoutingSave = (name) => {
    
    
    if(routePlan){
      const visits = WaypointServiceModel(waypointsRef.current) 
      const vehicles = VehicleServiceModel(vehiclesRef.current) 
      const origin = DepotServiceModel(originMarkerRef.current)
      const destiny = DepotServiceModel(destinyMarkerRef.current)
      const routes = routePlan.routes

      sock.send('/app/planning/store', JSON.stringify({name:routingNameRef.current,radius:getCurrentRadius(),visits,vehicles,origin,destiny,routes}))
    }
    /*
    if (editMode) {
      //return dispatch(service.update('group', undefined, Object.assign({ id }, formData),history))
      routing.id = id
      return dispatch(serviceRouting.update(routing, history))
    } else {

      return dispatch(
        serviceRouting.store(routing, history)
      )

    }
*/

  }
  
  const [routingName, _setRoutingName] = useState("")
  const routingNameRef = React.useRef(routingName)
  const setRoutingName = data => {
    routingNameRef.current = data
    _setRoutingName(data)
  }

  const [routes, _setRoutes] = useState({})
  const routesRef = React.useRef(routes)

  const setRoutes = data => {
    routesRef.current = data
    _setRoutes(data)
  }
  const [distance, _setDistance] = useState("")
  const distanceRef = React.useRef(distance)

  const setDistance = data => {
    distanceRef.current = data
    _setDistance(data)
  }


 
  /** UPDATES ON STATES */
  const routesUpdate = () => setRoutes({ ...routesRef.current })
  
  /** Origin */
  const [originMarker, _setOriginMarker] = useState()
  const originMarkerRef = React.useRef(originMarker)
  const setOriginMarker = data => {
    originMarkerRef.current = data
    _setOriginMarker(data)
  }
    
  /** Destiny */
  const [destinyMarker, _setDestinyMarker] = useState()
  const destinyMarkerRef = React.useRef(destinyMarker)
  const setDestinyMarker = data => {
    destinyMarkerRef.current = data
    _setDestinyMarker(data)
  }
  /** PASSENGERS */
  const [passengers, _setPassengers] = useState({})
  const passengersRef = React.useRef(passengers)
  const setPassengers = data => {
    passengersRef.current = data
    _setPassengers(data)
  }
  const addPassenger = (passenger) => {
    setPassengers({ ...passengersRef.current, ...{ [passenger.getId()]: passenger } })
    window.google.maps.event.trigger(passenger.marker, 'dragend', { latLng: () => passenger.marker.getPosition() })
  }
  const passengerUpdate = () => {
    setPassengers({ ...passengersRef.current })
    var wpts = initMap(parseInt(generalRadiusRef.current),Object.values(passengersRef.current))
    wpts.forEach((wpt)=>{
      addWaypoints(wpt)
    })
    console.log(waypointsRef.current)
  }
  const deletePassenger = (id) => {

    if (passengersRef.current[id]) {
      var passenger = passengersRef.current[id]
      return new Promise((solve, eject) => {
        if (window.confirm("Atenção! Você está removendo um passageiro, deseja continuar?")) {
          if (passenger.waypointId)
            routesRef.current[passenger.routeId].waypoints[passenger.waypointId].removeNearPoint(passenger)

          passenger.terminate();

          setPassengers(objectKeyRemover(passengersRef.current, id))
          setPassengerSelected()
          //remove address attached to waypoints
          solve()
        }
      })
    }
  }
  const [passengerModalOpen, setPassengerModalOpen] = useState(false)
  const [passengerSelected, setPassengerSelected] = useState(null)
    /** PASSENGERS */
    const [vehicles, _setVehicles] = useState({})
    const vehiclesRef = React.useRef(vehicles)
    const setVehicles = data => {
      vehiclesRef.current = data
      _setVehicles(data)
    }
    const addVehicle = (vehicle) => {
      setVehicles({ ...vehiclesRef.current, ...{ [vehicle._id]: vehicle } })
      console.log(vehiclesRef.current)
    }
    
    const deleteVehicle = (id) => {
  
      if (vehiclesRef.current[id]) {
        var vehicle = vehiclesRef.current[id]
        return new Promise((solve, eject) => {
          if (window.confirm("Atenção! Você está removendo um passageiro, deseja continuar?")) {
            
            setVehicles(objectKeyRemover(vehiclesRef.current, id))
            solve()
          }
        })
      }
    }
    /** WAYPOINTS */
    const [waypoints, _setWaypoints] = useState({})
    const waypointsRef = React.useRef(waypoints)
    const setWaypoints = data => {
      waypointsRef.current = data
      _setWaypoints(data)
    }
    const addWaypoints = (waypoint) => {
      setWaypoints({ ...waypointsRef.current, ...{ [waypoint._id]: waypoint } })
      
    }
    
  /** NEW PASSENGER */
  const [newPassengerComponents, _setNewPassengerComponents] = useState(
    {
      cep: undefined,
      city: undefined,
      sublocality: undefined,
      neighborhood: undefined,
      street: undefined
    }
  )

  const newPassengerComponentsRef = React.useRef(newPassengerComponents)
  const setNewPassengerComponents = data => {
    newPassengerComponentsRef.current = data
    _setNewPassengerComponents(data)
  }
  const handleNewPassengerWindow = () => {
    /** delete passenger created */
    setOpenNewPassengerWindow(!openNewPassengerWindow)
  }
  const [openNewPassengerWindow, setOpenNewPassengerWindow] = useState(false)
  /** RADIUS */
  const MAX_RADIUS = 3000 //meters
  const MIN_RADIUS = 0 //meters
  const [generalRadius, _setGeneralRadius] = useState(MAX_RADIUS)
  const generalRadiusRef = React.useRef(generalRadius)
  const setGeneralRadius = data => {
    generalRadiusRef.current = data
    _setGeneralRadius(data)
  }
  const applyGeneralRadius = ()=>{
    console.log("applyGeneralRadius")
    
    Object.keys(waypointsRef.current).map((key) => {
      waypointsRef.current[key].terminate()
    })
    setWaypoints({})
    passengerUpdate()
  }
  const handleGeneralRadius = (radius) => {
    if (radius <= MAX_RADIUS && radius >= MIN_RADIUS) {
      setGeneralRadius(radius)
   
      
      
    } else {
      alert("Fora do raio permitido!")
    }

  }
  const getCurrentRadius = () => generalRadiusRef.current
  const clickerListener = ({ e, map }) => {

    const marker = newMarker({ position: { lat: e.latLng.lat(), lng: e.latLng.lng() } })
    addMark({ marker })

  }
  /**
  * ROUTING CLASS
  */

  /*
  *    
  *   Remove route from routing
  *    
  *    @param {integer} index - of route clicked
  
  */

 function removeRoute(_id) {
  var route = routesRef.current[_id]
  
    
      

      route.terminate();
      setRoutes(objectKeyRemover(routesRef.current, _id))

      
      //remove address attached to waypoints
    


}
  /*
  *    
  *   Adds a marker on map. 
  *   
  *    @param {obj{lat,lng}} position - position of marker
  *    @param {string} color - color in hex
  *    @param {integer} pin_type - type of marker to be made 
  *    
  
  */

  const addPassengerMarkerListener = (marker, id) => {

    window.google.maps.event.addListener(marker, 'click', (event) => {
      setPassengerSelected(passengersRef.current[id])
      setPassengerModalOpen(true)

    })

    window.google.maps.event.addListener(marker, 'dragend', (event) => {
      /**
       * run method to iterate all routes and make them run Proximity method like when calculateAndDisplayRoutes
       */
 
    })

  }
  const createFixedMarkByType = ({ type, marker }) => {
    var setMarkerType = {
      [ORIGIN]: "setOrigin",
      [DESTINY]: "setDestiny"
    }
    if (!!!destinyMarkerRef.current) {

      setFixedMark(setMarkerIcon({ marker, type }))
      let routes = routesRef.current
      Object.keys(routes).forEach((key) => {
        routes[key][setMarkerType[type]](destinyMarkerRef.current);
      })

    } else {
      marker.setMap(null)
      destinyMarkerRef.current.setPosition(marker.getPosition())
    }
    /*
    if (!!fixedMarker)
      calculateAndDisplayRoute()
    */
  }
  const setLeaveMarker = ({ marker, color, type }) => {
    
    if(!!originMarkerRef.current){
       originMarkerRef.current.setPosition(marker.getPosition());
       marker.setMap(null)
    }else{
      setOriginMarker(setMarkerIcon({ marker, color, type }))
    }
    
   
  }
  const addMark = ({ marker, color = getRandomColor(), pin_type = pinTypeRef.current, load = null }) => {
    

    return new Promise((resolve, reject) => {
      if (!!!marker) return null;
      switch (parseInt(pin_type)) {
        case ORIGIN:
            resolve(
                setLeaveMarker({ marker, color, type: ORIGIN }) 
            )
          break
        case DESTINY:
          resolve(
          
              createFixedMarkByType({ type: DESTINY, marker })
          
          )
          break;
        default:
          return
      }
    })
  }
  const createVehicle = ({prefix,plate,capacity}) => new Vehicle({prefix,plate,capacity})
  const createPassenger = ({ marker, radius, routes, position, identifier, name, street, neighborhood, city, cep }) => {


    let id = mongoObjectId()
    if (!marker)
      marker = newMarker({ position })
      marker.zIndex = 2
    /**
     * ADD LISTENER ON MARKER
     */
    radius = parseInt(getCurrentRadius())

    addPassengerMarkerListener(marker, id)

    return new Passenger({ id, radius, routes, marker, identifier, name, street, neighborhood, city, cep })

  }
  /**
  * 
  * Set marker passed to the fixed marker of the routing 
  * 
  * @param {google.maps.Marker} marker 
  */
  const setFixedMark = (marker) => {
    if (typeof marker == "undefined") throw "marker is undefined!"
    //if (typeof fixedMarker != "undefined" && fixedMarker != null) fixedMarker.setMap(null)
    setDestinyMarker(marker)
    

    //marker.addListener("dragend", calculateAndDisplayRoute);
  }


  

  
  /**
   * Marker display and route creation 
   */

  const setMarkerIcon = ({ type, marker, color = "#2C888C" }) => {
    if (!!marker && Number.isInteger(type)) {
      const icon = type === ORIGIN ? <Origin color={color} /> : <Destiny color={color} />
      marker.setIcon({
        url: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(renderToString(icon))}`,
        anchor:  new window.google.maps.Point(18, 38) ,
        scaledSize: new window.google.maps.Size(35, 35),
        zIndex: 3
      })
    }
    return marker
  }

  return (
    <div>
      {loading && <Loader />}
      <Map
        id="myMap"
        loading={loading}
        handleRoutingSave={handleRoutingSave}
        /** REFS */
        mapRef={{ passengerControlRef,vehicleControlRef,solveControlRef,configurationControlRef, mainSideBarRef, topBarActionsRef }}
        distance={distanceRef.current}
        /** Routes */
        routeProps={
          { routingName:routingNameRef.current,setRoutingName,routes: routesRef.current, removeRoute, routesUpdate,  }}


        /** PASSENGERS */
        passengerProps={{ passengers: passengersRef.current, addPassengerMarkerListener, passengerUpdate, createPassenger, addPassenger, deletePassenger, newPassengerComponents, handleNewPassengerWindow, openNewPassengerWindow }}
        passengerModalOpen={passengerModalOpen}
        passengerSelected={passengerSelected}
        setPassengerModalOpen={setPassengerModalOpen}

        vehicleProps={{vehicles:vehiclesRef.current,createVehicle, addVehicle, deleteVehicle}}

        waypoints={waypointsRef.current}


        getCurrentRadius={getCurrentRadius}
        handleGeneralRadius={handleGeneralRadius}
        applyGeneralRadius={applyGeneralRadius}
        generalRadius={generalRadius}
        
        /** MISC */
        pinTypeProps={{pinType:pinTypeRef.current,setPinType}}
        handleSolveAction={handleSolveAction}
        onMapLoad={map => {
          //All ready, let's get some things going...
          map.controls[window.google.maps.ControlPosition.LEFT_CENTER].push(mainSideBarRef.current);
          map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(topBarActionsRef.current);
          map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(solveControlRef.current);

          

          map.controls[window.google.maps.ControlPosition.RIGHT_CENTER].push(passengerControlRef.current);
          map.controls[window.google.maps.ControlPosition.RIGHT_CENTER].push(vehicleControlRef.current);
          map.controls[window.google.maps.ControlPosition.RIGHT_CENTER].push(configurationControlRef.current);



          if (map) {
            window.map = map
            
  
          
            map.addListener('click', (e) => (clickerListener({ e, map })))
            
            
            map.setOptions({
              zoomControlOptions: {
                position: window.google.maps.ControlPosition.RIGHT_CENTER
              },
              fullscreenControlOptions: {
                position: window.google.maps.ControlPosition.RIGHT_BOTTOM
              },
              mapTypeControlOptions: {
                position: window.google.maps.ControlPosition.TOP_RIGHT
              },
              mapTypeId: window.google.maps.MapTypeId.ROADMAP,
              zoom: 16,
              center: { lat: 41.0082, lng: 28.9784 },
              styles: [],
              draggableCursor: 'default',
              gestureHandling: 'greedy',
              disableDefaultUI: true,
              zoomControl: true,
              fullscreenControl: true,
              mapTypeControl: true,
            })
            if (!editMode) {
              navigator.geolocation.getCurrentPosition(
                (position) => {

                  map.setCenter({ lat: position.coords.latitude, lng: position.coords.longitude })
                  handleLoading(false)

                }, () => { alert("Atenção! Sua localização não foi habilitada para o sistema. ") },
                {
                  enableHighAccuracy: true,
                  timeout: 5000,
                  maximumAge: 0
                })
            }

          }
        }}
      />
    </div>
  )
}
export default withRouter(RoutingMap)