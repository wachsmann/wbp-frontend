
import React from 'react'
import { STOP, PASSTHROUGH, SOFT, LIGHT } from "../utils/constants"
import { mongoObjectId } from "../utils/utils"
import Waypoints from "../components/Icons/Waypoints"
import { renderToString } from 'react-dom/server'
import objectKeyRemover from '../utils/objectKeyRemover'



export function Waypoint({ marker, color = "",passengers, bounds, label, visible = true, id = null, _name = null }) {
    this._id = id ? id : null
    this.marker = marker
    this.centerPoint = null
    this.circle = null
    this.name = _name ? _name : `Ponto de Embarque`
    this.passengers = passengers
    this.bounds = bounds
    this.terminate = () => {
        if(this.marker !== null)
            this.marker.setMap(null)
        if(this.circle !== null)
            this.circle.setMap(null)
        //Object.keys(this.visits).forEach(key => this.visits[key].terminate())
        
    }
    this.marker.setIcon(
        {
            url:
                `data:image/svg+xml;charset=utf-8,
                    ${encodeURIComponent(
                    renderToString(<Waypoints color={"#ff2b2b"} symbol={"E"} />)
                )
                }`,
            anchor: new window.google.maps.Point(15, 30),
            scaledSize: new window.google.maps.Size(30, 30),
            zIndex: 2
        }
    )
    var pointNameBaloon = null
    const getPointBaloonIcon = () => {
        var ballon_size = {
            "corner": this.name.length * 3.888888,
            "curve": (this.name.length * 3.888888) + 10
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
                label: this.name,
                icon: getPointBaloonIcon(),
                zIndex: 25,
                data: {},
                draggable: true,
                map,
            })
        } else {
            pointNameBaloon.setPosition(e.latLng);
            pointNameBaloon.setLabel(this.name)
            pointNameBaloon.setIcon(getPointBaloonIcon())
            pointNameBaloon.setMap(map)
        }

    })
    this.marker.addListener('mouseout', function (event) {


        pointNameBaloon.setMap(null);

    });
}
