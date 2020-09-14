import React from 'react';
import ReactTooltip from 'react-tooltip';

import { IMahankoshExplaination } from '@/types';
import { getMahankoshExplaination } from './util/get-mahankosh-explaination';

interface IMahankoshTooltipProps {
  gurbaniWord: string
  mahankoshExplaination: IMahankoshExplaination[]
  isFetchingMahankoshExplaination: boolean
}

export const MahankoshTooltip: React.FC<IMahankoshTooltipProps> = ({
  gurbaniWord,
  mahankoshExplaination,
  isFetchingMahankoshExplaination
}) => {
  return (
    <ReactTooltip
      globalEventOff="click"
      id="mahankosh-tooltip"
      multiline
    >
      <div>
        <span>{gurbaniWord}</span>
        <span>
          {isFetchingMahankoshExplaination ? '...' :
            getMahankoshExplaination(mahankoshExplaination)}
        </span>
        <span>Source: Mahaan kosh (Encyclopedia)</span>
      </div>
    </ReactTooltip>
  )
}