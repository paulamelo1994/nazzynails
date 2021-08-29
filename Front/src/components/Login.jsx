import React from 'react'
import '../assets/css/Login.css'
import logo from '../assets/icons/logo.png'
const Login = () => {

    return <form className="form__login text-center p-4">
        <img className="mw-50 m-0 mx-auto" src={logo} alt="Logo nazzynails" />
        <h2>Ingresar</h2>
        <div className="form-group">
            <input className="form-control p-3 mb-4" type="text" placeholder="Username o número telefónico" />
            <input className="form-control p-3" type="password" placeholder="Contraseña"/>
        </div>
        <div className="form-check login__check">
            <input className="form-check-input check-lg" type="checkbox" id="session" defaultChecked={true}/>
            <label className="form-check-label" htmlFor="session">Mantener mi sesión iniciada</label>
        </div>
        <button className="login__btn w-100" type="submit">Entrar</button>
    </form>
}

export default Login