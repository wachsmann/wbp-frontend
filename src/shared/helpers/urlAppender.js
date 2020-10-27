
const API_URL = process.env.API_URL ? process.env.API_URL : `https://wbp-bck.herokuapp.com`

const urlAppender = (path) => API_URL+path;
export default  urlAppender