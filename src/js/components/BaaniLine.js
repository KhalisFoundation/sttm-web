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
    visraams: PropTypes.bool.isRequired,
    visraamData: PropTypes.object.isRequired
  };

  render() {
    const {
      larivaar,
      larivaarAssist,
      shouldHighlight,
      fontSize,
      fontFamily,
      unicode,
      text,
      visraams,
      visraamData
    } = this.props;

    let visraamIndices = [];
    if (visraamData["sttm2"] && visraamData["sttm2"].length !== 0) {
      visraamData["sttm2"].forEach(data => {
        const { p } = data;
        visraamIndices.push(p);
      });
    }

    return (
      <div
        className={`gurmukhi gurbani-display gurbani-font ${
          shouldHighlight ? 'highlight' : ''
          }`}
        style={{ fontSize: `${fontSize}em`, fontFamily: `${fontFamily}` }}
      >
        {'\n'}
        <div
          className={`${larivaar ? 'larivaar' : ''} ${
            unicode ? 'unicode' : 'gurlipi'
            }`}
        >
          <Larivaar
            larivaarAssist={larivaarAssist}
            enable={larivaar}
            unicode={unicode}
            visraams={visraams}
            visraamIndices={visraamIndices}
          >
            {unicode ? text.unicode : text.gurmukhi}
          </Larivaar>
        </div>
        {'\n'}
      </div>
    );
  }
}
