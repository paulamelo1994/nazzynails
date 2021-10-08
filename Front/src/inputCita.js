import { API } from './ApiProvider'

const parseTime = (date, t) => {
    const time = t.split(':')
    console.log(time)
    date.setHours(parseInt(time[0]));
    date.setMinutes(parseInt(time[1]));
    console.log(date)
    return date;
}
const processData = (data) => {
    console.log(data)
    const time = data.time
    let date = data.date
    let dateHour = parseTime(date, time)
    return {...data, clientId: data.clientId[0].id, serviceList: data.serviceList.map(s => s.id), time: dateHour }
}
const processGetData = (data) => {
    let newData = {
            time: new Date(data.time).toLocaleString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
            clientId: [{
                id: data.clientId.id,
                name: data.clientId.name
            }],
            serviceList: data.serviceList.map(s => ({ id: s.id, name: s.name }))
        }
        //newData.time = dateTimeFormatForFormUI(time) + ' ' + time.toLocaleString([], { hour: '2-digit', minute: '2-digit' })
    return newData
}

const formCita = [{
        label: "Seleccione el cliente",
        name: 'clientId',
        type: 'select',
        placeholder: 'Seleccione cliente',
        url: API.CLIENTS,
        prop: 'name',
        options: {
            require: 'Este campo es requerido'
        }
    },
    {
        label: "Fecha y hora",
        name: 'time',
        placeholder: 'Hora',
        //format: dateTimeFormatForFormUI,
        type: 'time',
        options: {
            required: "Este campo es requerido",
        }
    },
    {
        label: "Seleccione los servicios",
        name: 'serviceList',
        placeholder: 'servicio',
        type: 'select',
        multiple: true,
        url: API.SERVICES,
        prop: 'name',
        options: {
            require: 'Este campo es requerido'
        }
    }
]
export { formCita, processData, processGetData }