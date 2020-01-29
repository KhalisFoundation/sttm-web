import React from 'react';
import PropTypes from 'prop-types';

export default class HighlightedSearchResult extends React.PureComponent {
  static propTypes = {
    children: PropTypes.string,
    startIndex: PropTypes.number,
    endIndex: PropTypes.number,
    query: PropTypes.string,
    visraams: PropTypes.bool,
    visraamIndices: PropTypes.array,
  };

  render() {
    const { children, startIndex, endIndex, query, visraamIndices, visraams } = this.props;
    if (children === null) {
      return null;
    }

    return children.split(' ').map((word, i) => (
      <span
        key={i}
        className={
          (i >= startIndex && i < endIndex) || word.includes(query)
            ? 'search-highlight-word' && visraams && visraamIndices && visraamIndices.includes(i) ? ' visraam-word' : ''
            : visraams && visraamIndices && visraamIndices.includes(i) ? ' visraam-word' : ''
        }
      >
        {` ${word} `}
      </span>
    ));
  }
}
