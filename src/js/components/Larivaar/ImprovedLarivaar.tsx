import React, { memo } from 'react';

import LarivaarWord from './Word';
import HighlightedSearchResult from '../SearchResults/HighlightedResult';
import { getVisraamClass } from '../../util';
export interface ILarivaarProps {
  larivaarAssist?: boolean;
  highlightIndex?: Array<number>;
  enable?: boolean;
  unicode: boolean;
  children: string;
  query: string;
  VISRAAM: object;
}

function Larivaar(props: ILarivaarProps) {
  const {
    highlightIndex,
    larivaarAssist = false,
    enable = true,
    children,
    unicode,
    query,
    VISRAAM,
  } = props;

  if (!enable) {
    return (
      <HighlightedSearchResult
        highlightIndex={highlightIndex}
        query={query}
        visraams={VISRAAM}
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
        const visraamClass = getVisraamClass(children, index, VISRAAM);

        return (
          <LarivaarWord
            highlightIndex={highlightIndex}
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
