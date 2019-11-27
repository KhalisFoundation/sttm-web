import React from 'react';
import PropTypes from 'prop-types';

export default class EnglishTransliteration extends React.PureComponent {
  static propTypes = {
    language: PropTypes.string,
    children: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className={'transliteration ' + this.props.language}>
        {this.props.children}
      </div>
    );
  }
}
