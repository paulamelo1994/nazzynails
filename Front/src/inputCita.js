import { API } from './ApiProvider'

const dateTimeFormatForFormUI = (value) => {
    let d = new Date();
    if (value) {
        d = new Date(value)
    }
    let day = d.getDate() <= 9 ? '0' + d.getDate() : d.getDate();
    let mon = d.getMonth() + 1 <= 9 ? '0' + d.getMonth() + 1 : d.getMonth() + 1;

    let str = mon + '/' + day + '/' + d.getFullYear();
    return str;

}
const parseTime = (date, t) => {
    const time = t.match(/(\d+)(?::(\d\d))?\s*(p?)/);
    date.setHours(parseInt(time[1]) + (time[3] ? 12 : 0));
    date.setMinutes(parseInt(time[2]) || 0);
    return date;
}
const processData = (data) => {
    const time = data.time.split(' ')
    let date = new Date(time[0])
    let dateHour = parseTime(date, time[1] + time[2])
    return {...data, clientId: data.clientId[0].id, serviceList: data.serviceList.map(s => s.id), time: dateHour }
}
const processGetData = (data) => {
    let newData = {
        clientId: [{
            id: data.clientId.id,
            name: data.clientId.name
        }],
        serviceList: data.serviceList.map(s => ({ id: s.id, name: s.name }))
    }
    const time = new Date(data.time)
    newData.time = dateTimeFormatForFormUI(time) + ' ' + time.toLocaleString([], { hour: '2-digit', minute: '2-digit' })
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
        placeholder: 'Fecha y hora',
        //format: dateTimeFormatForFormUI,
        type: 'datetime-local',
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