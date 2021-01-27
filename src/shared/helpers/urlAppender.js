
const API_URL = process.env.API_URL ? process.env.API_URL : `http://18.228.196.89:8080`

const urlAppender = (path) => API_URL+path;
export default  urlAppender