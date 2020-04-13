import React from 'react';
import PropTypes from 'prop-types';
import { getVisraamClass } from '@/util/index';

export default class HighlightedSearchResult extends React.PureComponent {
  static propTypes = {
    children: PropTypes.string,
    highlightIndex: PropTypes.array,
    query: PropTypes.string,
    visraams: PropTypes.object,
  };

  render() {
    const { children, highlightIndex, query, visraams } = this.props;
    if (children === null) {
      return null;
    }

    return children.split(' ').map((word, i) => {
      let akharClass = getVisraamClass(children, i, visraams);
      akharClass += (highlightIndex && highlightIndex.includes(i)) || word.includes(query)
        ? 'search-highlight-word'
        : ''
      return (
        <span key={i} className={akharClass} >
          {` ${word} `}
        </span>
      )
    });
  }
}
