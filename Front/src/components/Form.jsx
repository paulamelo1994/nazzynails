import React from "react";
import { FormUI } from './FormUI';
import { useQuery, AppContext } from "../AppContext";
import axios from "axios";
import { Loader } from "./Loader";

const Form = ({ history, form, pathNew, pathUpdate}) => {
    const query = useQuery()
    const id = query.get('id')
    const [formUpdate, setFormUpdate] = React.useState([])
    const [loading, setLoading] = React.useState(id!==null)
    const { token } = React.useContext(AppContext)
    const headers = {
        Authorization: `Bearer ${token}`
    }  
    
    React.useEffect(()=> {
        const getData = async () => {
            const headers = {
                Authorization: `Bearer ${token}`
            }  
            setLoading(true)
            try {
                const response = await axios.get(pathUpdate + id, { headers })
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
    }, [token, formUpdate, id, form, pathUpdate])

    if (loading){
        return <Loader />
    }
    
    return id
    ? <FormUI form={ formUpdate } 
    submit='Actualizar'
    messageSubmit='Cliente Actualizado'
    goBack={history.goBack} 
    endpoint={(data) => axios.put(pathUpdate + id , data, { headers }) }/> 
    : <FormUI form={ form }
    submit='Crear' 
    messageSubmit='Creado Exitosamente'
    goBack={history.goBack}
    endpoint={(data) => axios.post(pathNew, data, { headers }) }/> 
}

export { Form }