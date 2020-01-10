/* globals SYNC_API_URL */
import React from 'react';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { TEXTS } from '../../constants';
import { pageView } from '../../util/analytics';
import BreadCrumb from '@/components/Breadcrumb';
import SearchInput from './search-input';

export default class WebControllerPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      connected: false,
      accessGranted: false,
      namespaceString: '',
    };
  }

  _socket = null;
  _mounted = false;

  _alertOnExit = e => {
    if (this.state.connected) {
      return (e.returnValue = TEXTS.SYNC_DISCONNECT);
    }
    return null;
  };

  handleSubmit = (code, pin) => {
    fetch(`${SYNC_API_URL}sync/join/${code}`)
      .then(r => r.json())
      .then(({ data, error }) => {
        if (error || data === undefined) {
          this.setState({ error, data, connected: false });
        } else {
          const { namespaceString } = data;
          this.setState({ connected: true, namespaceString });

          if (window.io !== undefined) {
            this._socket = window.io(`${SYNC_API_URL}${namespaceString}`);

            this._socket.on('close', () =>
              this.setState({
                connected: false,
                data: {},
                error: null,
                namespaceString: '',
              })
            );

            this._socket.on('data', data => {
              console.log(data);
            });

            this._socket.on('xyz', data => {
              console.log(data);
            });

            console.log(this._socket);

            setInterval(() => {
              this._socket.emit('xyz', {
                abc: "123",
                pin,
              });
            }, 5000);

            setInterval(() => {
              this._socket.emit('data', {
                abc: "123"
              });
            }, 5000);
          }
        }
      })
      .catch(error => this.setState({ error, data: null, connected: false }));
  };

  render() {
    return (
      <div className="row controller-row" id="content-root">
        <BreadCrumb links={[{ title: TEXTS.CONTROLLER }]} />
        <div className="wrapper">
          {this.state.connected ? (
            <SearchInput />
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
                  <button className="sync-form--button">Submit</button>
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