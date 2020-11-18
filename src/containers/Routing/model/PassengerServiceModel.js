import ParseLatLng from "../utils/ParseLatLng";
import ParseGeolocation from "../utils/ParseGeolocation";
import { getUser } from "../../../shared/helpers";

export function PassengerServiceModel(passengers) {
    return Object.values(passengers).map(passenger =>
        ({
            id: passenger.id,
            cep: passenger.cep,
            city: passenger.city,
            name: passenger.name,
            neighborhood: passenger.neighborhood,
            latitude:passenger.marker.getPosition().lat(),
            longitude:passenger.marker.getPosition().lng(),
           
            street: passenger.street,
            waypoint: {id:passenger.waypointId},
            planner:{id:getUser().id}

            
        })
    )
}


