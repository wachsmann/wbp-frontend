/**
 *
 *  Service boy fetches what you need 
 *  
 *  
 **/

import axios from "axios"
import urlAppender from "./urlAppender"
import { getToken } from '../../shared/helpers/authBoy'

const getHeaders = (hasHeaders) => (hasHeaders ? {headers:{'Authorization':`Bearer ${getToken()}`}} : {headers:{}})

export const serviceBoy = {
    get:(path,hasHeader = true)=> (axios.get(urlAppender(path), getHeaders(hasHeader))),
    post:(path,data,hasHeaders = true) => (axios.post(urlAppender(path),data,getHeaders(hasHeaders))),
    put:(path,data,hasHeaders = true) => (axios.put(urlAppender(path),data,getHeaders(hasHeaders))),
    delete:(path,hasHeaders = true) => (axios.delete(urlAppender(path), getHeaders(hasHeaders)))
}
