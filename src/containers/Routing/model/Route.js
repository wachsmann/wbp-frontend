import { getRandomColor, mongoObjectId } from "../utils/utils"
import { SOFT, LIGHT } from "../utils/constants"
import objectKeyRemover from "../utils/objectKeyRemover"
import ParseLatLng from "../utils/ParseLatLng"

export function Route({ name = null,vehicle,track,visits=[], color = getRandomColor(), id = null}) {
    console.log(vehicle,visits)
    var _id = id === null ? mongoObjectId() : id
    name = !!name ? name : "Rota " + _id.substr(_id.length - 4, _id.length - 1)
    /** maps track object */
    this.track = track

    /** array of objects */
    var legs = []
    
    /** array of Waypoints */
    this.visits = visits
    
    this.vehicle = vehicle

    
    var pathMVC = new window.google.maps.MVCArray()
    var polyline = new window.google.maps.Polyline({
        map:window.map,
        strokeColor:color,
        strokeOpacity: 0.9,
        strokeWeight: 6,
        data:{},
        //editable: true

    });
    polyline.setPath(pathMVC)
    for (var i = 0; i < this.track.length; i++) {
        for (var j = 0; j < this.track[i].length; j++) {
            //console.log({lat:this.track[i][j][0],lng:this.track[i][j][1]})
            
            pathMVC.push(new window.google.maps.LatLng(this.track[i][j][0], this.track[i][j][1]))
        }
    }
    this.getId = () => { return _id }

    this.terminate = () => {

       
        //Object.keys(this.visits).forEach(key => this.visits[key].terminate())
        if (polyline != null) polyline.setMap(null)
    }
  
    this.setRoutePolyline = (trackRoute) => { track = trackRoute }
    this.getRoutePolyline = () => { return track }
    this.terminatePolyline = () => { if (track != null) track.terminate() }

    this.getColor = () => { return color }
   
  

    this.setWaypoints = (points) => {
        return new Promise((resolve, reject) => {

            this.visits = points
            //routeListenerUpdate(_id)
            resolve()
        })
    }

    this.getWaypoint = (id) => this.visits[id]

    this.insertWaypoint = (waypoint) => { this.visits = { ...this.visits, [waypoint.getId()]: waypoint } }
    this.setActions = (enabled) => {
        track.changePolylineColor(enabled ? color : LIGHT.GRAY);
        track.setOffColor(enabled);
    }
    this.accentuate = (accentuate) => {
        this.setWaypointsVisibility(accentuate)
        if (track) { track.setZIndex(accentuate ? 10 : 1) }

    }
    this.setWaypointsVisibility = (visible) => {
        Object.keys(this.visits).map((key) => this.visits[key].setVisible(visible))
    }


    this.getName = () => { return name }
    this.setName = (newName) => { name = newName }
    this.removeWaypoint = async (id) => {
        window.google.maps.event.trigger(this.visits[id].getMarker(), 'removeWaypoint');
        this.visits[id].terminate()
        //get Waypoint position for leg splice

        this.visits = objectKeyRemover(this.visits, id)
        //legs.splice(index, 1);
        Object.keys(this.visits).forEach((key, i) => {
            this.visits[key].setLabel(i)
        })
        //routeListenerUpdate(_id)
    }
    this.setWaypointsInReverse = () => {
        /*
        visits.reverse()
        visits.forEach((item, index) => {
            item.setLabel(index)
        })
        */
    }
   

}



