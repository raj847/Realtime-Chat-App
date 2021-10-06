import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Auth0Provider} from '@auth0/auth0-react'

console.log("redirekuri",process.env.REACT_APP_BASE_URL);
console.log("lainlain",process.env.REACT_APP_AUTH0_CLIENTID );
console.log("loanloan",process.env.REACT_APP_AUTH0_DOMAIN );

const clientId=process.env.REACT_APP_AUTH0_CLIENTID
console.log("client",clientId);

ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    clientId={process.env.REACT_APP_AUTH0_CLIENTID}
    // redirectUri="http://localhost:3000"
    redirectUri={process.env.REACT_APP_BASE_URL}
    scope="read:current_user update:current_user_metadata"
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
