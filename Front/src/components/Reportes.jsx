import React from 'react';

import { API } from '../ApiProvider';
import axios from 'axios'
import { AppContext } from '../AppContext' 

import '../assets/css/Reportes.css';
import { toFormat } from '../InputServicio';
import { Loader } from './Loader';

const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
]

const Reportes = ()=>{
    const { token, setToast, tipoToast } = React.useContext(AppContext)
    const [date] = React.useState(new Date())
    const [month, setMonth] = React.useState()
    const [year, setYear] = React.useState()
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

    function generateArrayOfYears(start, end) {
        var max = new Date().getFullYear() + end
        var min = new Date().getFullYear() - start
        var years = []
      
        for (var i = max; i >= min; i--) {
          years.push(i)
        }
        return years
      }

    const getReport = async () => {
        const { REPORTS } = API
            const headers = {
                Authorization: `Bearer ${token}`,
                Accept: 'application/pdf'
            }
            setLoading(true)
            try {
                let newDate = date
                newDate.setMonth(month)
                newDate.setFullYear(year)
                const response = await axios.post(REPORTS, { date: newDate }, {
                    responseType: "arraybuffer",
                    headers
                })
                const file = new Blob([response.data], {
                    type: "application/pdf"
                });
                const url = window.URL.createObjectURL(file);
                const link = document.createElement('a');
                link.href = url;
                link.download = "Reporte" + new Date().toLocaleDateString() + ".pdf";
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
    },[token, setToast, tipoToast.ERROR, date])
    
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
                    <select id="mes" onChange={(e) => setMonth(e.target.value)}>
                        <option value="Mes" defaultValue disabled>Mes</option>
                        {months.map((m, index)=> <option key={m} value={index}>{m}</option>)}
                    </select>
                    <select id="año" defaultValue={date.getFullYear()} onChange={(e) => setYear(e.target.value)}>
                        {generateArrayOfYears(10, 10).map(y => <option key={y} value={y}>{y}</option>)}
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