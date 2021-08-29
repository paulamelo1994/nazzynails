import '../assets/css/App.css';
import { Switch, Route } from 'react-router-dom'

import Login from './Login'

const App = () => (
    <div className="App">
      <Switch>
        <Route exact path='/login'>
          <Login />
        </Route>
      </Switch>
    </div>
  )

export default App;
