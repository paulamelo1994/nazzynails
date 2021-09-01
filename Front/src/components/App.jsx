import { Switch, Route, useLocation } from 'react-router-dom'
import '../assets/css/App.css';

import Login from './Login'
import Navbar from './Navbar';

const App = () => {
  const location = useLocation()
  const loginPath = location.pathname !== '/login'
  
  return <div className="App" style={{background: !loginPath && 'var(--main-color'}}>
      { loginPath && <Navbar/>}
      <Switch>
        <Route exact path='/login'>
          <Login />
        </Route>
      </Switch>
    </div>
}

export default App;
