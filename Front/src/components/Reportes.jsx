import React from 'react';

import { API } from '../ApiProvider';
import axios from 'axios'
import { AppContext } from '../AppContext' 

import '../assets/css/Reportes.css';
import { toFormat } from '../InputServicio';
import { Loader } from './Loader';

const Reportes = ()=>{
    const { token, setToast, tipoToast } = React.useContext(AppContext)
    const [date, setDate] = React.useState(new Date())
    const [loading, setLoading] = React.useState(false)
    const [state, setState] = React.useState({
        cantidad: 0,
        ganancias: 0
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

    const getReport = async () => {
        const { REPORTS } = API
            const headers = {
                Authorization: `Bearer ${token}`,
                Accept: 'application/pdf'
            }
            setLoading(true)
            try {
                const response = await axios.post(REPORTS, { date }, {
                    responseType: "arraybuffer",
                    headers
                })
                console.log(response)
                const file = new Blob([response.data], {
                    type: "application/pdf"
                  });
                console.log(file)
                const url = window.URL.createObjectURL(file);
                const link = document.createElement('a');
                link.href = url;
                link.download = "Reporte" + new Date() + ".pdf";
                link.click();
                
            } catch (error) {
                console.log(error)
                setToast({
                    message: error.response?.data.message || error.message,
                    tipoToast: tipoToast.ERROR
                })
            }
            setLoading(false)
    }
    
    
    React.useEffect(() => {
        const getAppointments = async() => {
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
                    <button type="button" className="Reportes__form-button" onClick={getReport}><i className="bi bi-download"></i> Descargar
                    {loading && <Loader />}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Reportes;