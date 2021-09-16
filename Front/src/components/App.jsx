import React from 'react';
import { Switch, Route, useLocation, useHistory, Redirect } from 'react-router-dom'
import '../assets/css/App.css';
import logo from '../assets/icons/nazza-logo.png'
import { AppContext } from '../AppContext'

import {Login} from './Login'
import {Navbar} from './Navbar';
import {Citas} from './Citas';
import {Agregar} from './Agregar';
import { FormCliente } from './FormCliente';
import { ClienteList } from './ClienteList';

const App = () => {
  const location = useLocation()
  const history = useHistory()
  const { token } = React.useContext(AppContext)
  const loginPath = location.pathname === '/login'
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
  
  return <div className="App" style={{ 
    background: loginPath && 'var(--main-color)',
    paddingBottom: !loginPath && '35%'
  }}>
    {!loginPath && <Header />}
    {!loginPath && <Navbar />}
    <div className="container">
      <Switch>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/'>
          <Citas />
        </Route>
        <Route exact path='/clientes'>
          <ClienteList />
          <Agregar link='/clientes/nuevo' 
          style={{
            position: 'fixed', 
            bottom: '20%',
            right: '10%',
            fontSize: '60px',
            background: '#fff'
          }} />
        </Route>
        <Route exact path='/clientes/nuevo'>
          <FormCliente history={history}/>
        </Route>
      </Switch>
    </div>
    { !token && <Redirect to="/login" />}
  </div>
}

export default App;
