import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { fixLarivaarUnicode, fixLarivaarGurmukhiFont } from './util';
import {
  HIGHLIGHTED_SEARCH_COLOR,
  LARIVAAR_ASSIST_COLOR,
  NORMAL_SEARCH_COLOR,
} from '@/constants';

export interface ILarivaarWordProps {
  word: string;
  unicode: boolean;
  larivaarAssist?: boolean;
  index: number;
  startIndex?: number;
  endIndex?: number;
}

function LarivaarWord(props: ILarivaarWordProps) {
  const { startIndex, endIndex, word, unicode, larivaarAssist, index } = props;

  const segments = unicode
    ? fixLarivaarUnicode(word)
    : fixLarivaarGurmukhiFont(word);

  return (
    <>
      {segments.map((item, i) => {
        let color;

        if (!(startIndex !== undefined && endIndex !== undefined)) {
          color =
            larivaarAssist && index % 2 === 1 ? LARIVAAR_ASSIST_COLOR : '';
        } else {
          color = NORMAL_SEARCH_COLOR;

          if (larivaarAssist && index % 2 === 1) {
            color = LARIVAAR_ASSIST_COLOR;
          }

          if (index >= startIndex && index < endIndex) {
            color = HIGHLIGHTED_SEARCH_COLOR;
          }
        }

        const key = `${index}.${i}`;

        if (item.includes('´')) {
          // handle space break for this special character
          return (
            <span key={key} style={{ color, display: 'inline-block' }}>
              {item}
              <wbr />
            </span>
          );
        }

        return (
          <span key={key} style={{ color }}>
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
