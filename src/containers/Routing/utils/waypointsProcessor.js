import { RouteWaypoint } from "../model";
import { Waypoint } from "../model/Waypoint";
import { getRandomColor } from "./utils";


var waypoints = []

export function initMap(radius,passengers){
    
    processPassengers(radius,passengers)
    console.log(waypoints)
    waypoints.forEach((el)=>displayBound(radius,el))
    return waypoints
    //test Search processor
    //displayBound(searchForPassengers({bounds: new window.google.window.maps.LatLngBounds(),passengers:[]}))
    //passengers = passengers.filter((element)=>{element})
    //console.log("passengers",passengers)
}
function createWaypoint(position){ 
    let marker = new window.google.maps.Marker({
        map: window.map,
        position,
        zIndex: 10,
        draggable: true,
    })
    var bounds = new window.google.maps.LatLngBounds();
    bounds.extend(position)
    let wp = new Waypoint(
        {
          
          map: window.map,
          passengers:[],
          bounds,
          marker,
          //routeListenerUpdate,
          //color: routeSelected.getColor(),
          //type: STOP,
          //label: Object.keys(routeSelected.waypoints).length.toString() /** visibility */
        }
      )
    
    return wp
}
function processPassengers(radius,passengers){
    debugger
    var currentWaypoint = null
    do{
    // 1. Inicia com um ponto, referente ao primeiro passageiro 
    var passenger = passengers.pop()
    if(passenger && !!passenger.getPosition() && currentWaypoint == null){
        //2. Cria um ponto de parada
        currentWaypoint = createWaypoint(passenger.getPosition())
        
        currentWaypoint.passengers.push(passenger)
        searchForPassengers(radius,currentWaypoint,passengers)
        waypoints.push(currentWaypoint)
        currentWaypoint = null
        //clear empties
        //passengers = passengers.filter((element)=>{typeof element !== undefined})
        passengers = passengers.filter(()=>true)
    }
    
  
      

        
    }while(passengers.length > 0)
    
/**
    1. Inicia com um ponto, referente ao primeiro passageiro 
    2. Cria um ponto de parada
        1. Procura um ponto perto dentro do raio estabelecido
        2. Caso achar, agrupa dentro deste ponto de parada 
            1. Remove o ponto da listagem de busca
    3. Move o centroid do ponto para o centro entre ambos
        1. Continua a procura com base no novo centroid até finalizar a lista
    4. Ao finalizar busca, pega próximo ponto livre e volta para o fluxo 2

 */
}
function searchForPassengers(radius,waypoint,passengers){
    var newPassengers = passengers
    for (let i = 0; i < passengers.length; i++) {
        const element = passengers[i];
        console.log("BOUND" ,waypoint.bounds.getCenter().lat())
        if(waypoint.passengers.length == 0)
            waypoint.bounds.extend(passengers[i].getPosition())
        //console.log("compute distance",window.google.maps.geometry.spherical.computeDistanceBetween(element.position,waypoint.bounds.getCenter()))
        if(radius >= window.google.maps.geometry.spherical.computeDistanceBetween(element.getPosition(),waypoint.bounds.getCenter())){
            
            console.log("newPassengers",newPassengers)
            waypoint.bounds.extend(passengers[i].getPosition())
            waypoint.passengers.push(passengers[i])
            delete passengers[i]
        }
        
    }
    
    return waypoint
}
function createCircle(radius,position){
    var color = getRandomColor()
    return new window.google.maps.Circle({strokeColor:color,strokeOpacity: 0.8,strokeWeight: 2,fillColor:color,fillOpacity: 0.85,map:window.map,center: position,radius});
}
function createMarker(mark){return new window.google.maps.Marker({position:mark.position,/*icon: "https://maps.google.com/mapfiles/marker" + mark.letter + ".png",*/map:window.map});}

function displayBound(radius,waypoint){
    var bounds = waypoint.bounds
	console.log(bounds.getCenter().lat(),bounds.getCenter().lng())
    /** CREATE WAYPOINT  */
    createMarker({position:new window.google.maps.LatLng(bounds.getCenter().lat(),bounds.getCenter().lng()),letter:"P"})
    createCircle(radius,new window.google.maps.LatLng(bounds.getCenter().lat(),bounds.getCenter().lng()))
}