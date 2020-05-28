import React, { MouseEvent } from 'react';
import { History } from 'history'
import { withRouter } from 'react-router-dom';

import { BAANI_LINK, TIMED_BAANI_LINKS } from '../../constants';
import { clickEvent } from '../../util/analytics';
import { timeMath } from '../../util';

interface IBaaniLinkProps {
  history: History
}

class _BaaniLinks extends React.PureComponent<IBaaniLinkProps> {
  constructor(props) {
    super(props);
  }

  handleBaaniLinkClick = (baani: BAANI_LINK) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    clickEvent({
      action: baani.action,
      label: `timed baani - ${baani.name}`,
    })


    this.props.history.push(baani.link);
  }

  render() {
    return (
      <ul>
        {TIMED_BAANI_LINKS.map(baani => {
          const timeRange = timeMath.parseTime(baani.time);
          if (!timeMath.isInRange(timeRange[0], timeRange[1])) {
            return null;
          }

          return (
            <li>
              <a role="button" aria-label="open" onClick={this.handleBaaniLinkClick(baani)}>
                Time for {baani.name}
              </a>
            </li>
          )
        })}
      </ul>
    )
  }
};

export const BaaniLinks = withRouter(_BaaniLinks);