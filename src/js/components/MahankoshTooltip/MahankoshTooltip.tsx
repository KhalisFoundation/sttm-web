import React from 'react';
import ReactTooltip from 'react-tooltip';
import { useDispatch } from 'react-redux';

import { IMahankoshExplaination } from '@/types';
import { getMahankoshTooltipContent } from './util/';
import { SET_MAHANKOSH_TOOLTIP_ACTIVE } from '@/features/actions';

interface IMahankoshTooltipProps {
  tooltipRef: React.Ref<any>,
  tooltipId: string
  gurbaniWord: string
  mahankoshExplaination: IMahankoshExplaination[]
  isFetchingMahankoshExplaination: boolean
}

export const MahankoshTooltip: React.FC<IMahankoshTooltipProps> = ({
  tooltipRef,
  tooltipId,
  gurbaniWord,
  mahankoshExplaination,
}) => {
  const dispatch = useDispatch();
  return (
    <ReactTooltip
      id={tooltipId}
      ref={tooltipRef}
      event="click"
      globalEventOff="click"
      afterShow={() => {
        dispatch({ type: SET_MAHANKOSH_TOOLTIP_ACTIVE, payload: true })
      }}
      className="mahankoshTooltipWrapper"
      place="top"
      clickable
      multiline
      getContent={() => getMahankoshTooltipContent(gurbaniWord, mahankoshExplaination)}
    />
  )
}