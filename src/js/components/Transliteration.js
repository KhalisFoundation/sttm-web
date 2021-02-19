import React from 'react';
import PropTypes from 'prop-types';

export default class Transliteration extends React.PureComponent {

  static defaultFontSize = '18px';
  static propTypes = {
    language: PropTypes.string,
    children: PropTypes.string.isRequired,
    fontSize: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
  };
  render() {
    const { defaultFontSize } = Transliteration;
    const { fontSize: _fontSize, language, children } = this.props;
    const fontSize = _fontSize ? _fontSize + 'em' : defaultFontSize;
    const isTransliterationExists = !!children;
    if (!isTransliterationExists) return null;

    return (
      <div
        style={{ fontSize }}
        className={'transliteration ' + language}>
        {children + ''}
      </div>
    );
  }
}
