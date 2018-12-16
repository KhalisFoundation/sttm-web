import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import routes, { NotFound } from './routes';

export default class Root extends React.PureComponent {
  render() {
    return (
      <Router>
        <Switch>
          {routes.map((props, key) => (
            <Route key={key} {...props} />
          ))}
          <Route render={() => <NotFound />} />
        </Switch>
      </Router>
    );
  }
}
