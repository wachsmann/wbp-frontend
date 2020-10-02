

import {PASSTHROUGH} from "../utils/constants"
import { LIGHT } from '../utils/constants'

export class RoutePolyline {
    constructor(map,path,route,routeListenerUpdate,offColor) {
       // Private variables and functions
        if(typeof map != "object")
            throw "typeof map is not a object"
        if(typeof path != "object")
            throw "typeof path is not a object"
        if(typeof route != "object")
            throw "RoutePolyline: typeof route is not a object"
        //Initialize the Path Array
        var pathMVC = new window.google.maps.MVCArray();
        var polyline = new window.google.maps.Polyline({
            map,
            //pathMVC,
            strokeColor:offColor?LIGHT.GRAY:route.getColor(),
            strokeOpacity: 0.9,
            strokeWeight: 6,
            data:{},
            //editable: true

        });
        polyline.setPath(pathMVC)
        for (var i = 0; i < path.length; i++) {
            pathMVC.push(path[i])
        }

        
        window.google.maps.event.addListener(polyline, 'mouseover', function (event) {
            let circle = new window.google.maps.Marker({
                map: window.map,
                center: event.latLng,
                zIndex: 10,
                icon: {
                    path: window.google.maps.SymbolPath.CIRCLE,
                    scale: 5
                },
                data: {
                    type: parseInt(PASSTHROUGH),
                    nearPoints: []
                },
                draggable: true,
            });
            let routeName = route.getName();
            var ballon_size = {
                "corner": routeName.length * 3.888888,
                "curve": (routeName.length * 3.888888) + 10
            };
    
            let route_name = new window.google.maps.Marker({
                map: window.map,
                center: event.latLng,
                label: routeName,
                icon: {
                    path: `M 10 0 C 0 0 0 10 10 10 L ${ballon_size["corner"]} 10 C ${ballon_size["curve"]} 10 ${ballon_size["curve"]} 0 ${ballon_size["corner"]} 0 Z`,
                    anchor: { x: (ballon_size["curve"] / 2), y: 25 },
                    labelOrigin: { x: (ballon_size["curve"] / 2), y: 5 },
                    scale: 2,
                    fillColor: 'white',
                    fillOpacity: 1.0,
                    strokeColor: 'black',
                    strokeWeight: 1
                },
                zIndex: 2,
                data: {
                    type: parseInt(PASSTHROUGH),
                    nearPoints: []
                },
                draggable: true,
            });
            
           
            circle.addListener("dragstart", function (event) {
                route_name.setMap(null);
            });
    
            //addClickListener(circle);
    
            polyline.data = { circle, route_name };
    
            polyline.setOptions({
                zIndex: 10,
                strokeOpacity: 1,
                strokeWeight: 8,
            });
        });
        window.google.maps.event.addListener(polyline, 'mousemove', function (event) {
            //console.log(event,polyline,this)
            polyline.data.circle.setPosition(event.latLng);
            polyline.data.route_name.setPosition(event.latLng);
        });
    
        window.google.maps.event.addListener(polyline, 'mouseout', function (event) {
            //console.log(event,polyline,this)
            polyline.data.circle.setMap(null);
            polyline.data.route_name.setMap(null);
            polyline.setOptions({
                strokeOpacity: 0.9,
                strokeWeight: 6,
                zIndex:1
            });
        });
    
        //addClickListener(polyline);
        
        // All the properties and methods contained by 
        // ..this object being returned will be public
        // ..and will be accessible in the global scope.
        return {
            terminate:function(){polyline.setMap(null);},
            changeVisibility: function(visibility){polyline.setVisible(visibility);},
            getPolyline:function(){return polyline},
            
            setOffColor:function(isOff){offColor = isOff;},
            getOffColor:function(){return offColor;},
            setZIndex:(zIndex)=>polyline.setOptions({zIndex}),
            getPathInLineString:()=>{
                let lineString = []
                let pline = polyline.getPath().getArray()
                for (let i = 0; i < pline.length; i++) {
                    lineString.push([pline[i].lng(),pline[i].lat()])
                    
                }

                return lineString
            },
           
            changePolylineColor :function(color) {
                polyline.setOptions({strokeColor:color});
            }
        }
    }

  }


