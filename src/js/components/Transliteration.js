import React from 'react';
import PropTypes from 'prop-types';

export default class EnglishTransliteration extends React.PureComponent {
  static propTypes = {
    children: PropTypes.string.isRequired,
  };

  render() {
    return (
      <p className="transliteration english">{this.props.children}</p>
    );
  }
}

