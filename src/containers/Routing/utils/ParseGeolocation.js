
export default function ParseGeolocation(latLng) {
    return !!latLng  &&  latLng.lat && latLng.lng ? {type:"Point",coordinates:[latLng.lng(),latLng.lat()]} : null 
}