
export default function ParseLatLng(latLng) {
    return !!latLng  &&  latLng.lat && latLng.lng ? {lat:latLng.lat(),lng:latLng.lng()} : null 
}