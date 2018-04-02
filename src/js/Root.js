import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import routes, { NotFound } from './routes';
import Layout from './components/Layout';
import GenericError, { BalpreetSingh } from './components/GenericError';
import { ACTIONS, errorEvent } from './util/analytics';
import { TEXTS } from './constants';

export default class Root extends React.PureComponent {
  state = {
    error: null,
  };

  componentDidCatch(error) {
    this.setState({ error });
    errorEvent({
      action: ACTIONS.GENERIC_ERROR,
      label: JSON.stringify(error),
    });
    // eslint-disable-next-line no-console
    console.error({ error });
  }

  render() {
    return (
      <Router>
        {this.state.error ? (
          <Layout>
            <GenericError
              title={TEXTS.GENERIC_ERROR}
              description={TEXTS.GENERIC_ERROR_DESCRIPTION}
              image={BalpreetSingh}
            />
          </Layout>
        ) : (
          <Switch>
            {routes.map((props, key) => <Route key={key} {...props} />)}
            <Route render={() => <NotFound />} />
          </Switch>
        )}
      </Router>
    );
  }
}
