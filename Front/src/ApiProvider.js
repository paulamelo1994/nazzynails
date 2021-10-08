require('dotenv').config({ path: '../.env' })
const URL = process.env.API || 'http://192.168.1.54:5000/api'
    // const URL = process.env.API || 'http://192.168.10.17:5000/api'

const API = {
    USERS: 'users/',
    USERS_CREATE: 'users/register/',
    USERS_AUTH: 'users/authenticate/',
    CLIENTS: 'clients/',
    CLIENTS_NEW: 'clients/create/',
    SERVICES: 'services/',
    SERVICES_NEW: 'services/create/',
    APPOINTMENTS: 'appointments/',
    APPOINTMENTS_NEW: 'appointments/create/',
    APPOINTMENTS_BY_DATE: 'appointments/date',
    REPORTS: 'reports/generate',
    REPORTS_WEEK: 'reports/generateWeek'
}

Object.keys(API).map(key => API[key] = `${URL}/${API[key]}`)
export { API }