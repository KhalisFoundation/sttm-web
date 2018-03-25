import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import routes, { NotFound } from './routes';
import GenericError, { BalpreetSingh } from './components/GenericError';
import { TEXTS } from './constants';

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
    return this.state.error ? (
      <GenericError
        title={TEXTS.GENERIC_ERROR}
        description={TEXTS.GENERIC_ERROR_DESCRIPTION}
        image={BalpreetSingh}
      />
    ) : (
      <Router>
        <Switch>
          {routes.map((props, key) => <Route key={key} {...props} />)}
          <Route render={() => <NotFound />} />
        </Switch>
      </Router>
    );
  }
}
