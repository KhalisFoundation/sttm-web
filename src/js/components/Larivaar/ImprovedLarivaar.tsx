import React, { memo } from 'react';
import { connect } from 'react-redux';

import LarivaarWord from './Word';
import HighlightedSearchResult from '../SearchResults/HighlightedResult';
import { getLarivaarAssistColor } from '../../features/selectors';
import { getVisraamClass } from '../../util';
export interface ILarivaarProps {
  larivaarAssist?: boolean;
  larivaarAssistColor: string;
  highlightIndex?: number[];
  enable?: boolean;
  unicode: boolean;
  children: string;
  query: string;
  visraam: object;
}

export const Larivaar: React.FC<ILarivaarProps> = (props) => {
  const {
    highlightIndex,
    larivaarAssist,
    larivaarAssistColor,
    enable = true,
    children,
    unicode,
    query,
    visraam,
  } = props;

  if (!enable) {
    return (
      <HighlightedSearchResult
        highlightIndex={highlightIndex}
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
        const visraamClass = getVisraamClass(children, index, visraam);
        return (
          <LarivaarWord
            highlightIndex={highlightIndex}
            key={index}
            word={word}
            unicode={unicode}
            larivaarAssist={larivaarAssist}
            larivaarAssistColor={larivaarAssistColor}
            index={index}
            highlight={highlight}
            visraamClass={visraamClass}
          />
        );
      })}
    </>
  );
}

const mapStateToProps = (state: any) =>
  ({
    larivaarAssistColor: getLarivaarAssistColor(state)
  })

export default memo(connect(mapStateToProps, {})(Larivaar));
