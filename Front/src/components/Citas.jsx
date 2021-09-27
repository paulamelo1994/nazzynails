import React, { useState } from 'react';
import Calendar from 'react-calendar';

import axios from 'axios'
import { API } from '../ApiProvider'
import { Loader } from './Loader'
import { AppContext } from '../AppContext' 


import 'react-calendar/dist/Calendar.css';
import '../assets/css/Citas.css';
import Asignaciones from './Asignaciones';

const Citas = () => {
    const [date, setDate]               = useState(new Date());
    const [loading, setLoading]         = React.useState(false)
    const { token, setToast, tipoToast } = React.useContext(AppContext)
    const [appointment, setAppointments] = React.useState([])

    const getStringDate = (date, event)=>{
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
            let fecha = getStringDate(date);
            //console.log('fecha:');
            // console.log(fecha);
            const { APPOINTMENTS_BY_DATE } = API
            const headers = {
                Authorization: `Bearer ${token}`
            }
            setLoading(true)
            try {
                const response = await axios.get(APPOINTMENTS_BY_DATE+fecha, { headers })
                setAppointments(response.data)
            } catch (error) {
                setToast({
                    message: error.response?.data.message || error.message,
                    tipoToast: tipoToast.ERROR
                })
            }
            setLoading(false)
        }
        getAppointments()
    }, [date, token, setToast, tipoToast.ERROR])

    if(loading){
        return <Loader />
    }


    return (
        <div>
            <div className="citas__calendar">
                <Calendar
                    onChange={setDate}
                    value={date}
                />
                {console.log(date)}
            </div>
            <div className="citas__asignaciones">
                {
                    appointment.map((item, index)=>{
                        console.log(item);
                        let time = "";
                        return <Asignaciones 
                            nombre= {item.client.name}
                            hora=""
                            telefono={item.client.phoneNumber}
                            servicios={[{"id":1,"name":"Uñas en Acrílico","length":20000,"enable":true,"price":65000}]} />
                    })
                }
                
            </div>
        </div>
    );

}

export {Citas};

