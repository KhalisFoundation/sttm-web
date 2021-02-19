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
    shouldHighlight: PropTypes.bool.isRequired,
    larivaar: PropTypes.bool.isRequired,
    unicode: PropTypes.bool.isRequired,
    fontSize: PropTypes.number.isRequired,
    fontFamily: PropTypes.string.isRequired,
    lineHeight: PropTypes.number,
    visraam: PropTypes.object,
  };

  render() {
    const {
      larivaar,
      larivaarAssist,
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
            isShowMahankoshTooltip
            larivaarAssist={larivaarAssist}
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
