
import React from 'react'
import { STOP, PASSTHROUGH, SOFT, LIGHT } from "../utils/constants"
import { mongoObjectId } from "../utils/utils"
import Waypoints from "../components/Icons/Waypoints"
import { renderToString } from 'react-dom/server'
import objectKeyRemover from '../utils/objectKeyRemover'



export function Waypoint({ marker, color = "",passengers, bounds, label, visible = true, id = null, _name = null }) {
    this._id = id ? id : mongoObjectId()
    var passenger_ballon_name = null;
    this.marker = marker
    this.centerPoint = null
    var attachedPolyline
    this.name = _name ? _name : `P${this._id}`
    this.passengers = passengers
    this.bounds = bounds
    
}
