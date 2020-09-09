import React from 'react';

import { STTM_ORANGE, STTM_BLACK } from '@/constants';
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
    if (highlightIndex && highlightIndex.length > 0) {
      if (highlightIndex.includes(i)) {
        akharClass += 'search-highlight-word'
      }
    }

    return (
      <span
        key={i}
        data-for='mahankosh-tooltip'
        data-background-color={darkMode ? STTM_ORANGE : STTM_BLACK}
        data-place="right"
        data-tip='.....'
        onMouseOver={onMouseOver ? () => onMouseOver(word, i) : undefined}
        onMouseLeave={onMouseLeave}
        className={akharClass} >
        {` ${word} `}
      </span>
    )
  });
}

export default HighlightedSearchResult;
