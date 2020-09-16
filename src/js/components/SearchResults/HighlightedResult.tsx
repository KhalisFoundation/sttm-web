import React, { useMemo } from 'react';

import { getMahankoshTooltipAttributes } from '../MahankoshTooltip/util';
import { getVisraamClass } from '../../util';

interface IHighlightedSearchResultProps {
  children: React.ReactChildren;
  darkMode: boolean;
  highlightIndex: string[];
  type: number;
  query: string[];
  visraams: any;
  mahankoshIndex?: number;
  onMouseOver?: (word: string, index: number) => void;
  onMouseLeave?: () => void
};

const HighlightedSearchResult: React.FC<IHighlightedSearchResultProps> = ({
  children,
  highlightIndex,
  visraams,
  darkMode,
  mahankoshIndex = -1,
  onMouseOver,
  onMouseLeave
}) => {
  const mahankoshTooltipAttributes = useMemo(() => getMahankoshTooltipAttributes(darkMode, 'mahankoshTooltipHighlightSearchResult'), [darkMode])

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

    const isMahankoshLookupAvailable = (i === mahankoshIndex);
    if (isMahankoshLookupAvailable) {
      akharClass += ' mahankoshSelectedGurbaniWord';
    }

    return (
      <span
        key={i}
        {...mahankoshTooltipAttributes}
        onMouseOver={onMouseOver ? () => onMouseOver(word, i) : undefined}
        className={akharClass} >
        {` ${word} `}
      </span >
    )
  });
}

export default HighlightedSearchResult;
