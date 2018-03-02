import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from './routes';
import NotFound from './pages/NotFound';

export default class Root extends React.PureComponent {
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
        : (
          <Router>
            <Switch>
              {routes.map((props, key) => <Route key={key} {...props} />)}
              <Route render={NotFound} />
            </Switch>
          </Router>
        )
    );
  }
}

