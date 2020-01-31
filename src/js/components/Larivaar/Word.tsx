import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { fixLarivaarUnicode, fixLarivaarGurmukhiFont } from './util';

export interface ILarivaarWordProps {
  word: string;
  unicode: boolean;
  larivaarAssist?: boolean;
  index: number;
  startIndex?: number;
  endIndex?: number;
  highlight?: boolean;
}

function LarivaarWord(props: ILarivaarWordProps) {
  const {
    startIndex,
    endIndex,
    word,
    unicode,
    larivaarAssist,
    index,
    highlight,
  } = props;

  const segments = unicode
    ? fixLarivaarUnicode(word)
    : fixLarivaarGurmukhiFont(word);

  return (
    <>
      {segments.map((item, i) => {
        let akharClass = '';
        let assistLarivaar;

        if (index % 2 === 1) {
          akharClass += 'larivaar-word';
        }

        // If this isn't a search result
        if (!(startIndex !== undefined && endIndex !== undefined)) {
          assistLarivaar = larivaarAssist && index % 2 === 1;
        } else {
          if (highlight || (index >= startIndex && index < endIndex)) {
            akharClass += ' search-highlight-word';
          }
          assistLarivaar = larivaarAssist && index % 2 === 1;
        }

        akharClass += assistLarivaar ? ' larivaar-assist-word' : '';

        const key = `${index}.${i}`;

        if (item.includes('´')) {
          // handle space break for this special character
          return (
            <span key={key} className={akharClass} style={{ display: 'inline-block' }}>
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
    </>
  );
}

export default memo(LarivaarWord);
