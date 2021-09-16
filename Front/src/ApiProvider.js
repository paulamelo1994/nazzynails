import dotenv from 'dotenv'
dotenv.config()

const URL = process.env.API

const API = {
    CLIENTS: 'clients/'
}

Object.keys(API).map(key => API[key] = `${URL}/${API[key]}`)
export { API }