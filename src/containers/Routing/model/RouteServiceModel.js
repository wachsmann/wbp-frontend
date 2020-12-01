/* eslint-disable array-callback-return */

import WaypointServiceModel from './WaypointServiceModel'
import ParseLatLng from '../utils/ParseLatLng'
import ParseGeolocation from '../utils/ParseGeolocation'
import { getUser } from '../../../shared/helpers'

export function RouteServiceModel(routes) {

    const planner = {id:getUser().id}
    return routes.map((route) =>
        {
            var visits = []
            route.visits.map(waypoint => {
                visits.push({
                    id:waypoint.id,
                    demand: waypoint.demand,
                    latitude: waypoint.lat,
                    longitude: waypoint.lng,
                    planner,
                    description:""
                })
            })
            return ({
                visits,
                vehicle:{capacity:route.vehicle.capacity,name:route.vehicle.name,planner},
                track: window.google.maps.geometry.encoding.encodePath(route.polyline.getPath())//.replace(/\\/g,"\\\\"),
            })
        }
    )
}


