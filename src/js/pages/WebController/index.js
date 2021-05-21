/* globals SYNC_API_URL */
/* globals CEREMONIES_URL */
/* globals BANIS_API_URL */
import React from 'react';
import cx from 'classnames';

import { TEXTS } from '../../constants';
import { pageView } from '../../util/analytics';
import BreadCrumb from '@/components/Breadcrumb';
import SearchInput from './search-input';
import SlideControls from './slide-controls';
import ControllerSearch from './search';
import { Stub } from '../Search/Layout';
import ControllerShabad from '@/pages/WebController/shabad';
import { versesToGurbani } from '@/util';
import ShabadControls from '@/components/ShabadControls';

export default class WebControllerPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      connected: false,
      namespaceString: props.namespaceString ? props.namespaceString : '',
      socket: null,
      controllerPin: 0,
      searchData: null,
      shabadData: null,

      error: false,
      pinError: false,
      codeError: false,

      loading: false,
      desktopSettings: {},
    };
  }

  _socket = null;

  _alertOnExit = e => {
    if (this.state.connected) {
      return (e.returnValue = TEXTS.SYNC_DISCONNECT);
    }
    return null;
  };

  finishLoading = () => {
    this.setState({ loading: false });
  }

  handleSearch = data => {
    this.setState({ searchData: data, shabadData: null });
  }

  handleCeremony = (ceremonyID, highlight) => {
    this.setState({ loading: true, shabadData: null });
    fetch(`${CEREMONIES_URL}${ceremonyID}`)
      .then(r => r.json())
      .then((data) => {
        if (data) {
          this.finishLoading();
          const processedData = data;
          processedData.verses = versesToGurbani(data.verses, false, 'ceremony');
          processedData.type = 'ceremony';
          processedData.highlight = highlight || processedData.verses[0].verseId;
          processedData.homeId = processedData.verses[0].verseId;
          this.setState({ searchData: null, shabadData: processedData, loading: false });
        }
      }
      );
  }

  handleBani = (baniID, highlight, baniLength = 'extralong', mangalPosition = 'above') => {
    this.setState({ loading: true, shabadData: null });
    fetch(`${BANIS_API_URL}/${baniID}`)
      .then(r => r.json())
      .then((data) => {
        if (data) {
          const processedData = data;
          processedData.verses = versesToGurbani(data.verses, baniLength, mangalPosition);
          processedData.type = 'bani';
          processedData.highlight = highlight || processedData.verses[0].verseId;
          processedData.homeId = processedData.verses[0].verseId;
          this.setState({ searchData: null, shabadData: processedData, loading: false });
        }
      }
      );
  }

  updateSettings = (settings) => {
    this.state.socket.emit('data', {
      host: "sttm-web",
      pin: this.state.controllerPin,
      type: "settings",
      settings,
    });
  }

  handleSubmit = (code, pin) => {
    this.setState({ loading: true });
    fetch(`${SYNC_API_URL}sync/join/${code}`)
      .then(r => r.json())
      .then(({ data, error }) => {
        if (error || data === undefined) {
          this.setState({ error, codeError: true, pinError: false, data, connected: false },
            this.finishLoading);
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
                error: false,
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
                    socket: this._socket,
                    pinError: false,
                    codeError: false,
                    desktopSettings: data.settings || null
                  }, this.finishLoading) :
                  this.setState({
                    connected: false,
                    error: true,
                    pinError: true,
                    codeError: false,
                  }, this.finishLoading);
              } else if (!data.verseChange && data['host'] !== 'sttm-web') {
                data['type'] === 'shabad' &&
                  this.setState({ searchData: data, shabadData: null });
                data['type'] === 'ceremony' &&
                  this.handleCeremony(data.id, data.highlight);
                data['type'] === 'bani' &&
                  this.handleBani(data.id, data.highlight, data.baniLength, data.mangalPosition);
                data['type'] === 'settings' &&
                  this.setState({ desktopSettings: data.settings });
              }
            });
          }
        }
      })
      .catch(error => this.setState({
        error,
        pinError: false,
        codeError: false,
        data: null,
        connected: false
      }), this.finishLoading);
  };

  render() {
    const {
      socket,
      controllerPin,
      connected,
      desktopSettings,
      searchData,
      namespaceString,
      error,
      pinError,
      codeError,
      shabadData,
      loading,
    } = this.state;

    let errorMessage;

    if (error) {
      errorMessage = pinError && TEXTS.CONTROLLER_ERROR('pin') ||
        codeError && TEXTS.CONTROLLER_ERROR('code') ||
        TEXTS.CONTROLLER_ERROR();
    }

    if (loading && !connected) return (<Stub />);

    return (
      <div className="row controller-row" id="content-root">
        <BreadCrumb links={[{
          title: connected ?
            `${TEXTS.CONTROLLER} (Connected to ${namespaceString})`
            : TEXTS.CONTROLLER
        }]} />
        <div className="wrapper">
          {connected ? (
            <React.Fragment>
              <SearchInput onSearch={this.handleSearch} />

              <ShabadControls {...this.props}
                isBaniController={true}
                updateSettings={this.updateSettings}
                desktopSettings={desktopSettings}
              />

              <SlideControls
                socket={socket}
                controllerPin={controllerPin}
                default={(shabadData && shabadData.type === 'ceremony') ? shabadData.ceremonyInfo.ceremonyID : null} />

              {loading && (
                <Stub />
              )}

              {shabadData && (
                <ControllerShabad
                  data={shabadData}
                  socket={socket}
                  controllerPin={controllerPin}
                  resultType={shabadData.type}
                  highlight={shabadData.highlight}
                  homeId={shabadData.homeId}
                />
              )}

              {searchData && (
                <ControllerSearch
                  searchData={searchData}
                  socket={socket}
                  controllerPin={controllerPin}
                  resultType={'shabad'}
                />
              )}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <h1>{TEXTS.CONTROLLER_TITLE}</h1>
              <p>{TEXTS.CONTROLLER_DESC}</p>
              <p className="sync-form-error">
                {errorMessage}
              </p>
              <form
                className="sync-form"
                onSubmit={e => {
                  e.preventDefault();
                  this.handleSubmit(e.target.code.value.toUpperCase(), e.target.syncPassword.value, e);
                }}
              >
                <input
                  id="code"
                  className={cx({
                    'sync-form--input': true,
                    'error-input': codeError,
                  })}
                  name="code"
                  type="text"
                  value={namespaceString}
                  onChange={e => this.setState({ namespaceString: e.target.value.toUpperCase() })}
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
                  required
                />
                <input
                  id="syncPassword"
                  className={cx({
                    'sync-form--input': true,
                    'error-input': pinError,
                  })}
                  name="syncPassword"
                  type="password"
                  placeholder="Enter PIN EG. 1234"
                  required
                />
                <button className="sync-form--button">Connect to Desktop</button>
              </form>
              <hr /><h3>Instructions</h3><ol><li>Make sure both your mobile device and the computer running SikhiToTheMax are connected to the internet. They do <b>not</b> need to be on the same WiFi network meaning you could control SikhiToTheMax from anywhere in the world with just an internet connection.</li><li>Click on the controller icon <img src="/assets/images/sync-icon.png" width="28px" alt="sync icon" /> in SikhiToTheMax destop application. You can find this in SikhiToTheMax near the bottom-left corner.</li><li>Take a note of the code and PIN number displayed.<br /><img src="/assets/images/sync-code.png" width="125px" alt="sync code" /></li><li>Open any browser on your mobile device and go to <a href="http://sttm.co/control" target="_blank">sttm.co/control</a>.</li><li>Enter in the code and PIN number in the fields at the top of this page and click "Connect to Desktop" button.</li><li>Search for any Shabad and control! Click on the individual Panktees (lines) to display it on your projector or external monitor.</li></ol>
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
