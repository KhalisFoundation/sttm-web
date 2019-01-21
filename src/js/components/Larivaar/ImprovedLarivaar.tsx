import React, { memo } from 'react';

import LarivaarWord from './Word';
import HighlightedSearchResult from '../SearchResults/HighlightedResult';

export interface ILarivaarProps {
  larivaarAssist?: boolean;
  startIndex?: number;
  endIndex?: number;
  enable?: boolean;
  unicode: boolean;
  children: string;
}

function Larivaar(props: ILarivaarProps) {
  const {
    startIndex,
    endIndex,
    larivaarAssist = false,
    enable = true,
    children,
    unicode,
  } = props;

  if (!enable) {
    return (
      <HighlightedSearchResult startIndex={startIndex} endIndex={endIndex}>
        {children}
      </HighlightedSearchResult>
    );
  }

  return (
    <>
      {children.split(' ').map((word, index) => {
        if (['॥', ']'].some(v => word.includes(v))) {
          return `${word} `;
        }

        return (
          <LarivaarWord
            startIndex={startIndex}
            endIndex={endIndex}
            key={index}
            word={word}
            unicode={unicode}
            larivaarAssist={larivaarAssist}
            index={index}
          />
        );
      })}
    </>
  );
}

export default memo(Larivaar);
