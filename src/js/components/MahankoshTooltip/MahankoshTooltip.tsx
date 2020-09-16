import React from 'react';
import ReactTooltip from 'react-tooltip';

import { IMahankoshExplaination } from '@/types';
import { getMahankoshTooltipContent } from './util/';
interface IMahankoshTooltipProps {
  tooltipId: string
  gurbaniWord: string
  mahankoshExplaination: IMahankoshExplaination[]
  isFetchingMahankoshExplaination: boolean
}

export const MahankoshTooltip: React.FC<IMahankoshTooltipProps> = ({
  tooltipId,
  gurbaniWord,
  mahankoshExplaination,
}) => {
  return (
    <ReactTooltip
      id={tooltipId}
      event="click"
      globalEventOff="click"
      className="mahankoshTooltipWrapper"
      place="top"
      clickable={true}
      multiline
      getContent={() => getMahankoshTooltipContent(gurbaniWord, mahankoshExplaination)}
    />
  )
}