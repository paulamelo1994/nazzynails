import React from 'react';
import { Switch, Route, useLocation, useHistory, Redirect } from 'react-router-dom'
import '../assets/css/App.css';
import logo from '../assets/icons/nazza-logo.png'
import { AppContext } from '../AppContext'
import { API } from '../ApiProvider';
import { formClient } from '../InputCliente';
import { formServicio } from '../InputServicio';

import { Login } from './Login'
import { Navbar } from './Navbar';
import { Citas } from './Citas';
import { ButtonAction } from './ButtonAction';
import { Form } from './Form';
import { ClienteList } from './ClienteList';
import { Toast } from './Toast';

const App = () => {
  const { CLIENTS, CLIENTS_NEW } = API
  const location = useLocation()
  const history = useHistory()
  const { token, toast } = React.useContext(AppContext)
  const loginPath = location.pathname === '/login'
  const labels = {
    '/': 'Mis Citas',
    '/reportes': 'Mis Reportes',
    '/clientes': 'Mis Clientes',
    '/clientes/form': 'Cliente',
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
    <div className="container" style={{margin: 'auto', display: 'flex',justifyContent: 'center'}}>
      {toast.message && <Toast />}
      <Switch>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/'>
          <Citas />
        </Route>
        <Route exact path='/clientes'>
          <ClienteList />
          <ButtonAction link='/clientes/form' 
          style={{
            position: 'fixed', 
            bottom: '20%',
            right: '10%',
            fontSize: '60px',
            background: '#fff'
          }} />
        </Route>
        <Route exact path='/clientes/form'>
          <Form
          title="Cliente"
          history={history} 
          form={formClient}
          pathNew={CLIENTS_NEW}
          pathUpdate={CLIENTS}/>
        </Route>
        <Route exact path='/servicios'>
          <ButtonAction link='/servicios/form' 
          style={{
            position: 'fixed', 
            bottom: '20%',
            right: '10%',
            fontSize: '60px',
            background: '#fff'
          }} />
        </Route>
        <Route exact path='/servicios/form'>
          <Form
          title="Servicio"
          history={history} 
          form={formServicio}
          pathNew={CLIENTS_NEW}
          pathUpdate={CLIENTS}/>
        </Route>
      </Switch>
    </div>
    { !token && <Redirect to="/login" />}
  </div>
}

export default App;
