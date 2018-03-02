import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './features/store';
import Root from './Root';

render(
  <Provider store={store}>
    <Root />
  </Provider>
  , document.getElementById('app-root')
);
