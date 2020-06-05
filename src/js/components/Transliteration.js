import React from 'react';
import PropTypes from 'prop-types';

export default class Transliteration extends React.PureComponent {
  static propTypes = {
    language: PropTypes.string,
    children: PropTypes.string.isRequired,
    fontSize: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
  };
  render() {
    const defaultFontSize = '18px';
    const { fontSize: _fontSize } = this.props;
    const fontSize = _fontSize ? (0.7 * _fontSize) + 'em' : defaultFontSize;

    return (
      <div
        style={{ fontSize }}
        className={'transliteration ' + this.props.language}>
        {this.props.children}
      </div>
    );
  }
}
