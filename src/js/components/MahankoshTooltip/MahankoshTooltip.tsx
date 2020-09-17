import React from 'react';
import ReactTooltip from 'react-tooltip';

import { IMahankoshExplaination } from '@/types';
import { getMahankoshTooltipContent } from './util/';
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
  return (
    <ReactTooltip
      id={tooltipId}
      ref={tooltipRef}
      event="click"
      globalEventOff="click"
      afterShow={() => { console.log("show") }}
      afterHide={() => { console.log("hide") }}
      className="mahankoshTooltipWrapper"
      place="top"
      clickable={true}
      multiline
      getContent={() => getMahankoshTooltipContent(gurbaniWord, mahankoshExplaination)}
    />
  )
}