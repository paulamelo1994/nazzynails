import { Link } from 'react-router-dom' 
import '../assets/css/Agregar.css'

const Agregar = ({ link }) => {
    return <Link className="display-2 agregar" to={link}>
    <i className="bi bi-plus-circle-fill"></i>
    </Link> 
}

export {Agregar}