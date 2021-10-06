import { API } from './ApiProvider'
const formCita = [{
        name: 'clientId',
        type: 'select',
        placeholder: 'Seleccione cliente',
        url: API.CLIENTS,
        prop: 'name'
    },
    {
        name: 'fecha',
        placeholder: 'Fecha',
        type: 'date',
        options: {
            required: "Este campo es requerido",

        }
    },
    {
        name: 'hora',
        placeholder: 'Hora',
        type: 'time',
        options: {}
    },
    {
        name: 'serviceList',
        placeholder: 'servicio',
        type: 'select',
        multiple: true,
        url: API.SERVICES,
        prop: 'name'
    }
]
export { formCita }