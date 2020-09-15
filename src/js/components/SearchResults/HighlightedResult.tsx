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
  const mahankoshTooltipAttributes = useMemo(() => getMahankoshTooltipAttributes(darkMode), [darkMode])

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
        key={i}
        {...mahankoshTooltipAttributes}
        onMouseOver={onMouseOver ? () => onMouseOver(word) : undefined}
        onMouseLeave={onMouseLeave ? onMouseLeave : undefined}
        className={akharClass} >
        {` ${word} `}
      </span >
    )
  });
}

export default HighlightedSearchResult;
