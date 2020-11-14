


import { getUser } from "../../../shared/helpers"
import { STOP } from "../utils/constants"
import ParseLatLng from "../utils/ParseLatLng"

export default function PointServiceModel(depot) {        
    return !!depot ? {
        latitude:ParseLatLng(depot.getPosition()).lat,
        longitude:ParseLatLng(depot.getPosition()).lng,
        description:"",
        demand:0,
        planner:{id:getUser().id}
              
    }:null
}



