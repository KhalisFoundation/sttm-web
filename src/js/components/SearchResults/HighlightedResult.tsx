import React, { useState } from 'react';
import ReactTooltip from 'react-tooltip';

import { getVisraamClass } from '../../util';

interface IHighlightedSearchResultProps {
  children: React.ReactChildren;
  highlightIndex: string[],
  type: number
  query: string[],
  visraams: any,
};

interface IHighlightedSearchResultState {
  [key: string]: any
}

const HighlightedSearchResult: React.FC<IHighlightedSearchResultProps> = ({
  children,
  highlightIndex,
  visraams
}) => {

  const [currentWord, setCurrentWord] = useState('');
  const 

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
      <span
        onMouseOver={() => setCurrentWord(word)}
        data-tip={word}
        key={i}
        className={akharClass} >
        {` ${word} `}
        <ReactTooltip />
      </span>
    )
  });
}

export default HighlightedSearchResult;
