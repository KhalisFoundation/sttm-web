import React from 'react';
import PropTypes from 'prop-types';

export default class HighlightedSearchResult extends React.PureComponent {
  static propTypes = {
    children: PropTypes.string,
    startIndex: PropTypes.number,
    endIndex: PropTypes.number,
  };

  render() {
    const { children, startIndex, endIndex } = this.props;

    if (children === null) {
      return null;
    }

    return children.split(' ').map((word, i) => (
      <span
        key={i}
        className={
          i >= startIndex && i < endIndex ? 'search-highlight-word' : ''
        }
      >
        {` ${word} `}
      </span>
    ));
  }
}
