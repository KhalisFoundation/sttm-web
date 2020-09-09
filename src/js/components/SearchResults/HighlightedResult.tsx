import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';

import { getVisraamClass } from '../../util';

interface IHighlightedSearchResultProps {
  children: React.ReactChildren;
  darkMode: boolean;
  highlightIndex: string[];
  type: number;
  query: string[];
  visraams: any;
  onMouseOver?: (word: string) => void;
  onMouseLeave?: () => void
};

const HighlightedSearchResult: React.FC<IHighlightedSearchResultProps> = ({
  children,
  highlightIndex,
  visraams,
  darkMode,
  onMouseOver,
  onMouseLeave
}) => {
  // console.log(tooltip, "TOOLTIP VALUE")
  if (children == null) {
    return null;
  }

  return children.split(' ').map((word, i) => {
    let akharClass = getVisraamClass(children, i, visraams) || ' ';
    const currentNodeRef = useRef(null);
    if (highlightIndex && highlightIndex.length > 0) {
      if (highlightIndex.includes(i)) {
        akharClass += 'search-highlight-word'
      }
    }

    return (
      <span
        key={i}
        data-for='mahankosh-tooltip'
        ref={currentNodeRef}
        data-background-color={darkMode ? "#f39c1d" : "#000"}
        data-place="right"
        data-tip='loading...'
        onMouseOver={onMouseOver ? () => onMouseOver(word, i) : undefined}
        onMouseLeave={onMouseLeave}
        className={akharClass} >
        {` ${word} `}
      </span>
    )
  });
}

export default HighlightedSearchResult;
