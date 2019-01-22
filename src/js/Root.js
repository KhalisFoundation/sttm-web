import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import routes, { NotFound } from './routes';
import {
  getBooleanFromLocalStorage,
  showToast,
  saveToLocalStorage,
} from './util';
import { LOCAL_STORAGE_KEY_FOR_GDPR_NOTICE, TEXTS } from './constants';

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

  componentDidMount() {
    const $a = document.querySelector('footer .version a');
    if ($a) {
      $a.innerHTML = `v${process.env.npm_package_version}`;
    }
    
    const hasNotAcknolwedged =
      getBooleanFromLocalStorage(LOCAL_STORAGE_KEY_FOR_GDPR_NOTICE, false) ===
      false;

    if (hasNotAcknolwedged) {
      showToast(TEXTS.GDPR_NOTICE, Infinity).then(() => {
        saveToLocalStorage(LOCAL_STORAGE_KEY_FOR_GDPR_NOTICE, 'true');
      });
    }
  }
}
