import React from 'react';
import PropTypes from 'prop-types';
import Larivaar from './Larivaar';

export default class BaaniLine extends React.PureComponent {
  static propTypes = {
    text: PropTypes.shape({
      unicode: PropTypes.string,
      gurmukhi: PropTypes.string,
    }).isRequired,
    larivaarAssist: PropTypes.bool.isRequired,
    larivaarAssistStrength: PropTypes.number.isRequired,
    shouldHighlight: PropTypes.bool.isRequired,
    larivaar: PropTypes.bool.isRequired,
    unicode: PropTypes.bool.isRequired,
    fontSize: PropTypes.number.isRequired,
    lineHeight: PropTypes.number.isRequired,
    fontFamily: PropTypes.string.isRequired,
    visraam: PropTypes.object,
  };

  render() {
    const {
      larivaar,
      larivaarAssist,
      larivaarAssistStrength,
      shouldHighlight,
      fontSize,
      lineHeight,
      fontFamily,
      unicode,
      text,
      visraam,
    } = this.props;

    return (
      <div
        className={`gurmukhi gurbani-display gurbani-font ${
          shouldHighlight ? 'highlight' : ''
          }`}
        style={{ fontSize: `${fontSize}em`, fontFamily: `${fontFamily}`, lineHeight: lineHeight }}
      >
        {'\n'}
        <div
          className={`${larivaar ? 'larivaar' : ''} ${
            unicode ? 'unicode' : 'gurlipi'
            }`}
        >
          <Larivaar
            larivaarAssist={larivaarAssist}
            larivaarAssistStrength={larivaarAssistStrength}
            enable={larivaar}
            unicode={unicode}
            visraam={visraam}
          >
            {unicode ? text.unicode : text.gurmukhi}
          </Larivaar>
        </div>
        {'\n'}
      </div>
    );
  }
}
