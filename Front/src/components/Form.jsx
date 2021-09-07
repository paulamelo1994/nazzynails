import React from 'react'
import '../assets/css/Form.css'

/**
 * @form es un arreglo que contiene objetos con
 * la siguiente estructura
 * @input {Object} objeto que se renderizará como un input
 * @name {Object} input.name Nombre del input
 * @placeholder {Object} input.placeholder Placeholder del input
 * @type {Object} input.type Tipo de input
*/
const Form = ({ form , goBack}) => {
    const [dataForm] = React.useState(form || [])
    const [data, setData] = React.useState(null)

    const handleData = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }

    return <form className="form">
        <h2 className="mb-4">Nuevo Cliente</h2>
        { dataForm.map((i, key) => (
            <input key={key} className="form-control p-3 mb-4"  {...i} onChange={handleData}/>
        )) }
        <div className="form-row d-flex justify-content-evenly">
            <button type="submit" className="btn__submit">Crear</button>
            <button type="button" className="btn__cancel" onClick={goBack}>Cancelar</button>
        </div>
    </form>
}

export {Form}