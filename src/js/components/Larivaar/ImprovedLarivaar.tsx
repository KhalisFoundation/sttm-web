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
  query: string;
  visraams: boolean;
  visraamIndices: number[];
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
    visraams,
    visraamIndices,
  } = props;

  if (!enable) {
    return (
      <HighlightedSearchResult
        startIndex={startIndex}
        endIndex={endIndex}
        query={query}
        visraams={visraams}
        visraamIndices={visraamIndices}
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
        let visraamHighlight = false;
        if (visraamIndices && visraamIndices.length !== 0) {
          visraamHighlight = visraams
            ? visraamIndices.includes(index)
              ? true
              : false
            : false;
        }

        const highlight = word.includes(query);

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
            visraamHighlight={visraamHighlight}
          />
        );
      })}
    </>
  );
}

export default memo(Larivaar);
