import React from 'react';
import { Tooltip  } from 'react-tooltip';
import { TEXTS, SG_BAANIS, STTM_BLUE } from '@/constants';
interface Props {
  sgBaaniLength: string;
  setSgBaaniLength: (length: string) => {}
}

export const SundarGutkaHeader= ({
  sgBaaniLength,
  setSgBaaniLength,
}: Props) => {
  return (
    <div className="sundarGutkaHeader">
      <h2>{TEXTS.SUNDAR_GUTKA_HEADER}</h2>
      <div className="sgBaanis">
        <span className="sgBaanisInfoIcon" data-tip data-for="sgBaanisInfo">
          <Tooltip place="top" id="sgBaanisInfo" render={() => <div style={{backgroundColor: STTM_BLUE}} className="sgBaanisPopup">{TEXTS.SUNDAR_GUTKA_LENGTHS_INFO}</div>} />
        </span>
        <span className="sgBaanisTitle">{TEXTS.SUNDAR_GUTKA_LENGTHS_TITLE} {' '}</span>
        <div className="sgBaanisButtons">
          {SG_BAANIS.map(({ name, length, tooltip }) =>
            <div key={length} className="sgBaanisButton" data-tip data-for={name}>
              <button
                key={length}
                onClick={() => setSgBaaniLength(length)}
                className={`btn btn-ghost ${sgBaaniLength === length ? 'btn-ghost--activated' : ''}`}>
                {name}

              </button>
              <Tooltip place="top" id={name} render={() => <>{tooltip}</>} />
            </div>)}
        </div>
      </div>
    </div>
  )
}