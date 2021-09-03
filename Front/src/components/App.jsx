import { Switch, Route, useLocation } from 'react-router-dom'
import '../assets/css/App.css';
import logo from '../assets/icons/nazza-logo.png'

import Login from './Login'
import Navbar from './Navbar';
import Citas from './Citas';

const App = () => {
  const location = useLocation()
  const loginPath = location.pathname !== '/login'

  const labels = {
    '': 'Mis Citas',
    'reportes': 'Mis Reportes',
    'clientes': 'Mis Clientes',
    'servicios': 'Mis Servicios',
  }
  const Header = () => (
    <header className="header" href="#">
      <img src={logo} alt="logo header" width="80px" />
      <h2 className="display-6">{labels[location.pathname.substring(1)]}</h2>
    </header>
  )

  return <div className="App" style={{ background: !loginPath && 'var(--main-color' }}>
    {loginPath && <Header />}
    {loginPath && <Navbar />}

    <Switch>
      <Route exact path='/login'>
        <Login />
      </Route>
      <Route exact path='/'><Citas /></Route>
    </Switch>
  </div>
}

export default App;
