import React from 'react'
import '../assets/css/Form.css'

/**
 * @form es un arreglo que contiene objetos con
 * la siguiente estructura
 * @input {Object} objeto que se renderizará como un input
 * @name {Object} input.name Nombre del input
 * @type {Object} input.type Tipo de input
*/
class Form extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            form: this.props.form || [],
            data: null
        }
    }

    handleData = (e) => {
        console.log(this.state)
        this.setState({...this.state.data, [e.target.name]: e.target.value})
    }
    render = () => {
        const { form } = this.state
        return <form className="form">
            <h2 className="mb-4">Nuevo Cliente</h2>
            { form.map((i, key) => (
                <input key={key} className="form-control p-3 mb-4"  {...i} onChange={this.handleData}/>
            )) }
            <div className="form-row d-flex justify-content-evenly">
                <button type="submit" className="btn__submit">Crear</button>
                <button type="button" className="btn__cancel" onClick={this.props.goBack}>Cancelar</button>
            </div>
        </form>
    }
}

export default Form