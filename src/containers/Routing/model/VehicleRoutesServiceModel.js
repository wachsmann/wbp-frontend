/* eslint-disable array-callback-return */

export function VehicleRoutesServiceModel(routes) {
    return Object.values(routes).map((route) =>
        {
            return ({
                routeId: route.getId(),
                vehicleId:route.vehicle.id,
            })
        }
    )
}


