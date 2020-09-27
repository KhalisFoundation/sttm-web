import React, { useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import { useDispatch } from 'react-redux';

import { IMahankoshExplaination } from '@/types';
import { useFetchData } from '@/hooks';
import { getMahankoshTooltipContent } from './util/';
import {
  SET_MAHANKOSH_TOOLTIP_ACTIVE,
  SET_MAHANKOSH_TOOLTIP_EXPLAINATION
} from '@/features/actions';

interface IMahankoshTooltipProps {
  tooltipRef: React.Ref<any>,
  tooltipId: string
  gurbaniWord: string
  mahankoshExplaination: IMahankoshExplaination[]
  clearMahankoshInformation: () => {}
  isFetchingMahankoshExplaination: boolean
}

export const MahankoshTooltip: React.FC<IMahankoshTooltipProps> = ({
  tooltipId,
  gurbaniWord,
  clearMahankoshInformation
}) => {
  const dispatch = useDispatch();
  const url = gurbaniWord ? `${API_URL}kosh/word/${gurbaniWord}` : '';
  const {
    isFetchingData: isFetchingMahankoshExplaination,
    data: mahankoshExplaination,
  } = useFetchData(url);
  const isMahankoshExplainationExists = !!mahankoshExplaination && !!mahankoshExplaination[0];

  useEffect(() => {
    dispatch({ type: SET_MAHANKOSH_TOOLTIP_EXPLAINATION, payload: isMahankoshExplainationExists })
  }, [isMahankoshExplainationExists])

  useEffect(() => {
    document.addEventListener('click', clearMahankoshInformation);

    return document.removeEventListener('click', clearMahankoshInformation);
  }, [])

  if (isFetchingMahankoshExplaination || !isMahankoshExplainationExists) {
    return null;
  }

  return (
    <ReactTooltip
      id={tooltipId}
      event="click"
      globalEventOff="click"
      afterShow={() => {
        dispatch({ type: SET_MAHANKOSH_TOOLTIP_ACTIVE, payload: true })
      }}
      afterHide={clearMahankoshInformation}
      className="mahankoshTooltipWrapper"
      place="top"
      clickable
      multiline
      getContent={() => getMahankoshTooltipContent(gurbaniWord, mahankoshExplaination)}
    />
  )
}