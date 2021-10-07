import React from "react";
import { FormUI } from './FormUI';
import { useQuery, AppContext } from "../AppContext";
import axios from "axios";
import { Loader } from "./Loader";

const Form = ({ history, form, pathNew, pathUpdate, title, processData, processGetData}) => {
    const query = useQuery()
    const id = query.get('id')
    const [formUpdate, setFormUpdate] = React.useState([])
    const [loading, setLoading] = React.useState(id!==null)
    const { token, setToast, tipoToast} = React.useContext(AppContext)
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
                if(processGetData){
                    response.data = processGetData(response.data)
                }
                for (let element of form) {
                    formUpdate.push({ 
                        ...element,
                        options: { 
                            ...element.options, 
                            value: response.data[element.name]
                        }
                    })
                }             
                console.log(formUpdate)
                setFormUpdate(formUpdate)
            } catch (error) {
                console.log(error)
                setFormUpdate([])
                setToast({ 
                    message: error.response?.data.message || error.message,
                    tipo: tipoToast.ERROR
                })
            }
            setLoading(false)
        }
        if(id !== null ){
            getData()
        }
    }, [token, setToast, tipoToast.ERROR, formUpdate, id, form, pathUpdate, processGetData])

    if (loading){
        return <Loader />
    }
    
    return id
    ? <FormUI form={ formUpdate } 
    title={`Actualizar ${title}`}
    submit='Actualizar'
    processData={processData}
    messageSubmit={`${title} Actualizado`}
    goBack={history.goBack} 
    endpoint={(data) => axios.put(pathUpdate + id , data, { headers }) }/> 
    : <FormUI form={ form }
    title={`Crear ${title}`}
    submit='Crear' 
    processData={processData}
    messageSubmit='Creado Exitosamente'
    goBack={history.goBack}
    endpoint={(data) => axios.post(pathNew, data, { headers }) }/> 
}

export { Form }