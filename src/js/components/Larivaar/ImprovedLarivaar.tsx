import React, { memo, useContext, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactTooltip from 'react-tooltip';

import LarivaarWord from './Word';
import HighlightedSearchResult from '../SearchResults/HighlightedResult';

import { getVisraamClass } from '../../util';
import { getLarivaarAssistColor } from '@/features/selectors';
import { SET_MAHANKOSH_TOOLTIP_ACTIVE } from '@/features/actions';
import { MahankoshContext } from '@/context';
import { getMahankoshTooltipAttributes } from '../MahankoshTooltip/util';
export interface ILarivaarProps {
  larivaarAssist?: boolean;
  highlightIndex?: number[];
  enable?: boolean;
  unicode: boolean;
  children: string;
  query: string;
  visraam: object;
  visraams: boolean;
  isShowMahankoshTooltip?: boolean;
}

export const Larivaar: React.FC<ILarivaarProps> = ({
  highlightIndex,
  larivaarAssist,
  enable = true,
  children,
  unicode,
  query,
  visraam,
  visraams,
  isShowMahankoshTooltip = false,
}) => {
  const dispatch = useDispatch();
  const {
    selectedLine,
    selectedWordIndex,
    currentLine,
    setMahankoshInformation
  } = useContext(MahankoshContext);
  const larivaarAssistColor = useSelector(state => getLarivaarAssistColor(state));
  const isMahankoshTooltipActive = useSelector(state => state.isMahankoshTooltipActive);

  // closure implementation
  const handleMahankoshMouseOver = (currentLine: number) => {
    return (selectedWord: string, selectedWordIndex: number) => {
      ReactTooltip.rebuild();
      setMahankoshInformation({
        selectedLine: currentLine,
        selectedWord,
        selectedWordIndex,
      })
    }
  }

  const clearMahankoshTooltip = () => {
    ReactTooltip.hide();
    setMahankoshInformation({
      selectedWord: '',
      selectedLine: -1,
      selectedWordIndex: -1
    })
    dispatch({ type: SET_MAHANKOSH_TOOLTIP_ACTIVE, payload: false })
  }

  const mahankoshTooltipAttributes = useMemo(() => {
    if (isShowMahankoshTooltip) {
      return getMahankoshTooltipAttributes(true, 'mahankoshTooltipHighlightSearchResult')
    }
    return {}
  }, [isShowMahankoshTooltip])

  const mahankoshIndex = selectedWordIndex > -1 && currentLine === selectedLine ? selectedWordIndex : -1;
  const handleMouseOver = isMahankoshTooltipActive ? clearMahankoshTooltip : handleMahankoshMouseOver(currentLine)

  // If larivaar is disabled
  if (!enable) {
    return (
      <HighlightedSearchResult
        isShowMahankoshTooltip={isShowMahankoshTooltip}
        mahankoshIndex={mahankoshIndex}
        highlightIndex={highlightIndex}
        query={query}
        visraams={visraam}
        onMouseOver={handleMouseOver}
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
        const visraamClass = getVisraamClass(children, index, visraam);
        let akharClass = '';
        const isMahankoshLookupAvailable = (index === mahankoshIndex);
        if (isMahankoshLookupAvailable) {
          akharClass += ' mahankoshSelectedGurbaniWord';
        }

        return (
          <span
            key={index}
            {...mahankoshTooltipAttributes}
            onMouseOver={() => {
              handleMouseOver(word, index)
            }}
            className={akharClass}
          >
            <LarivaarWord
              highlightIndex={highlightIndex}
              key={index}
              word={word}
              unicode={unicode}
              larivaarAssist={larivaarAssist}
              larivaarAssistColor={larivaarAssistColor}
              index={index}
              visraamClass={visraamClass}
              visraam={visraam}
              visraams={visraams}
            />
          </span>
        );
      })}
    </>
  );
}

export default memo(Larivaar);