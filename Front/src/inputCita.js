const formCita = [{
    name: 'nombreCliente',
    placeholder: 'Seleccione cliente',
    type: 'select',
    options: {
        required: "Este campo es requerido",
        
    }
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
    name: 'servicios',
    placeholder: 'servicio',
    type: 'select',
    options: {
        pattern: {
            
        }
    }
}
]
export { formCita }