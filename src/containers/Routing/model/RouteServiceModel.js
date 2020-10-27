/* eslint-disable array-callback-return */

import WaypointServiceModel from './WaypointServiceModel'
import ParseLatLng from '../utils/ParseLatLng'
import ParseGeolocation from '../utils/ParseGeolocation'

export function RouteServiceModel(routes) {
    return Object.values(routes).map((route) =>
        ({

            name: route.getName(),
            visits: [],
        })
    ) 
}

