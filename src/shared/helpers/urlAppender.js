
const API_URL = process.env.API_URL ? process.env.API_URL : `http://localhost:8080`

const urlAppender = (path) => API_URL+path;
export default  urlAppender