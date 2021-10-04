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
import { ServiceList } from './ServiceList';
import { Toast } from './Toast';
import { formCita } from '../inputCita';
import Reportes from './Reportes';

const App = () => {
  const { CLIENTS, CLIENTS_NEW, SERVICES, SERVICES_NEW, APPOINTMENTS, APPOINTMENTS_NEW } = API
  const location = useLocation()
  const history = useHistory()
  const { token, toast } = React.useContext(AppContext)
  const loginPath = location.pathname === '/login'
  const labels = {
    '/': 'Mis Citas',
    '/citas/form':'Nueva Cita',
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
    {toast.message && <Toast />}
    {!loginPath && <Header />}
    {!loginPath && <Navbar />}
    <div className="container" >
      <Switch>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/'>
          <Citas />
          <ButtonAction link='/citas/form' 
          style={{
            position: 'fixed', 
            bottom: '20%',
            right: '10%',
            fontSize: '60px',
            background: '#fff'
          }} />
        </Route>
        <Route exact path='/citas/form'>
          <Form
          title="Cita"
          history={history} 
          form={formCita}
          pathNew={APPOINTMENTS_NEW}
          pathUpdate={APPOINTMENTS}/>
        </Route>
        <Route exact path='/reportes'>
          <Reportes />
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
          <ServiceList />
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
          pathNew={SERVICES_NEW}
          pathUpdate={SERVICES}/>
        </Route>
      </Switch>
    </div>
    { !token && <Redirect to="/login" />}
  </div>
}

export default App;
