import { Switch, Route, useLocation, useHistory } from 'react-router-dom'
import '../assets/css/App.css';
import logo from '../assets/icons/nazza-logo.png'

import Login from './Login'
import Navbar from './Navbar';
import Citas from './Citas';
import Form from './Form';
import Agregar from './Agregar';

const App = () => {
  const location = useLocation()
  const history = useHistory()
  const loginPath = location.pathname !== '/login'
  const labels = {
    '/': 'Mis Citas',
    '/reportes': 'Mis Reportes',
    '/clientes': 'Mis Clientes',
    '/clientes/nuevo': 'Cliente',
    '/servicios': 'Mis Servicios'
  }
  const Header = () => (
    <header className="header" href="#">
      <img src={logo} alt="logo header" width="80px" />
      <h2 className="display-6">{labels[location.pathname]}</h2>
    </header>
  )

  return <div className="App" style={{ background: !loginPath && 'var(--main-color' }}>
    {loginPath && <Header />}
    {loginPath && <Navbar />}
    <Switch>
      <Route exact path='/login'>
        <Login />
      </Route>
      <Route exact path='/'>
        <Citas />
      </Route>
      <Route exact path='/clientes'>
        <Agregar link='/clientes/nuevo' />
      </Route>
      <Route exact path='/clientes/nuevo'>
        <Form form={[
          { name: 'nombre', placeholder: 'Nombre', type: 'text' },
          { name: 'direccion', placeholder: 'Direccion', type: 'text' },
          { name: 'correo', placeholder: 'Correo', type: 'email' },
          { name: 'telefono', placeholder: 'Teléfono', type: 'number' },
        ]}
          goBack={history.goBack} />
      </Route>
    </Switch>
  </div>
}

export default App;
