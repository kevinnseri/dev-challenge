import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './app/components/App';
import store from './store';
import './scss/index.scss';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
