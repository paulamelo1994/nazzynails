import React from 'react'
import { useForm, useWatch } from "react-hook-form";
import { AppContext } from '../AppContext';
import { Typeahead } from 'react-bootstrap-typeahead'
import axios from 'axios';
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
 * @format {function} input.format es una funcion para alterar el formato del input
*/
const FormUI = ({ form , 
    goBack, 
    endpoint, 
    submit, 
    messageSubmit,
    title
}) => {
    const [dataForm] = React.useState(form || [])
    const [dataSelect, setDataSelect] = React.useState({})
    const [loading, setLoading] = React.useState(false)
    const { token, setToast, tipoToast } = React.useContext(AppContext)
    const {
        register, 
        formState: {errors}, 
        handleSubmit,
        control,
        setValue
    } = useForm()
    
    const IsolateReRender= ({format, name, defaultValue, control}) => {
        const input = useWatch({
            control,
            name: name, 
            defaultValue: defaultValue 
        })

        return  <div className="input-group-prepend">
            <span className="input-group-text h-100" id="basic-addon2">{format(input)}</span>
        </div>
    }
    
    React.useEffect(() => {
        const getOptions = async (url, prop, name) => {
            const headers = {
                Authorization: `Bearer ${token}`
            }  
            setLoading(true)
            try {
                    const response = await axios.get(url, { headers })
                    setDataSelect(d => ({...d, [name] : response.data.map(data => ({id: data.id, name:data[prop]}))}))
                } catch (error) {
                    setDataSelect(d => ({...d, [name] : [[]]}))
                    setToast({ 
                        message: error.response?.data.message || error.message,
                        tipo: tipoToast.ERROR
                    })
                }
            setLoading(false)
        }
        const selects = dataForm.filter((i) => i.type === 'select')
        selects.forEach(async (i) => await getOptions(i.url, i.prop, i.name)) 
    }, [token, setToast, tipoToast.ERROR, dataForm])

    const onSubmit = async data => {
        setLoading(true)
        try {
            const response = await endpoint(data)
            setToast({ 
                message: response.data.message || messageSubmit, 
                tipo: tipoToast.CREAR
            })
            goBack()
        } catch (error) {
            setToast({ 
                message: error.response?.data.message || error.message,
                tipo: tipoToast.ERROR
            })
        }
        setLoading(false)
    }

    if(loading){
        return <Loader />
    }
    return <form className="form" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <h2 className="mb-4">{title}</h2>
        { dataForm.map((i, key) => {
            return <div key={key} className='form-group mb-4'>
                <div className={`${i.format ? 'input-group w-100' : ''}`}>
                    {i.type === 'checkbox' 
                    ? <div className="form-check d-flex justify-content-evenly">
                        <input className="form-check-input check-lg" 
                        type="checkbox" id={i.name} 
                        {...register(i.name, i.options)}/>
                        <label className="form-check-label" htmlFor={i.name}>{i.placeholder}</label>
                    </div>
                    : i.type === 'select'
                    ? <Typeahead
                        id="selections-example"
                        labelKey="name"
                        onChange={text => { setValue(i.name, i.multiple ? text.map(t => t.id): text.pop().id); }}
                        multiple={i.multiple ? true : false}
                        options={dataSelect[i.name] || []}
                        placeholder={i.placeholder}
                    />
                    : <input className="form-control p-3 border-maroon"
                        style={{boxShadow: errors[i.name] && ' 0 0 0 0.25rem lightcoral'}} 
                        placeholder={i.placeholder}
                        type={i.type}
                        {...register(i.name, i.options)}/>
                    }
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
            <button type="button" className="btn__cancel" onClick={goBack}>Cancelar</button>
            <button type="submit" className="btn__submit">{submit}</button>
        </div>
    </form>
}

export { FormUI }