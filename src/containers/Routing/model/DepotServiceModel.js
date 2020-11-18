


import { getUser } from "../../../shared/helpers"
import { STOP } from "../utils/constants"
import ParseLatLng from "../utils/ParseLatLng"

export default function DepotServiceModel(depot) {        
    return !!depot ? {
        id:!!depot.data && !!depot.data.id ? depot.data.id : null,
        latitude:ParseLatLng(depot.getPosition()).lat,
        longitude:ParseLatLng(depot.getPosition()).lng,
        description:"",
        demand:0,
        plannerId:getUser().id
              
    }:null
}



