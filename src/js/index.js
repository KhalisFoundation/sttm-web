import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { CookiesProvider } from 'react-cookie';

import 'regenerator-runtime/runtime';
import store from './features/store';
import Root from './Root';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

render(
  <>
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <Provider store={store}>
          <Root />
        </Provider>
      </CookiesProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </>,
  document.getElementById('app-root')
);
