import React, { memo, useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactTooltip from 'react-tooltip';

import LarivaarWord from './Word';
import HighlightedSearchResult from '../SearchResults/HighlightedResult';
import { MahankoshTooltip } from '../MahankoshTooltip';
import { getVisraamClass } from '../../util';
import { useFetchData } from '@/hooks';
import { IMahankoshExplaination } from '@/types';
import { getLarivaarAssistColor } from '@/features/selectors';
import { SET_MAHANKOSH_TOOLTIP_ACTIVE } from '@/features/actions';

export interface ILarivaarProps {
  larivaarAssist?: boolean;
  highlightIndex?: number[];
  enable?: boolean;
  unicode: boolean;
  children: string;
  query: string;
  visraam: object;
}

export const Larivaar: React.FC<ILarivaarProps> = ({
  highlightIndex,
  larivaarAssist,
  enable = true,
  children,
  unicode,
  query,
  visraam,
}) => {
  const { darkMode } = useSelector(state => state);
  const reactTooltipRef = useRef<any>();
  const dispatch = useDispatch();
  const isMahankoshTooltipActive = useSelector(state => state.isMahankoshTooltipActive);
  const larivaarAssistColor = useSelector(state => getLarivaarAssistColor(state));
  const [tooltipHighlightsIn, setTooltipHighlightsIn] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [selectedWord, setSelectedWord] = useState<string>('');
  const url = selectedWord ? `${API_URL}kosh/word/${selectedWord}` : '';
  const {
    isFetchingData: isFetchingMahankoshExplaination,
    data: mahankoshExplaination,
  } = useFetchData(url);

  const isShowTooltipHighlightedSearchResult = tooltipHighlightsIn === 'searchResults';
  const isShowTooltipLarivaar = tooltipHighlightsIn === 'larivaar';

  const handleMouseOver = (highlightsIn: string) => {
    return (selectedWord: string, selectedIndex: number) => {
      setTooltipHighlightsIn(highlightsIn);
      setSelectedWord(selectedWord);
      setSelectedIndex(selectedIndex);
    }
  }

  const clearMahankoshTooltip = () => {
    console.log("CLEAR MAHANKOSH TOOLTIP RUNS?", SET_MAHANKOSH_TOOLTIP_ACTIVE)
    setTooltipHighlightsIn('');
    setSelectedWord('');
    setSelectedIndex(-1);
    if (isMahankoshTooltipActive) {
      dispatch({ type: SET_MAHANKOSH_TOOLTIP_ACTIVE, payload: false })
      ReactTooltip.hide();
    }
  }

  console.log(isMahankoshTooltipActive, 'REDUX STATE')

  useEffect(() => {
    document.addEventListener('click', clearMahankoshTooltip);

    return () => document.removeEventListener('click', clearMahankoshTooltip);
  }, [tooltipHighlightsIn, selectedWord, selectedIndex]);

  const isMahankoshExplaination = !!mahankoshExplaination && !!mahankoshExplaination[0];
  console.log(mahankoshExplaination, selectedIndex)

  if (!enable) {
    return (
      <>
        <HighlightedSearchResult
          mahankoshIndex={isMahankoshExplaination && !isFetchingMahankoshExplaination ? selectedIndex : -1}
          highlightIndex={highlightIndex}
          query={query}
          visraams={visraam}
          darkMode={darkMode}
          onMouseOver={isMahankoshTooltipActive ? clearMahankoshTooltip : handleMouseOver('searchResults')}
          tooltipRef={reactTooltipRef}
        >
          {children}
        </HighlightedSearchResult>
        {isShowTooltipHighlightedSearchResult &&
          <MahankoshTooltip
            tooltipRef={reactTooltipRef}
            tooltipId="mahankoshTooltipHighlightSearchResult"
            gurbaniWord={selectedWord}
            isFetchingMahankoshExplaination={isFetchingMahankoshExplaination}
            mahankoshExplaination={mahankoshExplaination as IMahankoshExplaination[]}
          />}
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
            selectedIndex={selectedIndex}
            onMouseOver={!isShowTooltipLarivaar ? handleMouseOver('larivaar') : undefined}
            unicode={unicode}
            larivaarAssist={larivaarAssist}
            larivaarAssistColor={larivaarAssistColor}
            index={index}
            darkMode={darkMode}
            visraamClass={visraamClass}
          />
        );
      })}
      {isShowTooltipLarivaar && <MahankoshTooltip
        tooltipId="mahankoshTooltipLarivaar"
        gurbaniWord={selectedWord}
        isFetchingMahankoshExplaination={isFetchingMahankoshExplaination}
        mahankoshExplaination={mahankoshExplaination as IMahankoshExplaination[]}
      />}
    </>
  );
}

export default memo(Larivaar);