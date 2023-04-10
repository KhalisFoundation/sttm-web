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
    isReadingMode: PropTypes.bool,
  };
  render() {
    const { defaultFontSize } = Transliteration;
    const { fontSize: _fontSize, language, children, isReadingMode } = this.props;
    const fontSize = _fontSize ? _fontSize + 'em' : defaultFontSize;
    const isTransliterationExists = !!children;
    const transliterationClass = isReadingMode ? 'reading-mode-transliteration ' : 'transliteration '; 
    if (!isTransliterationExists) return null; 

    return (
      <div
        style={{ fontSize }}
        className={transliterationClass + language}>
        {children + ''}
      </div>
    );
  }
}
