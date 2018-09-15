import React from 'react';

export default class EnglishTransliteration extends React.PureComponent {
  public render() {
    return <div className="transliteration english">{this.props.children}</div>;
  }
}
