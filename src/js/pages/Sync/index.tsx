/* globals SYNC_API_URL */
import React from 'react';
import { TEXTS } from '@/constants';
import Viewer from './Viewer';
import { showToast } from '@/util';
import BreadCrumb from '@/components/Breadcrumb/Breadcrumb';

/**
 *
 *
 * @export
 * @class Sync
 * @augments {React.PureComponent<SyncProps, SyncState>}
 */
export default class Sync extends React.PureComponent {
  /**
   * Functional Form Component
   *
   * @static
   * @memberof Sync
   */
  public static Form = ({ onSubmit }) => (
    <React.Fragment>
      <p>{TEXTS.SYNC_DESCRIPTION}</p>
      <form
        className="sync-form"
        onSubmit={e => {
          e.preventDefault();
          onSubmit(e.target.code.value, e);
        }}
      >
        <input
          id="code"
          className="sync-form--input"
          name="code"
          type="text"
          placeholder="Enter code. Eg. ABC-XYZ"
        />
        <button className="sync-form--button">Connect</button>
      </form>
    </React.Fragment>
  );
  /**
   * @typedef {object} SyncProps
   */

  /**
   * @typedef {object} SyncState
   * @property {boolean} connected
   * @property {string} namespaceString
   * @property {any} error
   * @property {any} data
   *
   * @memberof Sync
   */
  public state = {
    connected: false,
    namespaceString: '',
    error: null,
    data: {},
  };

  private socket = null;
  private mounted = false;

  /**
   * Mount Safe setState
   *
   * @memberof Sync
   */
  private safelySetState = (...args) => this.mounted && this.setState(...args);

  private alertOnExit = e => {
    if (this.state.connected) {
      return (e.returnValue = TEXTS.SYNC_DISCONNECT);
    }
    return null;
  };

  public render() {
    const { connected, error } = this.state;
    return (
      <div className="row" id="content-root">
        <BreadCrumb links={[{ title: TEXTS.SYNC }]} />
        <div className="wrapper">
          {connected ? (
            <Viewer {...this.state} />
          ) : (
            <Sync.Form onSubmit={this.handleSubmit} error={error} />
          )}
        </div>
      </div>
    );
  }

  public componentDidMount() {
    this.mounted = true;
    const src = `${SYNC_API_URL}socket.io/socket.io.js`;
    if (document.querySelector(`script[src="${src}"]`) === null) {
      const script = document.createElement('script');
      script.src = src;
      document.body.appendChild(script);
    }

    window.addEventListener('beforeunload', this.alertOnExit);
  }

  public componentWillUnmount() {
    this.mounted = false;
    if (this.state.connected && this.socket) {
      this.socket.disconnect();
    }
    window.removeEventListener('beforeunload', this.alertOnExit);
  }

  /**
   * Functional Form Component
   *
   * @static
   * @memberof Sync
   */
  public static Form = ({ onSubmit, error }) => (
    <React.Fragment>
      <p>{TEXTS.SYNC_DESCRIPTION}</p>
      {error && <h5 className="sync-form-error">{TEXTS.SYNC_ERROR}</h5>}
      <form
        className="sync-form"
        onSubmit={e => {
          e.preventDefault();
          onSubmit(e.target.code.value, e);
        }}
      >
        <input
          id="code"
          className="sync-form--input"
          name="code"
          type="text"
          placeholder="Enter code. Eg. ABC-XYZ"
        />
        <button className="sync-form--button">Connect</button>
      </form>
    </React.Fragment>
  );

  /**
   * Handle Submit
   * @param {string} code
   * @memberof ItemList
   */
  public handleSubmit = code => {
    fetch(`${SYNC_API_URL}sync/join/${code}`)
      .then(r => r.json())
      .then(({ data, error }) => {
        if (error || data === undefined) {
          this.safelySetState({ error, data, connected: false });
        } else {
          const { namespaceString } = data;
          this.safelySetState({ connected: true, namespaceString });

          showToast(
            TEXTS.SYNC_NOTIFICATION(code),
            Infinity,
            'toast-notification-green'
          );

          if (window.io !== undefined) {
            this.socket = window.io(`${SYNC_API_URL}${namespaceString}`);

            this.socket.on('data', dataFromSocket =>
              this.safelySetState({ data: dataFromSocket })
            );

            this.socket.on('close', () =>
              this.safelySetState({
                connected: false,
                data: {},
                error: null,
                namespaceString: '',
              })
            );
          } else {
            // TODO: idk how to wait for io to come on window, setInterval? eww.
          }
        }
      })
      .catch(error =>
        this.safelySetState({ error, data: null, connected: false })
      );
  };
}
