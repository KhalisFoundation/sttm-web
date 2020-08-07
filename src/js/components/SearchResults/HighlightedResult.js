import React from 'react';
import PropTypes from 'prop-types';

import { SEARCH_TYPES } from '@/constants';
import { getVisraamClass } from '../../util';

export default class HighlightedSearchResult extends React.PureComponent {
  static propTypes = {
    children: PropTypes.string,
    highlightIndex: PropTypes.array,
    type: PropTypes.number,
    query: PropTypes.string,
    visraams: PropTypes.object,
  };

  render() {
    const { children, highlightIndex, visraams } = this.props;
    if (children == null) {
      return null;
    }

    return children.split(' ').map((word, i) => {
      let akharClass = getVisraamClass(children, i, visraams) || ' ';

      if (highlightIndex && highlightIndex.length > 0) {
        if (highlightIndex.includes(i)) {
          akharClass += 'search-highlight-word'
        }
      }

      return (
        <span key={i} className={akharClass} >
          {` ${word} `}
        </span>
      )
    });
  }
}
