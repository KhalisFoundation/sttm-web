import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { GlobalHotKeys, configure } from 'react-hotkeys';
import { Notifier } from '@/components/Notifier';
import routes, { NotFound } from './routes';
import { LOCAL_STORAGE_KEY_FOR_GDPR_NOTICE, TEXTS } from './constants';
import { GlobalHandlers, GlobalShortcuts } from './Shortcuts';
import {
  getBooleanFromLocalStorage,
  showToast,
  saveToLocalStorage,
} from './util';

export default class Root extends React.PureComponent {
  constructor() {
    super();

    configure({
      // logLevel: 'debug',
      defaultKeyEvent: 'keydown',
      defaultComponent: 'div',
      ignoreTags: ['input', 'dialog', 'textarea'],
      defaultTabIndex: -1
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
          <Notifier />
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
