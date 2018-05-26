import React from 'react';
import { TEXTS } from '../../constants';
import Viewer from './Viewer';

// TODO: Move to constants/webpackDefine
const SYNC_API_URL = 'http://localhost:1337';

/**
 *
 *
 * @export
 * @class Sync
 * @augments {React.PureComponent<SyncProps, SyncState>}
 */
export default class Sync extends React.PureComponent {
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
  state = {
    connected: false,
    namespaceString: '',
    error: null,
    data: {},
  };

  /**
   * Mount Safe setState
   *
   * @memberof Sync
   */
  _setState = (...args) => this._mounted && this.setState(...args);

  _socket = null;
  _mounted = false;

  render() {
    return (
      <div className="row" id="content-root">
        <h2>Sync</h2>
        {this.state.connected ? (
          <Viewer {...this.state} />
        ) : (
          <Sync.Form onSubmit={this.handleSubmit} />
        )}
      </div>
    );
  }

  componentDidMount() {
    this._mounted = true;
    const src = `${SYNC_API_URL}/socket.io/socket.io.js`;
    if (document.querySelector(`script[src="${src}"]`) === null) {
      const script = document.createElement('script');
      script.src = src;
      document.body.appendChild(script);
    }
  }

  componentWillUnmount() {
    this._mounted = false;
    if (this.state.connected && this._socket) {
      this._socket.disconnect();
    }
  }

  /**
   * Functional Form Component
   *
   * @static
   * @memberof Sync
   */
  static Form = ({ onSubmit }) => (
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
   * Handle Submit
   * @param {string} code
   * @memberof ItemList
   */
  handleSubmit = code => {
    fetch(`${SYNC_API_URL}/sync/join/${code}`)
      .then(r => r.json())
      .then(({ data, error }) => {
        if (error) {
          this._setState({ error, data, connected: false });
        } else {
          const { namespaceString } = data;
          this._setState({ connected: true, namespaceString });

          if (window.io !== undefined) {
            this._socket = window.io(`${SYNC_API_URL}/${namespaceString}`);

            this._socket.on('data', data => this._setState({ data }));

            this._socket.on('close', () =>
              this._setState({
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
      });
  };
}
