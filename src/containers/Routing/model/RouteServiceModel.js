/* eslint-disable array-callback-return */

import WaypointServiceModel from './WaypointServiceModel'
import ParseLatLng from '../utils/ParseLatLng'
import ParseGeolocation from '../utils/ParseGeolocation'

export function RouteServiceModel(routes) {
    return Object.values(routes).map((route) =>
        ({
            name: route.getName(),
            color: route.getColor(),
            course: {type:"LineString",coordinates:route.getRoutePolyline().getPathInLineString()},
            id: route.getId(),
            origin: ParseGeolocation(route.getOrigin().getPosition()),
            destiny: ParseLatLng(route.getDestiny().getPosition()),
            capacity: route.getCapacity(),
            //radius: route.getClusterRange(),
            //destiny_time: route.getDestinyTime(),
            leg: route.getLeg(),
            summary: route.getSummary(),
            waypoints: new WaypointServiceModel(route.waypoints),
        })
    ) 
}


