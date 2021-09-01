import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/css/Navbar.css'
import icon from '../assets/icons/logo.png'
const Navbar = () => {
    const Icon = (name, img, link) => (
        <Link to={link} className="nav-link" style={{color: 'var(--main-color)'}}>
            <img src={img} alt={`${name} - icono`} />
            <span>{name}</span>
        </Link>
    )

    const icons = [
        Icon('Citas', icon, '/'),
        Icon('Reportes', icon, '/'),
        Icon('Clientes', icon, '/'),
        Icon('Servicios', icon, '/login'),
    ]
    return <nav id="menu" className="navbar w-100">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0 flex-row justify-content-around  w-100">
            {icons.map((i, key) => <li key={key} className="nav-item">
                {i}
                </li>                
            )}
        </ul>
    </nav>
}

export default Navbar