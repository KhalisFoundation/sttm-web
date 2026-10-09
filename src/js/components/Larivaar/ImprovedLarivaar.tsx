import React, { memo, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import LarivaarWord from './Word';
import HighlightedSearchResult from '../SearchResults/HighlightedResult';

import { getVisraamClass } from '../../util';
import { getLarivaarAssistColor } from '@/features/selectors';
import { SET_MAHANKOSH_TOOLTIP_ACTIVE } from '@/features/actions';
import { MahankoshContext } from '@/context';
import { getMahankoshTooltipAttributes } from '../MahankoshTooltip/util';
import { shouldIgnoreMahankoshHover } from '../MahankoshTooltip/should-ignore-mahankosh-hover';

export interface Props {
  larivaarAssist?: boolean;
  highlightIndex?: number[];
  enable?: boolean;
  unicode: boolean;
  children: string;
  query: string;
  visraam: Object;
  isVisraam: boolean;
  isShowMahankoshTooltip?: boolean;
}

export const Larivaar = ({
  highlightIndex,
  larivaarAssist,
  enable = true,
  children,
  unicode,
  query,
  visraam,
  isVisraam,
  isShowMahankoshTooltip = false,
}: Props) => {
  const dispatch = useDispatch();
  const {
    selectedLine,
    selectedWordIndex,
    currentLine,
    setMahankoshInformation
  } = useContext(MahankoshContext);
  const larivaarAssistColor = useSelector((state) =>
    getLarivaarAssistColor(state)
  );
  const isDarkMode = useSelector((state) => state.darkMode);
  const isMahaanKoshTooltipEnabled = useSelector(
    (state) => state.mahaanKoshTooltip
  );
  const isAutoScrolling = useSelector(
    (state: { isAutoScrolling?: boolean }) => !!state.isAutoScrolling
  );
  const isMahankoshTooltipActive = useSelector(
    (state: { isMahankoshTooltipActive?: boolean }) => !!state.isMahankoshTooltipActive
  );
  const ignoreHover = shouldIgnoreMahankoshHover({
    isAutoScrolling,
    isMahankoshTooltipActive,
  });

  // closure implementation
  const handleMahankoshMouseEnter = (currentLine: number) => {
    return (selectedWord: string, selectedWordIndex: number) => {
      if (ignoreHover) {
        return;
      }

      //Clear any existing instance of the active tooltip before setting new word
      dispatch({ type: SET_MAHANKOSH_TOOLTIP_ACTIVE, payload: false });

      setMahankoshInformation({
        selectedLine: currentLine,
        selectedWord,
        selectedWordIndex,
      })
    }
  }

  const handleGurbaniShabadClick = (word: string, index: number) => {
    setMahankoshInformation({
      selectedLine: currentLine,
      selectedWord: word,
      selectedWordIndex: index,
    });
    dispatch({type: SET_MAHANKOSH_TOOLTIP_ACTIVE, payload: true})
  }

  const handleClearMahankoshTooltip = () => {
    if (ignoreHover) {
      return;
    }
    dispatch({ type: SET_MAHANKOSH_TOOLTIP_ACTIVE, payload: false })
  }

  const mahankoshIndex = selectedWordIndex > -1 && currentLine === selectedLine ? selectedWordIndex : -1;
  const handleMahankoshWordStore = handleMahankoshMouseEnter(currentLine)  

  // If larivaar is disabled
  if (!enable) {
    if (!isMahaanKoshTooltipEnabled) {
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
      <HighlightedSearchResult
        isShowMahankoshTooltip={isShowMahankoshTooltip}
        mahankoshIndex={mahankoshIndex}
        highlightIndex={highlightIndex}
        query={query}
        visraams={visraam}
        onMouseLeave={handleClearMahankoshTooltip}
        onClick={handleGurbaniShabadClick}
        onMouseEnter={handleMahankoshWordStore}
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

        const isBothLarivaarAssistAndVisraam = isVisraam && larivaarAssist;

        const visraamClass = getVisraamClass({akharIndex: index, visraams: visraam, isBothLarivaarAssistAndVisraam});
        let akharClass = '';

        if (isShowMahankoshTooltip && isMahaanKoshTooltipEnabled) {
          akharClass += ' mahankoshSelectedGurbaniWord';
        }

        const mahankoshTooltipAttributes =
          isShowMahankoshTooltip && isMahaanKoshTooltipEnabled
            ? getMahankoshTooltipAttributes({ isDarkMode, content: word })
            : {};

        return (
          <span
            key={index}
            {...mahankoshTooltipAttributes}
            onMouseEnter={
              isMahaanKoshTooltipEnabled
                ? () => {
                    handleMahankoshWordStore(word, index);
                  }
                : undefined
            }
            onClick={
              isMahaanKoshTooltipEnabled
                ? () => handleGurbaniShabadClick(word, index)
                : undefined
            }
            onMouseLeave={
              isMahaanKoshTooltipEnabled
                ? handleClearMahankoshTooltip
                : undefined
            }
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
              isVisraam={isVisraam}
            />
          </span>
        );
      })}
    </>
  );
}

export default memo(Larivaar);