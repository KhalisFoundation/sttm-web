import React from 'react';
import { IMahankoshExplaination } from '@/types';
import { MAHANKOSH_TOOLTIP_SOURCE } from '@/constants';

export const getMahankoshTooltipContent = (
  gurbaniWord: string,
  mahankoshExplaination: IMahankoshExplaination[]) => {

  if (mahankoshExplaination.length > 0) {
    let explaination = mahankoshExplaination[0].definition;
    explaination = explaination.length > 200 ? explaination.substr(0, 200) + '...' : explaination;

    return (
      <div className="mahankoshTooltip" >
        <span className="mahankoshTooltipWord" >
          <span className="mahankoshTooltipGurbaniWord" > {gurbaniWord} </span>
          <span className="mahankoshTooltipExplainations">
            {explaination}
          </span>
        </span>
        <span className="mahankoshTooltipSource"> {MAHANKOSH_TOOLTIP_SOURCE} </span>
      </div>
    )
  }

  return '';
}