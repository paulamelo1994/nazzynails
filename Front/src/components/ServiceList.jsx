import React from 'react'
import { ServiceCard } from './ServiceCard'
import { AppContext } from '../AppContext' 
import '../assets/css/Servicio.css'

import axios from 'axios'
import { API } from '../ApiProvider'
import { Loader } from './Loader'
const ServiceList = () => {
    const [services, setServices] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const { token, setToast, tipoToast } = React.useContext(AppContext)

    React.useEffect(() => {
        const getServices = async() => {
            const { SERVICES } = API
            const headers = {
                Authorization: `Bearer ${token}`
            }
            setLoading(true)
            try {
                const response = await axios.get(SERVICES, { headers })
                setServices(response.data)
            } catch (error) {
                setToast({
                    message: error.response?.data.message || error.message,
                    tipoToast: tipoToast.ERROR
                })
            }
            setLoading(false)
        }
        getServices()
    }, [token, setToast, tipoToast.ERROR])

    if(loading){
        return <Loader />
    }
    return <ul className="d-flex p-0 row">
        {
            
            services.map(s => <ServiceCard key={s.id}
                nombre={s.name}
                precio={s.price}
                tiempo={s.length}
                isActive={s.enable}
                id={s.id}
            />)
        }
    </ul>
}

export { ServiceList }