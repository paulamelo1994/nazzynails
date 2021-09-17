import React, { useState } from 'react'
import '../assets/css/Login.css'
import logo from '../assets/icons/logo.png'
import { AppContext } from '../AppContext'
import { API } from '../ApiProvider'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
const Login = () => {
    const [data, setData] = useState({
        username: '',
        password: ''
    })
    const [load, setLoad] = useState(false)
    const [error, setError] = useState('')
    const { token, createCookie } = React.useContext(AppContext)
    
    const handleInputChange = (e) => {
        setData({
            ...data,
            [e.target.id]: e.target.value
        })
    }
    const auth = async (e) => {
        const { USERS_AUTH } = API
        e.preventDefault()
        setLoad(true)
        try {
            const response = await axios.post(USERS_AUTH, data)
            console.log(response)
            createCookie(response.data.token)
        } catch (error) {
            setError(error.response?.data || error.message)
            console.log(error.data)
        }
        setLoad(false)
    }

    if(error){
        return <p>Error - {error}</p>
    }
    
    return <form className="form__login text-center p-4" onSubmit={auth}>
        <img className="mw-50 m-0 mx-auto" src={logo} alt="Logo nazzynails" />
        <h2>Ingresar</h2>
        <div className="form-group">
            <input className="form-control p-3 mb-4" 
            type="text" 
            id="username" 
            value={data.username}
            onChange={handleInputChange} 
            placeholder="Username o número telefónico" />
            <input className="form-control p-3" 
            type="password" 
            id="password" 
            value={data.password} 
            onChange={handleInputChange} 
            placeholder="Contraseña"/>
        </div>
        <div className="form-check login__check">
            <input className="form-check-input check-lg" type="checkbox" id="session" defaultChecked={true}/>
            <label className="form-check-label" htmlFor="session">Mantener mi sesión iniciada</label>
        </div>
        <button className="login__btn w-100" type="submit">{load ? token : 'Entrar'}</button>
        { token && <Redirect to="/" /> }
    </form>
}

export {Login}