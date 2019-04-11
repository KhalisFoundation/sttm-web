import React from 'react';
import PropTypes from 'prop-types';
import { TEXTS } from '../constants';
import { ACTIONS, clickEvent } from '../util/analytics';
import { toAngURL, readAng } from '../util';
import { withRouter } from 'react-router-dom';
import History from './Icons/History';

/**
 *
 *
 * @export
 * @class SehajPaathLink
 * @augments {React.PureComponent<SehajPaathLinkProps>}
 */
class SehajPaathLink extends React.PureComponent {
  /**
   * @typedef {object} SehajPaathLinkProps
   * @property {object} data
   */

  static propTypes = {
    history: PropTypes.object.isRequired,
    data: PropTypes.object,
  };

  render() {
    this._previouslyReadAng = readAng();

    return Number.isNaN(this._previouslyReadAng) === false &&
      this._previouslyReadAng > 0 ? (
      <a
        className="sehaj-paath-link"
        role="button"
        aria-label="open"
        onClick={this.handleClick}
      >
        <History /> {TEXTS.SEHAJ_PAATH(this._previouslyReadAng)}
      </a>
    ) : null;
  }

  handleClick = () => {
    clickEvent({
      action: ACTIONS.SEHAJ_PAATH_LINK,
      label: this._previouslyReadAng,
    });
    this.props.history.push(
      toAngURL({ ang: this._previouslyReadAng, source: 'G' })
    );
  };
}

export default withRouter(SehajPaathLink);
