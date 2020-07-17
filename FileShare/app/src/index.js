import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './layout'
import * as serviceWorker from './serviceWorker';
import './css/app.css'

ReactDOM.render(
  <React.StrictMode>
    <Layout />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
