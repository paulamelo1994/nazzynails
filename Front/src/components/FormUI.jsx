import React from 'react'
import { useForm, useWatch } from "react-hook-form";
import { AppContext } from '../AppContext';
import '../assets/css/Form.css'
import { Loader } from './Loader';

/**
 * @form es un arreglo que contiene objetos con
 * la siguiente estructura
 * @input {Object} objeto que se renderizará como un input
 * @name {Object} input.name Nombre del input
 * @placeholder {Object} input.placeholder Placeholder del input
 * @type {Object} input.type Tipo de input
 * @options {Object} input.options es un objeto que contiene los attr de useForm
*/
const FormUI = ({ form , 
    goBack, 
    endpoint, 
    submit, 
    messageSubmit,
    title
}) => {
    const [dataForm] = React.useState(form || [])
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState('')
    const { setToast, tipoToast } = React.useContext(AppContext)
    const {
        register, 
        formState: {errors}, 
        handleSubmit,
        control
    } = useForm()
    
    const IsolateReRender= ({format, name, defaultValue, control}) => {
        const input = useWatch({
            control,
            name: name, // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
            defaultValue: defaultValue // default value before the render
          })

        return  <div className="input-group-prepend">
            <span className="input-group-text h-100" id="basic-addon2">{format(input)}</span>
        </div>
    }

    const onSubmit = async data => {
        console.log(data)
        setLoading(true)
        try {
            const response = await endpoint(data)
            setToast({ 
                message: response.data.message || messageSubmit, 
                tipo: tipoToast.CREAR
            })
            goBack()
        } catch (error) {
            console.log(error.message)
            setError(error.message)
        }
        setLoading(false)
    }
    if (error){
        return <p>error</p>
    }
    if(loading){
        return <Loader />
    }
    return <form className="form" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <h2 className="mb-4">{title}</h2>
        { dataForm.map((i, key) => {
            return <div key={key} className='form-group mb-4'>
                <div className={`${i.format && 'input-group w-100'}`}>
                    <input className="form-control p-3 border-maroon"
                    style={{boxShadow: errors[i.name] && ' 0 0 0 0.25rem lightcoral'}} 
                    placeholder={i.placeholder}
                    type={i.type}
                    {...i}
                    {...register(i.name, i.options)}/>
                    {i.format && <IsolateReRender defaultValue={i.options.value} format={i.format} name={i.name} control={control} />}
                </div>
                {errors[i.name] && 
                    <small className="">
                        <i className="bi bi-exclamation-circle-fill"></i> {errors[i.name]?.message}
                    </small>
                }
            </div>
            }) }
        <div className="form-row d-flex justify-content-evenly">
            <button type="submit" className="btn__submit">{submit}</button>
            <button type="button" className="btn__cancel" onClick={goBack}>Cancelar</button>
        </div>
    </form>
}

export { FormUI }