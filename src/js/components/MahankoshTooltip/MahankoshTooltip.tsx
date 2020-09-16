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
  isFetchingMahankoshExplaination
}) => {
  return (
    <ReactTooltip
      event="click"
      eventOff="click"
      id="mahankoshTooltip"
      multiline
      getContent={() => getMahankoshTooltipContent(gurbaniWord, mahankoshExplaination)}
    />
  )
}