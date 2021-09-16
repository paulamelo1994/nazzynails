import React from "react";
import {Form} from './Form';

const FormCliente = ({ history }) => {
    const form = [{
            name: 'phoneNumber',
            placeholder: 'Teléfono',
            type: 'number',
            options: {
                required: "Este campo es requerido",
                valueAsNumber: "Escriba un numero de télefono valido"
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
            type: 'text'
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

    return  <Form form={form} goBack={history.goBack}/>
}

export { FormCliente }