import React, { MouseEvent } from 'react';
import { useHistory } from 'react-router-dom';

import { IBAANI_LINK, TIMED_BAANI_LINKS } from '../../constants';
import { clickEvent } from '../../util/analytics';
import { timeMath } from '../../util';
import { Clock } from '../Icons/Clock';

export const BaaniLinks: React.FC = () => {
  const history = useHistory();

  const handleBaaniLinkClick =
    (baani: IBAANI_LINK) => (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      clickEvent({
        action: baani.action,
        label: `timed baani - ${baani.name}`,
      });

      history.push(baani.link);
    };

  return (
    <div>
      {TIMED_BAANI_LINKS.map((baani, index) => {
        const timeRange = timeMath.parseTime(
          baani.startTimeInMinutes,
          baani.endTimeInMinutes
        );
        if (!timeMath.isInRange(timeRange[0], timeRange[1])) {
          return null;
        }

        return (
          <div className="" key={index}>
            <button
              className="fp-buttons apps-item"
              role="button"
              aria-label="open"
              onClick={handleBaaniLinkClick(baani)}
            >
              <Clock />
            </button>
            <div className="fp-buttons-text">{baani.name}</div>
          </div>
        );
      })}
    </div>
  );
};
