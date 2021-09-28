require('dotenv').config({ path: '../.env' })
const URL = process.env.API || 'http://localhost:5000/api'

const API = {
    USERS: 'users/',
    USERS_AUTH: 'users/authenticate/',
    CLIENTS: 'clients/',
    CLIENTS_NEW: 'clients/create/',
    SERVICES: 'services/',
    SERVICES_NEW: 'services/create/',
    APPOINTMENTS: 'appointments/',
    APPOINTMENTS_NEW: 'appointments/create/',
    APPOINTMENTS_BY_DATE: 'appointments/date',
}

Object.keys(API).map(key => API[key] = `${URL}/${API[key]}`)
export { API }