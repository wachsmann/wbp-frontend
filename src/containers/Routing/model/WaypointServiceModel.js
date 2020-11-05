


import { getUser } from "../../../shared/helpers"
import { STOP } from "../utils/constants"
import ParseLatLng from "../utils/ParseLatLng"

export default function WaypointServiceModel(waypoints) {        
    let user = getUser()
    return Object.values(waypoints).map(waypoint =>
        ({
            id: waypoint._id,
            demand:parseInt(waypoint.passengers.length),
            latitude:ParseLatLng(waypoint.marker.getPosition()).lat,
            longitude:ParseLatLng(waypoint.marker.getPosition()).lng,
            description:"",
            plannerId:user.id,
            
        })
    )
}



