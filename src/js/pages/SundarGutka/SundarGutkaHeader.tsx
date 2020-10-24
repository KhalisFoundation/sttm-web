import React from 'react';
import ReactTooltip from 'react-tooltip';
import { TEXTS, SG_BAANIS, STTM_BLUE } from '@/constants';
interface ISundarGutkaHeaderProps {
  sgBaaniLength: string;
  setSgBaaniLength: (length: string) => {}
}

export const SundarGutkaHeader: React.FC<ISundarGutkaHeaderProps> = ({
  sgBaaniLength,
  setSgBaaniLength,
}) => {
  return (
    <div className="sundarGutkaHeader">
      <h2>{TEXTS.SUNDAR_GUTKA_HEADER}</h2>
      <div className="sgBaanis">
        <span className="sgBaanisInfoIcon" data-tip data-for="sgBaanisInfo">
          <ReactTooltip backgroundColor={STTM_BLUE} place="top" id="sgBaanisInfo">
          <span>Different length of Sundar Gutka baanis</span>
          </ReactTooltip>
        </span>
        <span className="sgBaanisTitle">Baani Lengths: {' '}</span>
        <div className="sgBaanisButtons">
          {SG_BAANIS.map(({ name, length }) =>
            <div key={length} className="sgBaanisButton">
              <button
                key={length}
                onClick={() => setSgBaaniLength(length)}
                className={`btn btn-ghost ${sgBaaniLength === length ? 'btn-ghost--activated' : ''}`}>
                {name}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}