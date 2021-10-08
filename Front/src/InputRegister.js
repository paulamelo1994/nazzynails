const formRegister = [{
        name: 'firstName',
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
        name: 'lastName',
        placeholder: 'Apellido',
        type: 'text',
        options: {
            required: "Este campo es requerido",
            pattern: {
                value: /^([A-záéíóúñÑÁÉÍÓÚ]+[\s]*)+$/,
                message: "Ingrese un apellido valido."
            }
        }
    },
    {
        name: 'username',
        placeholder: 'Nombre de usuario',
        type: 'text',
        options: {
            required: "Este campo es requerido",
            pattern: {
                value: /^([A-záéíóúñÑÁÉÍÓÚ]+[\s]*)+$/,
                message: "Ingrese un nombre de usuario valido."
            }
        }

    },
    {
        name: 'password',
        placeholder: 'Contraseña',
        type: 'password',
        options: {
            required: "Este campo es requerido",
            minLength: { value: 6, message: "Debe ser una contraseña mas larga" },
        }
    }
]
export { formRegister }