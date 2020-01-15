/* globals SYNC_API_URL */
import React from 'react';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { TEXTS } from '../../constants';
import { pageView } from '../../util/analytics';
import BreadCrumb from '@/components/Breadcrumb';
import SearchInput from './search-input';
import SlideControls from './slide-controls';
import ControllerSearch from './search';

export default class WebControllerPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      connected: false,
      namespaceString: '',
      socket: null,
      controllerPin: 0,
      searchData: {},
    };
  }

  _socket = null;

  _alertOnExit = e => {
    if (this.state.connected) {
      return (e.returnValue = TEXTS.SYNC_DISCONNECT);
    }
    return null;
  };

  handleSearch = data => {
    this.setState({ searchData: data });
  }

  handleSubmit = (code, pin) => {
    fetch(`${SYNC_API_URL}sync/join/${code}`)
      .then(r => r.json())
      .then(({ data, error }) => {
        if (error || data === undefined) {
          this.setState({ error, data, connected: false });
        } else {
          const { namespaceString } = data;

          if (window.io !== undefined) {
            this._socket = window.io(`${SYNC_API_URL}${namespaceString}`);

            this._socket.emit('data', {
              host: "sttm-web",
              type: "request-control",
              pin,
            });

            this._socket.on('close', () =>
              this.setState({
                connected: false,
                error: null,
                namespaceString: '',
                socket: null,
              })
            );

            this._socket.on('data', data => {
              console.log(data);
              if (data['type'] === 'response-control') {
                data['success'] ?
                  this.setState({
                    connected: true,
                    namespaceString,
                    controllerPin: parseInt(pin),
                    socket: this._socket
                  }) :
                  this.setState({
                    connected: false,
                    error: true,
                  });
              }
            });
          }
        }
      })
      .catch(error => this.setState({ error, data: null, connected: false }));
  };

  render() {
    const { socket, controllerPin, connected, searchData } = this.state;
    const { query, type, source, offset } = searchData;

    return (
      <div className="row controller-row" id="content-root">
        <BreadCrumb links={[{ title: TEXTS.CONTROLLER }]} />
        <div className="wrapper">
          {connected ? (
            <React.Fragment>
              <SearchInput onSearch={this.handleSearch} />
              <SlideControls
                socket={socket}
                controllerPin={controllerPin} />
              {query && (
                <ControllerSearch
                  q={query}
                  type={type}
                  source={source}
                  offset={offset}
                  socket={socket}
                  controllerPin={controllerPin}
                />
              )}
            </React.Fragment>
          ) : (
              <React.Fragment>
                <form
                  className="sync-form"
                  onSubmit={e => {
                    e.preventDefault();
                    this.handleSubmit(e.target.code.value.toUpperCase(), e.target.syncPassword.value, e);
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
                  <input
                    id="syncPassword"
                    className="sync-form--input"
                    name="syncPassword"
                    type="password"
                    placeholder="Enter the controller password"
                  />
                  <button className="sync-form--button">Connect to Desktop</button>
                </form>
              </React.Fragment>
            )}
        </div>
      </div >
    )
  }

  componentDidMount() {
    pageView('/control');
    this._mounted = true;
    const src = `${SYNC_API_URL}socket.io/socket.io.js`;
    if (document.querySelector(`script[src="${src}"]`) === null) {
      const script = document.createElement('script');
      script.src = src;
      document.body.appendChild(script);
    }

    window.addEventListener('beforeunload', this._alertOnExit);
  }
}
