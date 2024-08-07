import React, { memo } from 'react';
import {
  fixLarivaarUnicode,
  fixLarivaarGurmukhiFont
} from './util';

export interface Props {
  word: string;
  unicode: boolean;
  larivaarAssist?: boolean;
  larivaarAssistColor: string;
  index: number;
  highlightIndex?: number[];
  visraam: Object;
  isVisraam: boolean;
  visraamClass: string;
  highlight?: boolean;
}

const LarivaarWord = ({
  highlightIndex,
  word,
  unicode,
  larivaarAssist,
  larivaarAssistColor,
  index,
  highlight,
  isVisraam,
  visraamClass,
}: Props) => {
  
  const isOddIdx = index % 2 === 1;
  const isColoredLarivaarAssist = larivaarAssist && isOddIdx;
  
  const segments = unicode
    ? fixLarivaarUnicode(word)
    : fixLarivaarGurmukhiFont(word);

  const assignAkharColor = (node: HTMLElement) => {
    if (node) {
      if (isColoredLarivaarAssist) {
        node.style.setProperty('color', larivaarAssistColor, 'important');
      } else {
        node.style.setProperty('color', '');
      }
    }
  }

  return (
    <span
      className={isVisraam ? visraamClass : '' + ' gurbani-word'}
    >
      {segments.map((item, i) => {
        const key = `${index}.${i}`;
        let akharClass = '';

        if (isOddIdx) {
          akharClass += 'larivaar-word';
          if (isColoredLarivaarAssist) {
            akharClass += ' larivaar-assist-word';
          }
        }

        // If this is a search result
        if (highlightIndex !== undefined) {
          if (highlight || highlightIndex.includes(index)) {
            akharClass += ' search-highlight-word';
          }
        }


        // handle space break for this special character
        if (item.includes('´')) {
          // currently react don't support assigning important as inline
          // so need to use this hack of reference
          return (
            <span
              key={key}
              ref={assignAkharColor}
              className={akharClass}
              style={{ display: 'inline-block' }}
            >
              {item}
              <wbr />
            </span>
          );
        }

        // currently react don't support assigning important as inline
        // so need to use this hack of reference
        return (
          <span
            key={key}
            className={akharClass}>
            <span ref={assignAkharColor}>
              {item}
              <wbr />
            </span>
          </span>
        );
      })}
    </span >
  );
}

export default memo(LarivaarWord);
