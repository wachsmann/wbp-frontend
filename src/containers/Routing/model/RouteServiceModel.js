/* eslint-disable array-callback-return */

import WaypointServiceModel from './WaypointServiceModel'
import ParseLatLng from '../utils/ParseLatLng'
import ParseGeolocation from '../utils/ParseGeolocation'
import { getUser } from '../../../shared/helpers'

export function RouteServiceModel(routes) {
    let user = getUser()
    return Object.values(routes).map((route) =>
        {
            var visits = []
            route.visits.map(waypoint => {
                visits.push({
                    demand: waypoint.demand,
                    latitude: waypoint.lat,
                    longitude: waypoint.lng,
                    planner:{id:getUser().id},
                    description:""
                })
            })
            return ({
                visits,
                vehicle:route.vehicle,
                track: route.track,
            })
        }
    )
}


