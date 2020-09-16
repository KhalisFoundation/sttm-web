import React, { memo, useMemo } from 'react';

import {
  fixLarivaarUnicode,
  fixLarivaarGurmukhiFont
} from './util';
import { getMahankoshTooltipAttributes } from '../MahankoshTooltip/util';

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
  onMouseOver?: (word: string, index: number) => void;
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

  const mahankoshAttributes = useMemo(() => getMahankoshTooltipAttributes(darkMode, 'mahankoshTooltipHighlightSearchResult'), [darkMode])

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

  console.log(mahankoshAttributes, 'mahankosh attributes')

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
              key={key}
              {...mahankoshAttributes}
              onMouseOver={onMouseOver ? () => onMouseOver(word, i) : undefined}
              onMouseLeave={onMouseLeave ? onMouseLeave : undefined}
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
            {...mahankoshAttributes}
            onMouseOver={onMouseOver ? () => onMouseOver(word, i) : undefined}
            onMouseLeave={onMouseLeave ? onMouseLeave : undefined}
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
