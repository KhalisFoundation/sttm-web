import React from 'react';
import { useSelector } from 'react-redux';

import { getMahankoshTooltipAttributes } from '../MahankoshTooltip/util';
import { getVisraamClass } from '../../util';

interface Props {
  children: React.ReactChildren;
  darkMode: boolean;
  highlightIndex: string[];
  visraams: any;
  mahankoshIndex?: number;
  onMouseOver?: (word: string, index: number) => void;
  onMouseEnter?: (word: string, index: number) => void;
  onMouseLeave?: () => void;
  onClick: (word: string, index: number) => void;
  isShowMahankoshTooltip: boolean;
}

const HighlightedSearchResult = (props: Props) => {
  if (props.children == null) {
    return null;
  }

  const isDarkMode = useSelector(state => state.darkMode);

  return props.children?.split(' ').map((word: string, i: number) => {
    let akharClass = getVisraamClass(props.children, i, props.visraams) || ' ';
    if (props.highlightIndex && props.highlightIndex.length > 0) {
      if (props.highlightIndex.includes(i)) {
        akharClass += 'search-highlight-word'
      }
    }


    const isMahankoshLookupAvailable = (i === props.mahankoshIndex);
    if (isMahankoshLookupAvailable) {
      akharClass += ' mahankoshSelectedGurbaniWord';
    }

    const mahankoshTooltipAttributes = props.isShowMahankoshTooltip ? getMahankoshTooltipAttributes({isDarkMode, content: word}) : {};


    return (
      <span
        key={i}
        {...mahankoshTooltipAttributes}
        onMouseOver={() => {
          if (typeof props.onMouseOver === 'function') {
            props.onMouseOver(word, i)
          }
        }}
        onMouseEnter={() => {
          if (typeof props.onMouseEnter === 'function') {
            props.onMouseEnter(word, i)
          }
        }}
        onClick={() => {
          if(typeof props.onClick === 'function') {
            props.onClick(word, i);
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
