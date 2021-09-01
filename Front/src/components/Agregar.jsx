import { Link } from 'react-router-dom' 
import '../assets/css/Agregar.css'
const Agregar = (props) => {
    return <Link className="display-1 agregar" to={props.link}>
    <i className="bi bi-plus-circle-fill"></i>
    </Link> 
}

export default Agregar