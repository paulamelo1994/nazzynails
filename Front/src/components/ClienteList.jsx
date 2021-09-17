import React from 'react'
import { ClienteCard } from './ClienteCard'
import { AppContext } from '../AppContext' 
import '../assets/css/Cliente.css'

import axios from 'axios'
import { API } from '../ApiProvider'
const ClienteList = () => {
    const [clientes, setClientes] = React.useState([])
    const { token } = React.useContext(AppContext)

    React.useEffect(() => {
        const getClientes = async() => {
            const { CLIENTS } = API
            const headers = {
                Authorization: `Bearer ${token}`
            }
            try {
                const response = await axios.get(CLIENTS, { headers })
                setClientes(response.data)
            } catch (error) {
                console.log(error.message)
            }
        }
        getClientes()
    }, [token])
    return <ul className="list-group">
        {
            clientes.map(c => <ClienteCard key={c.id} 
                nombre={c.name} 
                apellido={c.lastName}
                telefono={c.phoneNumber}
                id={c.id}
                />)
        }
    </ul>
}

export { ClienteList }