import React from 'react';
import PropTypes from 'prop-types';

import Pankti from './Pankti';

export default class ControllerShabad extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      connected: false,
      namespaceString: '',
      error: null
    }
  }

  static propTypes = {
    data: PropTypes.object,
    highlight: PropTypes.number,
    homeId: PropTypes.number,
    socket: PropTypes.object,
    controllerPin: PropTypes.number,
    resultType: PropTypes.string,
  };

  handlePanktiClick = (verseId, shabadId) => {
    const isItCeremony = this.props.data.ceremonyInfo;
    this.props.socket.emit('data', {
      host: "sttm-web",
      type: this.props.resultType,
      pin: this.props.controllerPin,
      ceremonyId: isItCeremony ? isItCeremony.ceremonyID : null,
      shabadId,
      verseId,
    });
  }

  render() {
    const { socket, data, homeId, highlight } = this.props;
    return (
      <div id="shabad" className="controller-shabad shabad display">
        <div className="shabad-container">
          <Pankti
            type="shabad"
            gurbani={data.verses}
            highlight={highlight}
            homeId={homeId}
            splitView={false}
            unicode={false}
            larivaar={false}
            fontSize={1.5}
            fontFamily="gurmukhi_heavy"
            larivaarAssist={false}
            translationLanguages={[]}
            transliterationLanguages={[]}
            centerAlignGurbani={true}
            onPanktiClick={this.handlePanktiClick}
            socket={socket}
          />
        </div>
      </div>
    )
  }
}
