import React from 'react';
import PropTypes from 'prop-types';

import { pageView } from '../../util/analytics';

import SlideControls from './slide-controls';
import SearchInput from './search-input';

export default class AdminSyncPage extends React.PureComponent {
  static propTypes = {
    history: PropTypes.shape({ push: PropTypes.func }),
  };

  constructor(props) {
    super(props);
    this.state = {
      connected: false,
    };
  }

  connectToDesktop = () => {
    this.setState({ connected: true });
  }

  render() {
    return (
      <div className="row" id="content-root">
        <div className="admin-wrapper">
          <div className="admin-viewer">
          </div>
          <div className="admin-controls">
            <div className="control-section" id="connect-form">
              {this.state.connected ? (
                <SearchInput history={this.props.history} />
              ) : (
                  <React.Fragment>
                    <input type="text" placeholder="Enter the sync code" />
                    <button className="button" onClick={this.connectToDesktop}>Connect</button>
                  </React.Fragment>
                )}
            </div>
            <SlideControls />
          </div>
        </div>
        <div className="search-wrapper">
        </div>
      </div >
    )
  }

  componentDidMount() {
    pageView('/admin-sync');
  }
}