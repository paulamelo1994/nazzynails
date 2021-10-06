import { API } from './ApiProvider'
const formCita = [{
        label: "Seleccione el cliente",
        name: 'clientId',
        type: 'select',
        placeholder: 'Seleccione cliente',
        url: API.CLIENTS,
        prop: 'name'
    },
    {
        label: "Fecha y hora",
        name: 'time',
        placeholder: 'Fecha y hora',
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
        prop: 'name'
    }
]
export { formCita }