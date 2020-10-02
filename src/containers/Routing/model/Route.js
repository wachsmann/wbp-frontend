import { mongoObjectId } from "../utils/utils"
import { SOFT, LIGHT } from "../utils/constants"
import objectKeyRemover from "../utils/objectKeyRemover"
import ParseLatLng from "../utils/ParseLatLng"

export function Route({ name = null, marker, routeListenerUpdate, fixedMarker = null, color, id = null, _capacity = null, radius = 0 }) {

    var _id = id === null ? mongoObjectId() : id
    name = !!name ? name : "Rota " + _id.substr(_id.length - 4, _id.length - 1)
    /** maps polyline object */
    var polyline = null
    /** maps marker object */
    var origin = null
    /** maps marker object */
    var destiny = null

    /** array of objects */
    var legs = []
    /** integer  */
    var nearPoints = 0
    /** array of objects */
    var summary = []
    /** array of RouteWaypoints */
    this.waypoints = {}
    /** integer */
    var capacity = _capacity === null ? 0 : parseInt(_capacity)

    /** float */
    var distance = 0.0

    /** date */
    var estimatedTime


    origin = marker
    destiny = fixedMarker


    marker.addListener("dragend", (e) => {
        routeListenerUpdate(_id)
    })
    function setDistance(newDistance) { distance = newDistance }
    function setEstimatedTime(time) { estimatedTime = time }

    this.isCapacitated = () => {
        return nearPoints < capacity
    }
  
    this.getId = () => { return _id }

    this.terminate = () => {

        origin.setMap(null)

        Object.keys(this.waypoints).forEach(key => this.waypoints[key].terminate())
        if (polyline != null) polyline.terminate()
    }
    this.clearNearWaypoints = () => {
        //Make waypoints


    }
    this.setDestiny = (destinyMarker) => { destiny = destinyMarker }
    this.getDestiny = () => { return destiny }

    this.setRoutePolyline = (polylineRoute) => { polyline = polylineRoute }
    this.getRoutePolyline = () => { return polyline }
    this.terminatePolyline = () => { if (polyline != null) polyline.terminate() }

    this.getColor = () => { return color }
    this.getPassengerRadius = () => (radius)


    this.setOrigin = (originMarker) => { origin = originMarker }
    this.getOrigin = () => { return origin }

    this.setLeg = (legResponse) => {
        console.log(legResponse)
        legs = []
        var distance = 0.0,
            time = 0;
        legResponse.forEach(leg => {
            let newSteps = []
            leg.steps.forEach(step => {
                newSteps.push(
                    {
                        distance: step.distance,
                        duration: step.duration,
                        end_location: ParseLatLng(step.end_location),
                        start_location: ParseLatLng(step.start_location),
                        start_point: ParseLatLng(step.start_point),
                        end_point: ParseLatLng(step.end_point),
                        instructions: step.instructions,
                        maneuver: step.maneuver,

                    }
                )
            })

            let newLeg = {
                distance: leg.distance,
                duration: leg.duration,
                end_address: leg.end_address,
                end_location: ParseLatLng(leg.end_location),
                start_location: ParseLatLng(leg.start_location),
                start_address: leg.start_address,
                steps: newSteps,
            }
            legs.push(newLeg)


            distance = distance + leg.distance.value;
            time += leg.duration.value;

            //distance = (distance * 0.001).toFixed(2)


        })

        distance = (distance * 0.001).toFixed(2)
        setDistance(distance)
        var date = new Date(null);
        if (time)
            date.setSeconds(time); // specify value for SECONDS here
        setEstimatedTime(date.toISOString().substr(11, 8))
    }
    this.getDistance = () => (distance)
    this.setDistance = setDistance
    this.getEstimatedTime = () => (estimatedTime)
    this.setEstimatedTime = setEstimatedTime
    this.getLeg = () => { return legs }

    this.setNearPoints = (qtt) => { nearPoints = qtt }
    this.getNearPoints = () => { return nearPoints }
    this.increasePointNumber = (amount) => {
        if (nearPoints >= 0) {
            nearPoints = nearPoints + amount
        }
    }
    this.decreasePointNumber = (amount) => {
        if (nearPoints > 0) {
            nearPoints = nearPoints - amount
        }
    }

    this.setSummary = (summaryResponse) => { summary = summaryResponse }
    this.getSummary = () => { return summary }

    this.setCapacity = (newCapacity) => { capacity = parseInt(newCapacity) }
    this.getCapacity = () => { return capacity }

    this.setWaypoints = (points) => {
        return new Promise((resolve, reject) => {

            this.waypoints = points
            routeListenerUpdate(_id)
            resolve()
        })
    }

    this.getWaypoint = (id) => this.waypoints[id]

    this.insertWaypoint = (waypoint) => { this.waypoints = { ...this.waypoints, [waypoint.getId()]: waypoint } }
    this.setActions = (enabled) => {
        polyline.changePolylineColor(enabled ? color : LIGHT.GRAY);
        polyline.setOffColor(enabled);
    }
    this.accentuate = (accentuate) => {
        this.setWaypointsVisibility(accentuate)
        if (polyline) { polyline.setZIndex(accentuate ? 10 : 1) }

    }
    this.setWaypointsVisibility = (visible) => {
        Object.keys(this.waypoints).map((key) => this.waypoints[key].setVisible(visible))
    }


    this.getName = () => { return name }
    this.setName = (newName) => { name = newName }
    this.removeWaypoint = async (id) => {
        window.google.maps.event.trigger(this.waypoints[id].getMarker(), 'removeWaypoint');
        this.waypoints[id].terminate()
        //get Waypoint position for leg splice

        this.waypoints = objectKeyRemover(this.waypoints, id)
        //legs.splice(index, 1);
        Object.keys(this.waypoints).forEach((key, i) => {
            this.waypoints[key].setLabel(i)
        })
        routeListenerUpdate(_id)
    }
    this.setWaypointsInReverse = () => {
        /*
        waypoints.reverse()
        waypoints.forEach((item, index) => {
            item.setLabel(index)
        })
        */
    }
    this.getRadius = () => radius
    this.setRadius = (newRadius) => radius = newRadius



}



