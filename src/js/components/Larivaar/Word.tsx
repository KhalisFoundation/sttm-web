import React, {  memo } from 'react';
import { Pause } from '../Icons/controls/';

import { STTM_ORANGE } from '@/constants';
import {
  fixLarivaarUnicode,
  fixLarivaarGurmukhiFont
} from './util';

export interface ILarivaarWordProps {
  word: string;
  unicode: boolean;
  larivaarAssist?: boolean;
  larivaarAssistColor: string;
  index: number;
  highlightIndex?: Array<number>;
  visraam: boolean;
  visraamClass: string;
  highlight?: boolean;
}

const LarivaarWord: React.FC<ILarivaarWordProps> = ({
  highlightIndex,
  word,
  unicode,
  larivaarAssist,
  larivaarAssistColor,
  index,
  highlight,
  visraam,
  visraamClass,
}) => {
  const isBothLarivaarAndVisraam = visraam && larivaarAssist
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
      className={visraamClass + '' + 'gurbani-word'}
    >
      {isBothLarivaarAndVisraam && isOddIdx &&
        <span style={{backgroundColor: STTM_ORANGE}} className="vishraam-icon-wrapper">
          <Pause className="vishraam-icon" />
        </span>
        }
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
