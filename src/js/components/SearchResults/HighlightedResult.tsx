import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { getMahankoshTooltipAttributes } from '../MahankoshTooltip/util';
import { getVisraamClass } from '../../util';

interface Props {
  children: React.ReactChildren;
  darkMode: boolean;
  highlightIndex: string[];
  type: number;
  query: string[];
  visraams: any;
  mahankoshIndex?: number;
  onMouseOver?: (word: string, index: number) => void;
  isShowMahankoshTooltip: boolean;
}

const HighlightedSearchResult = ({
  children,
  highlightIndex,
  visraams,
  mahankoshIndex = -1,
  onMouseOver,
  isShowMahankoshTooltip,
}: Props) => {
  const darkMode = useSelector(state => state.darkMode);
  const mahankoshTooltipAttributes = useMemo(() => {
    if (isShowMahankoshTooltip) {
      return getMahankoshTooltipAttributes(darkMode, 'mahankoshTooltipHighlightSearchResult')
    }
    return {}
  }, [darkMode, isShowMahankoshTooltip])

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
        onMouseOver={() => {
          if (onMouseOver) {
            onMouseOver(word, i)
          }
        }}
        className={akharClass}
      >
        {` ${word} `}
      </span>
    )
  });
}

export default HighlightedSearchResult;
