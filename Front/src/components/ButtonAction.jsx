import { Link } from 'react-router-dom' 
import '../assets/css/ButtonAction.css'

const ButtonAction = ({ icon, link, style }) => {
    return <Link className="button_action" to={link} style={style}>
    <i className={icon || "bi bi-plus-circle-fill"}></i>
    </Link> 
}

export { ButtonAction }