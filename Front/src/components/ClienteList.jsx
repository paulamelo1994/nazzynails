import React from 'react'
import { ClienteCard } from './ClienteCard'
import { AppContext } from '../AppContext' 
import '../assets/css/Cliente.css'

import axios from 'axios'
import { API } from '../ApiProvider'
import { Loader } from './Loader'
const ClienteList = () => {
    const [clientes, setClientes] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const { token, setToast, tipoToast } = React.useContext(AppContext)

    React.useEffect(() => {
        const getClientes = async() => {
            const { CLIENTS } = API
            const headers = {
                Authorization: `Bearer ${token}`
            }
            setLoading(true)
            try {
                const response = await axios.get(CLIENTS, { headers })
                setClientes(response.data)
            } catch (error) {
                setToast({
                    message: error.response?.data.message || error.message,
                    tipoToast: tipoToast.ERROR
                })
            }
            setLoading(false)
        }
        getClientes()
    }, [token, setToast, tipoToast.ERROR])

    if(loading){
        return <Loader />
    }

    return <ul className="d-flex p-0 row">
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