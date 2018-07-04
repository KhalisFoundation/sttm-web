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
  };

  render() {
    const {
      larivaar,
      larivaarAssist,
      shouldHighlight,
      fontSize,
      unicode,
      text,
    } = this.props;
    return (
      <div
        className={`gurmukhi ${
          shouldHighlight ? 'highlight' : ''
        } gurbani-display gurbani-font`}
        style={{ fontSize: `${fontSize}em` }}
      >
        <div
          className={`${larivaar ? 'larivaar' : ''} ${
            unicode ? 'unicode' : 'gurlipi'
          }`}
        >
          <Larivaar
            larivaarAssist={larivaarAssist}
            enable={larivaar}
            unicode={unicode}
          >
            {unicode ? text.unicode : text.gurmukhi}
          </Larivaar>
        </div>
      </div>
    );
  }
}
