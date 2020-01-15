import React from 'react';
import PropTypes from 'prop-types';

export default class SlideControls extends React.PureComponent {
  static propTypes = {
    socket: PropTypes.object,
    controllerPin: PropTypes.number,
  };

  sendSlide = e => {
    const slideType = e.currentTarget.id;

    const slideText = {
      'waheguru-slide': 'vwihgurU',
      'moolmantra-slide': '<> siq nwmu krqw purKu inrBau inrvYru Akwl mUriq AjUnI sYBM gur pRswid ]',
      'blank-slide': ''
    }

    this.props.socket.emit('data', {
      host: "sttm-web",
      type: "text",
      pin: this.props.controllerPin,
      text: slideText[slideType],
      isGurmukhi: true,
      isAnnouncement: true,
    });
  }

  render() {
    return (
      <div className="control-section" id="slide-container">
        <div className="slide-type" id="waheguru-slide" onClick={this.sendSlide}>
          <p className="gurbani-font">vwihgurU</p>
        </div>
        <div className="slide-type" id="moolmantra-slide" onClick={this.sendSlide}>
          <p>Mool Mantra</p>
        </div>
        <div className="slide-type" id="blank-slide" onClick={this.sendSlide}>
          <p>Blank Slide</p>
        </div>
      </div>
    );
  }

}