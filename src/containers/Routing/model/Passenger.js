
import React from 'react'


import { renderToString } from 'react-dom/server'
import Waypoints from "../components/Icons/Waypoints"
import { LIGHT, SOFT } from '../utils/constants';
import { mongoObjectId } from '../utils/utils';


export function Passenger({ id, marker, getRoutes, radius, identifier, name, street, neighborhood, city, cep, draggable = true, visible = true }) {



    var _id = id ? id : mongoObjectId()
    var passenger_ballon_name = null;
    this.marker = marker
    this.centerPoint = null
    var attachedPolyline
    this.identifier = identifier ? identifier : _id
    this.name = name ? name : `P${_id}`
    

    this.status = marker.getPosition() ? true : false
    this.street = street
    this.neighborhood = neighborhood
    this.city = city
    this.cep = cep
    this.waypointId = null
    this.routeId = null
    this.getId = () => _id
    this.radius = radius
    this.waypointListener = {
        waypointListener:null,
        dragend:null
    }
    this.setRoute = (routeId) => {
        this.routeId = routeId
    }
    this.setPosition = (position) => {
        if (position) {
            this.status = true

            this.marker.setPosition(position)
        }
    }
    this.terminate = () => {
        console.log(this)
        clearInstancesMarker()
        removeAttachedObjects()
    }
    this.getPosition = () => !!this.marker ? this.marker.getPosition() : null
    this.setPlaceInfo = (payload) => {
        const { address, street, neighborhood, city, cep } = payload
        this.address = address
        this.street = street
        this.neighborhood = neighborhood
        this.city = city
        this.cep = cep
    }
    this.setNearWaypoint = (routeId,waypointId)=>{
        this.waypointId = waypointId
        this.routeId = routeId
        if(waypointId){
            //toggleCircleActivation(true)
        }else{
            //toggleCircleActivation(false)
        }   
    }
    this.setWaypointListener = (listeners)=>{
        if(this.waypointListener){
            window.google.maps.event.removeListener(this.waypointListener.removeWaypoint);
            window.google.maps.event.removeListener(this.waypointListener.dragendPassenger);
            window.google.maps.event.removeListener(this.waypointListener.dragendWaypoint);
        }
        this.waypointListener.removeWaypoint = listeners.removeWaypoint
        this.waypointListener.dragendWaypoint = listeners.dragendWaypoint
        this.waypointListener.dragendPassenger = listeners.dragendPassenger
    }
    this.checkSuperiorProximity = (positionToCompare) =>{
        console.log("positionToCompare",positionToCompare,marker.getPosition())
        let distance = window.google.maps.geometry.spherical.computeDistanceBetween(marker.getPosition(),positionToCompare)
        console.log("compute distance",distance,"r",radius)
        return (radius >= distance)
    }
    //const toggleCircleActivation = (activate) =>( activate ? this.centerPoint.setOptions({strokeColor: SOFT.GREEN,fillColor: LIGHT.GREEN}) : this.centerPoint.setOptions({strokeColor: SOFT.BLUE,fillColor: LIGHT.BLUE}))
    const clearInstancesMarker = () => {
        //Clearing markers 
        this.marker.setMap(null);
        //this.centerPoint.setMap(null);
        //Clearing listeners
        window.google.maps.event.clearInstanceListeners(this.marker)
        //window.google.maps.event.clearInstanceListeners(this.centerPoint);
    }
    function removeAttachedObjects() {
        if (attachedPolyline && attachedPolyline != null) attachedPolyline.setMap(null)
    }

    /**
     * 
     *  NEED REFACTORING BELOW !!!!!!!!!! 
     */



    //this.centerPoint = centerPoint
    if (this.waypointId && this.waypointId != null && typeof this.waypointId != "undefined")
        /*
        this.centerPoint.setOptions({
            strokeColor: SOFT.GREEN,
            fillColor: LIGHT.GREEN
        })
        */

    this.setRadius = (newRadius) => {
        //this.centerPoint.setRadius(parseInt(newRadius))
        radius = newRadius
    }

    this.marker.setIcon(
        {
            url:
                `data:image/svg+xml;charset=utf-8,
                    ${encodeURIComponent(
                    renderToString(<Waypoints color={"#0196FA"} symbol={"P"} />)
                )
                }`,
            anchor: new window.google.maps.Point(15, 30),
            scaledSize: new window.google.maps.Size(30, 30),
            zIndex: 2
        }
    )
    window.google.maps.event.addListener(this.marker, 'rightclick', function (event) {
        /*
        if (ATTACH_ADDRESS == parseInt($('input[name=pin_type]:checked').val())
            && (pointAddress.waypointId != null || typeof pointAddress.waypointId != "undefined")) {
            if (pointAddress.attachedPolyline != null && typeof pointAddress.attachedPolyline != "undefined") {
                pointAddress.attachedPolyline.setMap(null)
                pointAddress.attachedPolyline = null
            }


            Object.keys(window.routing.routes).forEach(function (key) {
                var wpts = window.routing.routes[key].waypoints
                for (let j = 0; j < wpts.length; j++) {
                    var nPoints = wpts[j].getNearPoints()
                    for (let k = 0; k < nPoints.length; k++) {


                        if (nPoints[k].id == pointAddress.id) {
                            wpts[j].removeNearPointAttachedToWaypoint(window.routing.routes[key], pointAddress.waypointId, pointAddress.id)
                        }


                    }

                }
            })
            
        }
        */
    })

    var pointNameBaloon = null
    const getPointBaloonIcon = () => {
        var ballon_size = {
            "corner": this.identifier.length * 3.888888,
            "curve": (this.identifier.length * 3.888888) + 10
        };
        return {
            path: `M 10 0 C 0 0 0 10 10 10 L ${ballon_size["corner"]} 10 C ${ballon_size["curve"]} 10 ${ballon_size["curve"]} 0 ${ballon_size["corner"]} 0 Z`,
            anchor: { x: (ballon_size["curve"] / 2), y: 28 },
            labelOrigin: { x: (ballon_size["curve"] / 2), y: 5 },
            scale: 2,
            fillColor: 'white',
            fillOpacity: 1.0,
            strokeColor: 'black',
            strokeWeight: 1
        }
    }
    this.marker.addListener('mouseover', (e) => {
        const _this = this
        const map = window.map
        if (pointNameBaloon === null) {
            pointNameBaloon = new window.google.maps.Marker({
                position: e.latLng,
                label: _this.identifier,
                icon: getPointBaloonIcon(),
                zIndex: 25,
                data: {},
                draggable: true,
                map,
            })
        } else {
            pointNameBaloon.setPosition(e.latLng);
            pointNameBaloon.setLabel(_this.identifier)
            pointNameBaloon.setIcon(getPointBaloonIcon())
            pointNameBaloon.setMap(map)
        }

    })
    this.marker.addListener('mouseout', function (event) {


        pointNameBaloon.setMap(null);

    });
    //this.centerPoint.bindTo('center', this.marker, 'position');
    
}

