import React from 'react';
import PropTypes from 'prop-types';

import Pankti from './Pankti';

export default class ControllerShabad extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      connected: false,
      namespaceString: '',
      error: null,
      highlightId: null,
    }
  }

  static propTypes = {
    data: PropTypes.object,
    highlight: PropTypes.number,
    socket: PropTypes.object,
    controllerPin: PropTypes.number,
  };

  handlePanktiClick = (verseId, shabadId) => {
    this.props.socket.emit('data', {
      host: "sttm-web",
      type: "shabad",
      pin: this.props.controllerPin,
      shabadId,
      verseId,
    });
  }

  componentDidMount() {
    const { socket, highlight } = this.props;
    this.setState({ highlightId: highlight });
    socket.on('data', data => this.setState({ highlightId: data.highlight }));
  }

  render() {
    const { data, highlight } = this.props;
    return (
      <div id="shabad" className="controller-shabad shabad display">
        <div className="shabad-container">
          <Pankti
            type="shabad"
            gurbani={data.verses}
            highlight={this.state.highlightId}
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
          />
        </div>
      </div>
    )
  }
}
