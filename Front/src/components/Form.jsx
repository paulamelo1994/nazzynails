import React from 'react'
import { useForm } from "react-hook-form";
import '../assets/css/Form.css'

/**
 * @form es un arreglo que contiene objetos con
 * la siguiente estructura
 * @input {Object} objeto que se renderizará como un input
 * @name {Object} input.name Nombre del input
 * @placeholder {Object} input.placeholder Placeholder del input
 * @type {Object} input.type Tipo de input
 * @options {Object} input.options es un objeto que contiene los attr de useForm
*/
const Form = ({ form , goBack}) => {
    const [dataForm] = React.useState(form || [])
    const {
        register, 
        formState: {errors}, 
        handleSubmit,
        setValue
    } = useForm()

    const onSubmit = data => {
        setValue('nombre', 'Enviado')
    }

    return <form className="form" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <h2 className="mb-4">Nuevo Cliente</h2>
        { dataForm.map((i, key) => (
            <div key={key} className="form-group mb-4">
                <input className="form-control p-3 border-maroon"
                style={{boxShadow: errors[i.name] && ' 0 0 0 0.25rem lightcoral'}} 
                {...i} 
                {...register(i.name, i.options)}/>
                {errors[i.name] && 
                    <small className="">
                        <i className="bi bi-exclamation-circle-fill"></i> {errors[i.name]?.message}
                    </small>
                }
            </div>
        )) }
        <div className="form-row d-flex justify-content-evenly">
            <button type="submit" className="btn__submit">Crear</button>
            <button type="button" className="btn__cancel" onClick={goBack}>Cancelar</button>
        </div>
    </form>
}

export { Form }