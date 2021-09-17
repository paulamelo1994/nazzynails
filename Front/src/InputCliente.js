const formClient = [{
        name: 'phoneNumber',
        placeholder: 'Teléfono',
        type: 'text',
        options: {
            required: "Este campo es requerido",
            pattern: {
                value: /^([0-9]*)$/,
                message: "Ingrese un número valido"
            }
        }
    },
    {
        name: 'name',
        placeholder: 'Nombre',
        type: 'text',
        options: {
            required: "Este campo es requerido",
            pattern: {
                value: /^([A-záéíóúñÑÁÉÍÓÚ]+[\s]*)+$/,
                message: "Ingrese un nombre valido."
            }
        }
    },
    {
        name: 'address',
        placeholder: 'Direccion',
        type: 'text',
        options: {}
    },
    {
        name: 'email',
        placeholder: 'Correo',
        type: 'email',
        options: {
            pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Ingrese un correo valido."
            }
        }
    }
]
export { formClient }