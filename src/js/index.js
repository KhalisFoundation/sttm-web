import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query'

import 'regenerator-runtime/runtime';
import store from './features/store';
import Root from './Root';

 const queryClient = new QueryClient()

render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <Root />
    </Provider>
  </QueryClientProvider>,
  document.getElementById('app-root')
);
