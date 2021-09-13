const URL = "http://localhost:5000/api"

const API = {
    CLIENTS: 'clients/'
}

Object.keys(API).map(key => API[key] = `${URL}/${API[key]}`)
export { API }