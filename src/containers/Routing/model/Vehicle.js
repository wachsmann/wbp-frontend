
import React from 'react'
import { STOP, PASSTHROUGH, SOFT, LIGHT } from "../utils/constants"
import { mongoObjectId } from "../utils/utils"
import Waypoints from "../components/Icons/Waypoints"
import { renderToString } from 'react-dom/server'
import objectKeyRemover from '../utils/objectKeyRemover'



export function Vehicle({id, prefix,plate,capacity}) {
    this.id = id ? id : null
    this.prefix = prefix
    this.plate = plate
    this.capacity = !!capacity ? capacity : 0
    
}
