import ParseLatLng from "../utils/ParseLatLng";
import ParseGeolocation from "../utils/ParseGeolocation";

export function VehicleServiceModel(vehicles) {
    return Object.values(vehicles).map(vehicle =>
        ({
            id: vehicle._id,
            name:vehicle.plate,
            capacity:vehicle.capacity
        })
    )
}


