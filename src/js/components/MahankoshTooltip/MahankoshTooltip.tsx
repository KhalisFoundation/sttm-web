import React from 'react';
import ReactTooltip from 'react-tooltip';

import { IMahankoshExplaination } from '@/types';
import { MAHANKOSH_TOOLTIP_SOURCE } from '@/constants';
import { getMahankoshExplaination } from './util/';
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
      <div className="mahankoshTooltip">
        <span className="mahankoshTooltipWord">
          <span className="mahankoshTooltipGurbaniWord">{gurbaniWord}</span>
          <span className="mahankoshTooltipExplainations">
            {isFetchingMahankoshExplaination ? '...' :
              getMahankoshExplaination(mahankoshExplaination)}
          </span>
        </span>

        <span className="mahankoshTooltipSource">{MAHANKOSH_TOOLTIP_SOURCE}</span>
      </div>
    </ReactTooltip>
  )
}