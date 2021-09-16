import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import App from './components/App';
import { AppProvider } from './AppContext';
import { BrowserRouter as Router } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie'
import 'bootstrap/dist/css/bootstrap.css';


ReactDOM.render(
  <Router basename={process.env.PUBLIC_URL}>
    <CookiesProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </CookiesProvider>
  </Router>,
  document.getElementById('root')
);
