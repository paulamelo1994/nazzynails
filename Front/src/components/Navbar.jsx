import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../assets/css/Navbar.css'

const Navbar = () => {
    const location = useLocation()
    const Icon = (propsIcon) => (
        <li className={`nav-item ${location.pathname === propsIcon.link && 'icon__active'}`}>
            <Link to={propsIcon.link} className="nav-link d-flex flex-column" style={{ color: 'var(--main-color)' }}>
                <i className={propsIcon.className}></i>
                <span>{propsIcon.name}</span>
            </Link>
        </li>
    )

    return <nav id="menu" className="navbar w-100">
        <ul className="navbar-nav mr-auto mt-lg-0 flex-row justify-content-around  w-100">
            <Icon className="bi bi-calendar-week" link="/" name="Citas"/>
            <Icon className="bi bi-file-earmark-text" link="/reportes" name="Reportes"/>
            <Icon className="bi bi-people-fill" link="/clientes" name="Clientes"/>
            <Icon className="bi bi-list-stars" link="/servicios" name="Servicios"/>
        </ul>
    </nav>
}

export {Navbar}