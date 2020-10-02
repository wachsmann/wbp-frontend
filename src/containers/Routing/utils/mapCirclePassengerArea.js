import { SOFT, LIGHT } from "./constants";

export default (position,radius)=>{
    return new window.google.maps.Circle({
        strokeColor: SOFT.BLUE,
        strokeWeight: 2,
        fillColor: LIGHT.BLUE,
        map: window.map,
        center: position,
        radius: radius,
      });
}