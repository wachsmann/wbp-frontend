/* eslint-disable array-callback-return */

import WaypointServiceModel from './WaypointServiceModel'
import ParseLatLng from '../utils/ParseLatLng'
import ParseGeolocation from '../utils/ParseGeolocation'

export function RouteServiceModel({visits,distance,vehicles,routes}) {
    
    return{

            name: route.getName(),
            distance,
            visits,
            vehicles,
            routes
        }
    
}


