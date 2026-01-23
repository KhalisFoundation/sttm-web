import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useParams } from 'react-router-dom';
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

// Wrapper component to provide v5-style props to route components
function RouteWrapper({ render }) {
  const location = useLocation();
  const params = useParams();
  const props = {
    location,
    match: { params },
  };
  return render(props);
}

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
          <Routes>
            {routes.map(({ path, exact, render }, key) => {
              const paths = Array.isArray(path) ? path : [path];
              return paths.map((p, idx) => (
                <Route
                  key={`${key}-${idx}`}
                  path={p}
                  element={<RouteWrapper render={render} />}
                />
              ));
            })}
            <Route path="*" element={<NotFound />} />
          </Routes>
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
