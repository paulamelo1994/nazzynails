import React from "react";
import axios from 'axios'
import { API } from '../ApiProvider'
import { AppContext } from '../AppContext' 


import esmalte from '../assets/icons/botella-esmalte.svg'

const Asignaciones = (props)=>{

    const { token, setToast, tipoToast } = React.useContext(AppContext)
    // const [appointment, setAppointments] = React.useState([])

    let horas= new Date(props.hora).getHours();
    let minutos = new Date(props.hora).getMinutes();
    if (horas<=9){
        horas= "0"+horas;
    }
    if (minutos<=9){
        minutos = "0"+minutos;
    }
    let tiempo= horas + ":" + minutos;
    


    const delete_appointment = async (id)=>{
        const { APPOINTMENTS } = API
        const headers = {
            Authorization: `Bearer ${token}`
        }
        try {
            const response = await axios.delete(APPOINTMENTS+id, { headers })
            props.cambio();
        } catch (error) {
            setToast({
                message: error.response?.data.message || error.message,
                tipoToast: tipoToast.ERROR
            })
        }
    }
    
    return (
        <div className="Asignaciones__card" key={props.id}>
            <div className="Asignaciones__card-datos">
            <div className="Asignaciones__datos">
                <h1>{props.nombre}</h1>
                <p id="hora"><i className="bi bi-clock"></i> {tiempo}</p>
                <p id="telefono"><i className="bi bi-whatsapp"></i> <a href={`https://api.whatsapp.com/send?phone=+57${props.telefono}`}>{props.telefono}</a></p>
            </div>
            <div className="Asignaciones__servicios">
                <h1>Servicios</h1>
                {
                    props.servicios.map((item, index) => {
                    return(<p><span className="Asignaciones__servicios-icon"><img alt="asd" src={esmalte}/></span> {item.name}</p>)
                       
                    }) 
                }   
            </div>
            </div>
            <div className="Asignaciones__card-buttons">
                {props.enabled === true && (
                    <React.Fragment>
                        <button onClick={()=>{delete_appointment(props.id)}}><i className="bi bi-x-lg"></i>Cancelar</button>
                        <button><i className="bi bi-pencil-fill"></i>Actualizar</button>
                        <button><i className="bi bi-check2"></i>Cumplida</button>
                    </React.Fragment>
                )
                }
                {props.enabled===false && (
                        <span>Cita cancelada</span>
                    )
                }
                

            </div>
        </div>
    );


}
export default Asignaciones;