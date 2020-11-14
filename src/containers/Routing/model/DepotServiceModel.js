


import { getUser } from "../../../shared/helpers"
import { STOP } from "../utils/constants"
import ParseLatLng from "../utils/ParseLatLng"

export default function DepotServiceModel(depot) {        
    return !!depot ? {
        
        latitude:ParseLatLng(depot.getPosition()).lat,
        longitude:ParseLatLng(depot.getPosition()).lng,
        description:"",
        demand:0,
        plannerId:getUser().id
              
    }:null
}



