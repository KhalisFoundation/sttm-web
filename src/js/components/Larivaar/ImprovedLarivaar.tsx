import React, { memo, useEffect, useRef, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactTooltip from 'react-tooltip';

import LarivaarWord from './Word';
import HighlightedSearchResult from '../SearchResults/HighlightedResult';

import { getVisraamClass } from '../../util';
import { getLarivaarAssistColor } from '@/features/selectors';
import { SET_MAHANKOSH_TOOLTIP_ACTIVE } from '@/features/actions';
import { MahankoshContext } from '@/context';

export interface ILarivaarProps {
  larivaarAssist?: boolean;
  highlightIndex?: number[];
  enable?: boolean;
  unicode: boolean;
  children: string;
  query: string;
  visraam: object;
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
  isShowMahankoshTooltip = false
}) => {
  const dispatch = useDispatch();
  const {
    selectedLine,
    selectedWordIndex,
    selectedWord,
    currentLine,
    setMahankoshInformation
  } = useContext(MahankoshContext);
  const larivaarAssistColor = useSelector(state => getLarivaarAssistColor(state));
  const isMahankoshTooltipActive = useSelector(state => state.isMahankoshTooltipActive);
  useEffect(() => {
    document.addEventListener('click', clearMahankoshTooltip);

    return () => document.removeEventListener('click', clearMahankoshTooltip);
  }, [selectedLine, selectedWord, selectedWordIndex]);

  const handleMouseOver = (currentLine: number) => {
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

  const mahankoshIndex = selectedWordIndex > -1 && currentLine === selectedLine ? selectedWordIndex : -1;
  let handleMouseOverHighlightResult = undefined;
  if (isShowMahankoshTooltip) {
    handleMouseOverHighlightResult = isMahankoshTooltipActive ? clearMahankoshTooltip : handleMouseOver(currentLine)
  }

  if (!enable) {
    return (
      <>
        <HighlightedSearchResult
          isShowMahankoshTooltip={isShowMahankoshTooltip}
          mahankoshIndex={mahankoshIndex}
          highlightIndex={highlightIndex}
          query={query}
          visraams={visraam}
          onMouseOver={handleMouseOverHighlightResult}
        >
          {children}
        </HighlightedSearchResult>
        {/* {!isMahankoshTooltipActive &&
          <MahankoshTooltip
            tooltipRef={reactTooltipRef}
            tooltipId="mahankoshTooltipHighlightSearchResult"
            gurbaniWord={selectedWord}
            isFetchingMahankoshExplaination={isFetchingMahankoshExplaination}
            mahankoshExplaination={mahankoshExplaination as IMahankoshExplaination[]}
          />} */}
      </>
    );
  }

  return (
    <>
      {children.split(' ').map((word, index) => {
        if (['॥', ']'].some(v => word.includes(v))) {
          return `${word} `;
        }
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
            visraamClass={visraamClass}
          />
        );
      })}
    </>
  );
}

export default memo(Larivaar);