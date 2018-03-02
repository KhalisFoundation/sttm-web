import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import router from './router';
import store from './features/store';


if (PRODUCTION) {
  console.log('Production');
} else {
  console.log('Development');
}

class Root extends React.PureComponent {
  state = {
    error: null,
  };

  componentDidCatch(error) {
    this.setState({ error });
    // eslint-disable-next-line no-console
    console.error({ error });
  }

  render() {
    return (
      this.state.error
        ? (
          <main style={{ marginTop: '10vh' }}>
            <h2>
              <h3 className='text-center'>Facing some issues</h3>
            </h2>
            <pre style={{ margin: '10%', textAlign: 'left' }}>
              <code>
                {JSON.stringify(this.state.error, null, 2)}
              </code>
            </pre>
          </main>
        )
        : router()
    );
  }
}

render(
  <Provider store={store}>
    <Root />
  </Provider>
  , document.getElementById('app-root')
);
