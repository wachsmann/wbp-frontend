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

import { THEME } from '../../../redux/reducers/themeReducer'
import { withRouter } from 'react-router';

import newMarker from '../utils/newMarker';

import store from '../../App/store';
import { initMap } from '../utils/waypointsProcessor';
import { socketFactory } from '../utils/socketFactory';
import WaypointServiceModel from '../model/WaypointServiceModel'
import DepotServiceModel from '../model/DepotServiceModel';
import { VehicleServiceModel } from '../model/VehicleServiceModel copy';

var autoComplete
const RoutingMap = (props) => {
  const { editMode, history } = props
  const id = editMode ? props.match.params.id : null

  const dispatch = useDispatch()
  const theme = useSelector(state => state.theme.className)

  const serviceRouting = new RoutingService(routingAction)
 
  const passengerControlRef = React.createRef();
  const vehicleControlRef = React.createRef();
  const solveControlRef = React.createRef();
  const configurationControlRef = React.createRef();
  const mainSideBarRef = React.createRef();
  const topBarActionsRef = React.createRef();

  const handleSolveAction = () => { 
    console.log("mount problem...")
    console.log("passengers",passengersRef.current)
    console.log("waypoints",waypointsRef.current)
    console.log("vehicles",vehiclesRef.current)
    console.log("destiny",destinyMarkerRef.current)
    console.log("origin",originMarkerRef.current)
    const visits = WaypointServiceModel(waypointsRef.current) 
    const vehicles = VehicleServiceModel(vehiclesRef.current) 
    const distance = 0
    const origin = DepotServiceModel(originMarkerRef.current)
    const destiny = DepotServiceModel(destinyMarkerRef.current)
    function sucessCallback(res){
      console.log('open');
      sock.send('/app/clear');
     
      
      sock.send('/app/planning', JSON.stringify({distance,origin,destiny,vehicles,visits}));
        
          sock.subscribe('/topic/route', (message) => {
            Object.keys(routesRef.current).map((route)=>{
              removeRoute(route)
            })
            const plan = JSON.parse(message.body);
            console.log(plan)
            setDistance(plan.distance)
            if(plan.routes){
              plan.routes.forEach((route)=>{
                let newRoute = new Route(route)
                //console.log(newRoute)
                setRoutes({ ...routesRef.current, ...{ [newRoute.getId()]: newRoute } })
              })
            }
            
          });
      
    }
    function errorCallback(res){}
    var sock = socketFactory(sucessCallback,errorCallback)
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
  }

  const [query, setQuery] = useState("")
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
            //Waypoints
            /*
            route.waypoints.map((wpt, index) =>
            
            newRoute.insertWaypoint(new RouteWaypoint({
                routeIdentity: route.id,
                
                _name: wpt.name,
                marker: newMarker({ position: !!wpt.position.coordinates ? 
                  { lat: wpt.position.coordinates[1], lng: wpt.position.coordinates[0] } : {lat:0,lng:0} }),
                routeListenerUpdate,
                color: route.color,
                type: STOP,
                label: index.toString(),
                visible: false
              }))
            )
            */
            //Leg
            var path = []
            if (!!route.course) {
              path = route.course.coordinates.map(
                (item) => {
                  return new window.google.maps.LatLng(item[1], item[0])
                }
              )
              let legs = route.leg.map(
                (item) => {
                  var steps = item.steps.map((step) => {
                    return {
                      distance: step.distance,
                      duration: step.duration,
                      end_location: new window.google.maps.LatLng(step.end_location.lat, step.end_location.lng),
                      end_point: new window.google.maps.LatLng(step.end_point.lat, step.end_point.lng),
                      instructions: step.instructions,
                      maneuver: step.maneuver,
                      start_location: new window.google.maps.LatLng(step.start_location.lat, step.start_location.lng),
                      start_point: new window.google.maps.LatLng(step.start_point.lat, step.start_point.lng),
                    }

                  })
                  return {
                    distance: item.distance,
                    duration: item.duration,
                    end_address: item.end_address,
                    end_location: new window.google.maps.LatLng(item.end_location.lat, item.end_location.lng),
                    start_address: item.start_address,
                    start_location: new window.google.maps.LatLng(item.start_location.lat, item.start_location.lng),
                    steps
                  }
                }
              )


              drawGDirLine({ leg: legs, summary: route.summary, path }, newRoute)
            } else {
              //calculateAndDisplayRoute()
            }
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
    let routing = {
      name,
      routes: new RouteServiceModel(routesRef.current),
      clusterPoints: new PassengerServiceModel(passengersRef.current),
      radiusRange: getCurrentRadius(),
      
      id_responsable: null,
      
      trafficModel: "pessimistic",
      destiny_time: "10:00",
      companies: [],
      
    }
    if (editMode) {
      //return dispatch(service.update('group', undefined, Object.assign({ id }, formData),history))
      routing.id = id
      return dispatch(serviceRouting.update(routing, history))
    } else {

      return dispatch(
        serviceRouting.store(routing, history)
      )

    }


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


  /** ROUTE SELECTED */
  const [routeSelected, _setRouteSelected] = useState(null)
  const routeSelectedRef = React.useRef(routeSelected)
  const setRouteSelected = data => {
    routeSelectedRef.current = data
    _setRouteSelected(data)
  }
  useEffect(() => {
    if (!!routeSelectedRef.current) {
      /**
       * show all
       */
      Object.keys(routesRef.current).map(key => {
        if (routeSelectedRef.current.getId() !== routesRef.current[key].getId())
          routesRef.current[key].setActions(false)
      })
    } else {

      Object.keys(routesRef.current).map(key => routesRef.current[key].setActions(true))
    }
  }, [routeSelected])
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
  const getCurrentRadius = () => {

    if (routeSelectedRef.current && routeSelectedRef.current.getRadius() > 0) {
      return routeSelectedRef.current.getRadius()
    } else {
      return generalRadiusRef.current
    }
  }

  
  var directionsService = null
  const searchClass = classNames({
    'topbar__search-field': true,
    'topbar__search-field--open': true
  });

  

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

  const passengersProximityToWaypoint = (waypoint) => {

    var passengers = passengersRef.current
    Object.keys(passengers).map((key) => {

      var passenger = passengers[key]
      if (!passenger.waypointId || passenger.waypointId === waypoint.getId()) {
        let passengerPosition = passenger.marker.getPosition()
        let waypointPosition = waypoint.getMarker().getPosition()

        if (getCurrentRadius() >= window.google.maps.geometry.spherical.computeDistanceBetween(passengerPosition, waypointPosition)) {

          var listeners = {
            dragendWaypoint: waypoint.getMarker().addListener("dragend",
              (event) => {
                if (!passenger.checkSuperiorProximity(event.latLng)) {
                  waypoint.removeNearPoint(passenger)
                  passenger.setNearWaypoint()
                }
              }),

            dragendPassenger: passenger.marker.addListener("dragend",
              (event) => {

                if (!passenger.checkSuperiorProximity(event.latLng)) {

                  waypoint.removeNearPoint(passenger)
                  passenger.setNearWaypoint()
                }
              }
            )
          }
          passenger.setWaypointListener(listeners)
          waypoint.addNearPoint(passenger)
          passenger.setNearWaypoint(waypoint.getRouteId(), waypoint.getId())
          window.google.maps.event.addListener(waypoint.getMarker(), "removeWaypoint", (event) => passenger.setNearWaypoint())
          /**
           * Attach passenger and set listener for remove route
           */


        }
      }

    })
  }


  /*
  
  *    
  *   Callback for calculateAndDisplayRoutes, draws routes and activate listeners for dragging on it;
  *   
  *    @param {obj} route - current route with new path ready to be drawn
  *    @param {integer} index - position of route in list
  *    
  
  */

  const drawGDirLine = (response, route) => {
    return new Promise((resolve, reject) => {
      let isOff = !!routeSelectedRef.current && route.getId() !== routeSelectedRef.current.getId()
      var routePolyline = new RoutePolyline(window.map, response.path, route, /*routeListenerUpdate,*/ isOff);

      route.setSummary(response.summary);
      route.setLeg(response.leg);

      if (!!route.getRoutePolyline()) {
        //let isOff = route.getRoutePolyline().getOffColor();
        //routePolyline.setOffColor(isOff);
        //if (isOff) routePolyline.changePolylineColor(LIGHT.GRAY);

        route.terminatePolyline();
      }
      route.setRoutePolyline(routePolyline)
      setRoutes({ ...routesRef.current, ...{ [route.getId()]: route } })
      resolve()
    })


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
    
    //create Route
    //let newRoute = new Route({ fixedMarker,marker, color, routeListenerUpdate })
    //setRoutes({ ...routesRef.current, ...{ [newRoute.getId()]: newRoute } })

    //marker.addListener("dragend", (e) => makeRequest(newRoute))
    /*
    if (!!fixedMarker)
      makeRequest(newRoute)
    */
  }
  const addMark = ({ marker, color = getRandomColor(), pin_type = pinTypeRef.current, load = null }) => {
    var routeSelected = routeSelectedRef.current

    return new Promise((resolve, reject) => {
      if (!!!marker) return null;
      switch (parseInt(pin_type)) {
        case ORIGIN:
          //Check if theres no route selected
          if (!!routeSelected) {
            marker.setMap(null)
            alert("Rota selecionada!")
            resolve()
          } else {
            resolve(
                setLeaveMarker({ marker, color, type: ORIGIN }) 
            )
          }
          break
        case DESTINY:
          resolve(
          
              createFixedMarkByType({ type: DESTINY, marker })
          
          )
          break;

        case STOP:


          if (routeSelected == null) {
            marker.setMap(null)
            resolve()
            alert("Sem Rota selecionada")
          } else {
            /*
            routeSelected.insertWaypoint(
              new RouteWaypoint(
                {
                  
                  map: window.map,
                  routeIdentity: routeSelected.getId(),
                  marker,
                  routeListenerUpdate,
                  color: routeSelected.getColor(),
                  type: STOP,
                  label: Object.keys(routeSelected.waypoints).length.toString() 
                }
              )
            )
            */
            //Remove and treat in makeRequest
            //resolve(makeRequest(routeSelected))

          }
          break;

        case ADDRESS:
          /**
           * Dealing with infos and opening modal
           */
          var position = marker.getPosition()
          marker.setOptions({ draggable: true });
          var geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ 'location': position }, (results, status) => {
            if (status === 'OK') {
              if (results[0]) {
                var addressComponents = getMapsPlacesComponents(results[0].address_components)
                var { street, neighborhood, city, cep } = addressComponents
                addressComponents.position = position
                addressComponents.marker = marker
                var passenger = createPassenger({ marker, radius: getCurrentRadius(), routes, position, identifier: "", name: "", street, neighborhood, city, cep })
                setNewPassengerComponents(passenger)
                setOpenNewPassengerWindow(true)
              } else {
                alert('Nenhum resultado obtido!');
              }
            } else {
              alert('Geocode falhou: ' + status);
            }
          }, (err) => { alert('Não foi possível encontrar a localização escolhida.') });
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
/*
    var centerPoint = mapCirclePassengerArea(position, radius)
    centerPoint.addListener("click", (e) => {
      const marker = newMarker({ position: { lat: e.latLng.lat(), lng: e.latLng.lng() } })

      addMark({ marker })

    })
*/
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
          { routes: routesRef.current, removeRoute, routesUpdate, routeSelected: routeSelectedRef.current, setRouteSelected }}


        /** PASSENGERS */
        passengerProps={{ passengers: passengersRef.current, addPassengerMarkerListener, passengerUpdate, createPassenger, addPassenger, deletePassenger, newPassengerComponents, handleNewPassengerWindow, openNewPassengerWindow }}
        passengerModalOpen={passengerModalOpen}
        passengerSelected={passengerSelected}
        setPassengerModalOpen={setPassengerModalOpen}

        vehicleProps={{vehicles:vehiclesRef.current,createVehicle, addVehicle, deleteVehicle}}

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
            
            directionsService = new window.google.maps.DirectionsService()
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
              styles: theme === THEME.DARK ? darkMode() : [],
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