import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { fixLarivaarUnicode, fixLarivaarGurmukhiFont } from './util';

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
    larivaarAssistStrength,
    index,
    highlight,
    visraamClass,
  } = props;

  const isOddIdx = index % 2 === 1;
  const segments = unicode
    ? fixLarivaarUnicode(word)
    : fixLarivaarGurmukhiFont(word);

  return (
    <span className={visraamClass}>
      {segments.map((item, i) => {
        const key = `${index}.${i}`;
        let akharClass = larivaarAssist && isOddIdx ? 'larivaar-assist-word' : '';

        if (isOddIdx) {
          akharClass += ' larivaar-word';
        }

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
              style={{ display: 'inline-block' }}
            >
              {item}
              <wbr />
            </span>
          );
        }

        return (
          <span key={key} className={akharClass}>
            <span>
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
