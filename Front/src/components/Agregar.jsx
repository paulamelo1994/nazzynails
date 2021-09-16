import { Link } from 'react-router-dom' 
import '../assets/css/Agregar.css'

const Agregar = ({ icon, link, style }) => {
    return <Link className="display-2 agregar" to={link} style={style}>
    <i className={icon || "bi bi-plus-circle-fill"}></i>
    </Link> 
}

export {Agregar}