import React, { memo } from 'react';

import LarivaarWord from './Word';
import HighlightedSearchResult from '../SearchResults/HighlightedResult';
import { getVisraamClass } from '@/util/index';

export interface ILarivaarProps {
  larivaarAssist?: boolean;
  startIndex?: number;
  endIndex?: number;
  enable?: boolean;
  unicode: boolean;
  children: string;
  query: string;
  visraam: object;
}

function Larivaar(props: ILarivaarProps) {
  const {
    startIndex,
    endIndex,
    larivaarAssist = false,
    enable = true,
    children,
    unicode,
    query,
    visraam,
  } = props;

  if (!enable) {
    return (
      <HighlightedSearchResult
        startIndex={startIndex}
        endIndex={endIndex}
        query={query}
        visraams={visraam}
      >
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

        const highlight = word.includes(query);
        const visraamClass = getVisraamClass(children, word, visraam);

        return (
          <LarivaarWord
            startIndex={startIndex}
            endIndex={endIndex}
            key={index}
            word={word}
            unicode={unicode}
            larivaarAssist={larivaarAssist}
            index={index}
            highlight={highlight}
            visraamClass={visraamClass}
          />
        );
      })}
    </>
  );
}

export default memo(Larivaar);
