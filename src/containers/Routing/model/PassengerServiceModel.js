import ParseLatLng from "../utils/ParseLatLng";
import ParseGeolocation from "../utils/ParseGeolocation";

export function PassengerServiceModel(passengers) {
    return Object.values(passengers).map(passenger =>
        ({
            id: passenger.getId(),
            cep: passenger.cep,
            city: passenger.city,
            name: passenger.name,
            neighborhood: passenger.neighborhood,
            position: ParseGeolocation(passenger.marker.getPosition()),
            status: passenger.status,
            street: passenger.street,
            waypointId: passenger.waypointId,
            attachedPolyline: null
        })
    )
}


