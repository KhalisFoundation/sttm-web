import React, { memo } from 'react';
import { STTM_ORANGE, STTM_BLACK } from '@/constants';

import {
  fixLarivaarUnicode,
  fixLarivaarGurmukhiFont
} from './util';

export interface ILarivaarWordProps {
  word: string;
  unicode: boolean;
  darkMode: boolean;
  larivaarAssist?: boolean;
  larivaarAssistColor: string;
  index: number;
  highlightIndex?: Array<number>;
  highlight?: boolean;
  visraamClass: string;
  onMouseOver?: (word: string) => void;
  onMouseLeave?: () => void
}

const LarivaarWord: React.FC<ILarivaarWordProps> = ({
  darkMode,
  highlightIndex,
  word,
  unicode,
  larivaarAssist,
  larivaarAssistColor,
  index,
  highlight,
  visraamClass,
  onMouseOver,
  onMouseLeave,
}) => {

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
    <span className={visraamClass}>
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
              data-background-color={darkMode ? STTM_ORANGE : STTM_BLACK}
              data-place="right"
              data-tip='.....'
              onMouseOver={onMouseOver ? () => onMouseOver(word) : undefined}
              onMouseLeave={onMouseLeave}
              ref={assignAkharColor}
              key={key}
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
            data-event="click"
            key={key}
            data-background-color={darkMode ? STTM_ORANGE : STTM_BLACK}
            data-place="right"
            data-tip='.....'
            onMouseOver={onMouseOver ? () => onMouseOver(word) : undefined}
            onMouseLeave={onMouseLeave}
            className={akharClass}>
            <span ref={assignAkharColor}>
              {item}
              <wbr />
            </span>
          </span>
        );
      })}
    </span>
  );
}

export default memo(LarivaarWord);
