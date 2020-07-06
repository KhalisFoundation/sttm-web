import React, { memo } from 'react';

import {
  getLarivaarStrengthBrightness,
  fixLarivaarUnicode,
  fixLarivaarGurmukhiFont
} from './util';

export interface ILarivaarWordProps {
  word: string;
  unicode: boolean;
  larivaarAssist?: boolean;
  larivaarAssistStrength?: number;
  index: number;
  highlightIndex?: Array<number>;
  highlight?: boolean;
  visraamClass: string;
}

function LarivaarWord(props: ILarivaarWordProps) {
  const {
    highlightIndex,
    word,
    unicode,
    larivaarAssist,
    larivaarAssistStrength = 1,
    index,
    highlight,
    visraamClass,
  } = props;

  const isOddIdx = index % 2 === 1;
  const segments = unicode
    ? fixLarivaarUnicode(word)
    : fixLarivaarGurmukhiFont(word);

  const akharStyles = {
    filter: `brightness(${larivaarAssist ? getLarivaarStrengthBrightness(larivaarAssistStrength) : 100}%)`
  }

  return (
    <span className={visraamClass}>
      {segments.map((item, i) => {
        const key = `${index}.${i}`;
        let akharClass = '';
        if (isOddIdx) {
          akharClass += 'larivaar-word';
        }

        akharClass = larivaarAssist && isOddIdx ? ' larivaar-assist-word' : '';

        // If this is a search result
        if (highlightIndex !== undefined) {
          if (highlight || (highlightIndex.includes(index))) {
            akharClass += ' search-highlight-word';
          }
        }

        if (item.includes('´')) {
          // handle space break for this special character
          return (
            <span
              key={key}
              className={akharClass}
              style={{ display: 'inline-block', ...akharStyles }}
            >
              {item}
              <wbr />
            </span>
          );
        }

        return (
          <span
            key={key}
            className={akharClass}>
            <span
              style={akharStyles}>
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
