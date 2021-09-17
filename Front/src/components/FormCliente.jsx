import React from "react";
import {Form} from './Form';
import { form } from '../InputCliente.js'
import { useQuery, AppContext } from "../AppContext";
import { API } from '../ApiProvider'
import axios from "axios";

const FormCliente = ({ history }) => {
    const [formUpdate, setFormUpdate] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const { token } = React.useContext(AppContext)
    const query = useQuery()
    const id = query.get('id')
    const { CLIENTS_NEW } = API
    const { CLIENTS } = API
    const headers = {
        Authorization: `Bearer ${token}`
    }  
    
    React.useEffect(()=> {
        const getData = async () => {
            const { CLIENTS } = API
            const headers = {
                Authorization: `Bearer ${token}`
            }  
            setLoading(true)
            try {
                const response = await axios.get(CLIENTS + id, { headers })
                for (let element of form) {
                    formUpdate.push({ 
                            ...element,
                            options: { 
                                ...element.options, 
                                value: response.data[element.name]
                            }
                        })             
                }
                setFormUpdate(formUpdate)
            } catch (error) {
                console.log(error.message)
            }
            setLoading(false)
        }
        if(id !== null){
            getData()
        }
    }, [token, formUpdate, id])

    if (loading){
        <p>Cargando</p>
    }
    
    return id
    ? <Form form={ formUpdate } 
    submit='Actualizar'
    messageSubmit='Cliente Actualizado'
    goBack={history.goBack} 
    endpoint={(data) => axios.put(CLIENTS + id , data, { headers }) }/> 
    : <Form form={ form }
    submit='Crear' 
    messageSubmit='Creado Exitosamente'
    goBack={history.goBack}
    endpoint={(data) => axios.post(CLIENTS_NEW, data, { headers }) }/> 
}

export { FormCliente }