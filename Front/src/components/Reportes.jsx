import React from 'react';

import { API } from '../ApiProvider';
import axios from 'axios'
import { AppContext } from '../AppContext' 

import '../assets/css/Reportes.css';
import { toFormat } from '../InputServicio';

const Reportes = ()=>{
    const { token, setToast, tipoToast } = React.useContext(AppContext)
    const [state, setState] = React.useState({
        cantidad: null,
        ganancias: null
    })
    
    const getStringDate = (date)=>{
        let dateString ='';
        if(date !== undefined && date !== null){
            let dia = date.getDate();
            let mes= date.getMonth()+1;// date va de 0-11
            if(dia<=9){
                dia = "0" + dia;
            }
            if(mes<=9){
                mes = "0" + mes;
            }
            dateString = date.getFullYear() + "-" + mes + "-" + dia;
            return "?date="+ dateString;
        }
       return dateString;
    }

    
    
    
    React.useEffect(() => {
        const getAppointments = async() => {
            let date = new Date();
            let fecha = getStringDate(date);
            const { APPOINTMENTS_BY_DATE } = API
            const headers = {
                Authorization: `Bearer ${token}`
            }
            try {
                const response = await axios.get(APPOINTMENTS_BY_DATE+fecha, { headers })
                let cantidad = 0;
                let ganancia = 0;
                response.data.forEach(cita=>{
                    
                    if(cita.appointmentIsDone){
                        cantidad ++;
       
                        cita.serviceList.forEach(servicio=>{
                            ganancia += servicio.price;
                        })     
                    }
                } )
    
    
                setState({
                    cantidad,
                    ganancias: toFormat(ganancia)
                })
                return response.data;  
                         
            } catch (error) {
                setToast({
                    message: error.response?.data.message || error.message,
                    tipoToast: tipoToast.ERROR
                })
            }
        }
        getAppointments();
    },[token, setToast, tipoToast.ERROR])


    
        
    


    // const totalServicios = ()=>{
    //     let total = 0;
    //     props.servicios.map(servicio=>{
    //         total += servicio.price
    //     })
    //     let formatCurrency = new Intl.NumberFormat('es-CO', {
    //         style: 'currency',
    //         currency: 'COP',
    //         minimumFractionDigits: 0
    //     });
    //     return formatCurrency.format(total);
    // }
    
    return(
        <div className="Reportes__container">
            <div className="Reportes__tarjeta">
                <h3 className="Reportes__tarjeta-titulo">Ganancias hoy</h3>
                <div className="Reportes__tarjeta-cantidad"> {state.ganancias}</div>
            </div>
            <div className="Reportes__tarjeta">
                <h3 className="Reportes__tarjeta-titulo">Citas completadas hoy</h3>
                <div className="Reportes__tarjeta-cantidad"> {state.cantidad}</div>
            </div>
            {/*<div className="Reportes__tarjeta">
                <h3 className="Reportes__tarjeta-titulo">Reporte Semanal</h3>
                <div className="Reportes__semana-total"><p>Total: $1000000</p></div>
    </div>*/}
            <div className="Reportes__tarjeta">
                <h3 className="Reportes__tarjeta-titulo">Reporte Mensual</h3>
                <form className="Reportes__form">
                    <div className="Reportes__form-select">
                    <select>
                        <option value="">Mes</option>
                    </select>
                    <select>
                        <option value="">Año</option>
                    </select>
                    </div>
                    <button className="Reportes__form-button"><i className="bi bi-download"></i> Descargar</button>
                </form>
            </div>
        </div>
    )
}

export default Reportes;