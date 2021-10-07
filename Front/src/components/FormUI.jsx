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
                    // console.log(form);
                    // console.log('setDataSelect',dataSelect)
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

    const processParams=(items,name)=>{
        let params = [];
        items.forEach((item,index) =>{
            if(item.hasOwnProperty('options')){
                if(item.name == name){
                    // multiples
                    if(Array.isArray(item.options.value)){
                        item.options.value.forEach(item=>{
                            params.push({
                                id:item.id,
                                name: item.name
                            })
                        })
                        return item.options.value;
                    }else{ // selects
                        params.push({
                            id: item.options.value.id, 
                            name: item.options.value.name
                        });
                        console.log(onSubmit)
                    }
                }
            }
        })
        // console.log('params',params);
        return params;
        // return [{id: 1, name: "Daniela Angulo"}]
    }

    const dateTimeFormatForFormUI = (form,name)=>{ 
        form.forEach(item=>{
            if(item.hasOwnProperty('options')){
                if(item.name == name){
                    let d = new Date(item.options.value);
                    let min = d.getMinutes() <=9 ? '0'+d.getMinutes() : d.getMinutes();
                    let hrs = d.getHours() <=9 ? '0'+d.getHours() : d.getHours();
                    let day = d.getDate() <=9 ? '0'+d.getDate() : d.getDate();
                    let mon = d.getMonth()+1 <=9 ? '0'+d.getMonth()+1 : d.getMonth()+1;

                    let str = day+'/'+mon+'/'+d.getFullYear()+', '+hrs+'/'+min;
                    return str;
                }
            }
        })
    }

    if(loading){
        return <Loader />
    }
    const selected = null;
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
                    ? <>
                        {i.label && <label>{i.label}</label>}
                        <Typeahead
                            id="selections-example"
                            labelKey="name"
                            onChange={text => { setValue(i.name, i.multiple ? text.map(t => t.id): text.pop().id); }}
                            multiple={i.multiple ? true : false}
                            options={dataSelect[i.name] || []}
                            placeholder={i.placeholder}
                            defaultSelected={ // [{id: 1, name: "Daniela Angulo"}]

                                processParams(form,i.name)
                                
                            }
                            
                        />
                    </>
                    :   <>
                            {i.label && <label>{i.label}</label>}
                            <input className="form-control p-3 border-maroon"
                            style={{boxShadow: errors[i.name] && ' 0 0 0 0.25rem lightcoral'}} 
                            placeholder={i.placeholder}
                            type={i.type}
                            value = {i.type == 'datetime-local' && dateTimeFormatForFormUI(form,i.name)}
                            {...register(i.name, i.options)}/>
                        </>
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