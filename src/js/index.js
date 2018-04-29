import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './features/store';
import Root from './Root';

render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('app-root')
);

/* eslint-disable no-console */
// Service Worker Registeration
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('service-worker.js', { scope: './' })
    .then(reg => console.log('Registration succeeded. Scope is ' + reg.scope))
    .catch(console.error);
}
