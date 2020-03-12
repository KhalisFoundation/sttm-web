import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { fixLarivaarUnicode, fixLarivaarGurmukhiFont } from './util';

export interface ILarivaarWordProps {
  word: string;
  unicode: boolean;
  larivaarAssist?: boolean;
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
    index,
    highlight,
    visraamClass,
  } = props;

  const segments = unicode
    ? fixLarivaarUnicode(word)
    : fixLarivaarGurmukhiFont(word);

  return (
    <span className={visraamClass}>
      {segments.map((item, i) => {
        let akharClass = '';
        let assistLarivaar;

        if (index % 2 === 1) {
          akharClass += 'larivaar-word';
        }

        // If this isn't a search result
        if (!(highlightIndex !== undefined)) {
          assistLarivaar = larivaarAssist && index % 2 === 1;
        } else {
          if (highlight || (highlightIndex.includes(index))) {
            akharClass += ' search-highlight-word';
          }
          assistLarivaar = larivaarAssist && index % 2 === 1;
        }

        akharClass += assistLarivaar ? ' larivaar-assist-word' : '';

        const key = `${index}.${i}`;

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
