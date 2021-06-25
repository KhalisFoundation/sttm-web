/* globals SYNC_API_URL */
import React from 'react';
import PropTypes from 'prop-types';
import { TEXTS, LOCAL_STORAGE_KEY_FOR_SYNC_CODE } from '../../constants';
import Viewer from './Viewer';
import BreadCrumb from '../../components/Breadcrumb';
import { saveToLocalStorage, getStringFromLocalStorage } from '@/util'
import { connect } from 'react-redux';
import { setFullScreenMode } from '../../features/actions';
/**
 *
 *
 * @export
 * @class Sync
 * @augments {React.PureComponent<SyncProps, SyncState>}
 */
class Sync extends React.PureComponent {
  /**
   * @typedef {object} SyncProps
   */
  static propTypes = {
    fullScreenMode: PropTypes.bool.isRequired,
    setFullScreenMode: PropTypes.func.isRequired,
  }

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
    const { connected, error } = this.state;
    const { fullScreenMode } = this.props;
    return (
      <div className="row" id="content-root">
        <BreadCrumb links={[{ title: TEXTS.SYNC }]} />
        <div className="wrapper">
          {connected ? (
            <div className='sync-viewer'>
              <div className='sync-controls'>
                <div className='sync-id'>
                  <p>Sync Mode</p>
                  <p className='sync-id'>{this.state.namespaceString}</p>
                </div>
                {<div className='full-screen'>
                  <span>Full screen</span>
                  <input type='checkbox'
                    id='fullscreen-control'
                    className="toggle-checkbox"
                    checked={fullScreenMode}
                    onChange={this.fullScreenView} />
                  <label className="toggle-label" htmlFor='fullscreen-control'></label>
                </div>}
                <div className='exit-button'>
                  <button onClick={this.stopSync}>Exit</button>
                </div>
              </div>
              <Viewer showFullScreen={fullScreenMode} {...this.state} />
            </div>
          ) : (
              <Sync.Form onSubmit={this.handleSubmit} error={error} getCode={this.getPrevCode} />
            )}
        </div>
      </div>
    );
  }

  fullScreenView = (event) => {
    const {setFullScreenMode} = this.props;
    setFullScreenMode(event.currentTarget.checked)
  }

  stopSync = () => {
    const {setFullScreenMode} = this.props;
    this.setState({ connected: false });
    setFullScreenMode(false)
  }

  componentDidMount() {
    this._mounted = true;
    const src = `${SYNC_API_URL}socket.io/socket.io.js`;
    if (document.querySelector(`script[src="${src}"]`) === null) {
      const script = document.createElement('script');
      script.src = src;
      document.body.appendChild(script);
    }

    window.addEventListener('beforeunload', this._alertOnExit);
  }

  _alertOnExit = e => {
    if (this.state.connected) {
      return (e.returnValue = TEXTS.SYNC_DISCONNECT);
    }
    return null;
  };

  componentWillUnmount() {
    this._mounted = false;
    if (this.state.connected && this._socket) {
      // this._socket.disconnect();
    }
    window.removeEventListener('beforeunload', this._alertOnExit);
  }

  getPrevCode = () => getStringFromLocalStorage(LOCAL_STORAGE_KEY_FOR_SYNC_CODE);

  /**
   * Functional Form Component
   *
   * @static
   * @memberof Sync
   */
  static Form = ({ onSubmit, error, getCode }) => (
    <React.Fragment>
      <h1>{TEXTS.SYNC_TITLE}</h1>
      <p>{TEXTS.SYNC_DESCRIPTION}</p>
      {error && <h5 className="sync-form-error">{TEXTS.SYNC_ERROR}</h5>}
      <form
        className="sync-form"
        onSubmit={e => {
          e.preventDefault();
          onSubmit(e.target.code.value.toUpperCase(), e);
        }}
      >
        <input
          id="code"
          className="sync-form--input"
          name="code"
          type="text"
          placeholder="Enter code. Eg. ABC-XYZ"
          pattern="[A-Z,a-z]{3}-[A-Z,a-z]{3}"
          onKeyUp={e => {
            const typedValue = e.currentTarget.value;
            const typedChar = e.key;
            const parsedValue = typedValue.match('^[A-Z,a-z]{3}');
            const d = parsedValue ? parsedValue[0] === typedValue : false;
            if (d && typedChar !== 'Backspace') {
              e.currentTarget.value = typedValue + '-';
            }
          }}
        />
        <button className="sync-form--button">Connect</button>
      </form>
      {getCode() ? (
        <button className="reconnect-btn hollow button secondary"
          onClick={() => { onSubmit(getCode()) }}>Reconnect to {getCode()}</button>
      ) : ''}

    </React.Fragment>
  );

  /**
   * Handle Submit
   * @param {string} code
   * @memberof ItemList
   */
  handleSubmit = code => {
    fetch(`${SYNC_API_URL}sync/join/${code}`)
      .then(r => r.json())
      .then(({ data, error }) => {
        if (error || data === undefined) {
          this._setState({ error, data, connected: false });
        } else {
          const { namespaceString } = data;
          this._setState({ connected: true, namespaceString });

          /*showToast(
            TEXTS.SYNC_NOTIFICATION(code),
            Infinity,
            'toast-notification-green'
          );*/

          saveToLocalStorage(LOCAL_STORAGE_KEY_FOR_SYNC_CODE, code);

          if (window.io !== undefined) {
            this._socket = window.io(`${SYNC_API_URL}${namespaceString}`);

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
      })
      .catch(error => this._setState({ error, data: null, connected: false }));
  };
}

const mapStateToProps =({fullScreenMode}) => ({fullScreenMode})

const mapDispatchToProps = {
  setFullScreenMode
}

export default connect(mapStateToProps, mapDispatchToProps)(Sync);