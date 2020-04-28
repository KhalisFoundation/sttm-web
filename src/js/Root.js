import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import routes, { NotFound } from './routes';
import {
  getBooleanFromLocalStorage,
  showToast,
  saveToLocalStorage,
} from './util';
import { LOCAL_STORAGE_KEY_FOR_GDPR_NOTICE, TEXTS } from './constants';
import { GlobalHotKeys, configure } from 'react-hotkeys';
import { GlobalHandlers, GlobalShortcuts } from './Shortcuts';

export default class Root extends React.PureComponent {
  constructor() {
    super();

    configure({
      logLevel: 'debug',
    })
  }
  render() {
    return (
      <Router>
        <GlobalHotKeys keyMap={GlobalShortcuts} handlers={GlobalHandlers}>
        <Switch>
          {routes.map((props, key) => (
            <Route key={key} {...props} />
          ))}
          <Route render={() => <NotFound />} />
        </Switch>
        </GlobalHotKeys>
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
