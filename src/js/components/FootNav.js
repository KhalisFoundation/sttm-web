import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { toNavURL, dateMath } from '../util';
import Chevron from './Icons/Chevron';
import Hour24 from './Icons/Hour24';

class FootNav extends React.PureComponent {
  static propTypes = {
    history: PropTypes.object.isRequired,
    info: PropTypes.object.isRequired,
    type: PropTypes.string,
    nav: PropTypes.shape({
      previous: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      next: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
  };

  render() {
    const { nav, type } = this.props;
    const link = toNavURL(this.props);
    const isHukamnama = type === 'hukamnama';
    const isSync = type === 'sync';
    return (
      <div className={`pagination pagination-${type}`}>
        {/* Previous navigation */}
        {nav.previous ? (
          <div className="shabad-nav left">
            <Link to={link + nav.previous}>
              {isHukamnama ? (
                <Hour24 direction="previous" />
              ) : (
                <Chevron direction={Chevron.DIRECTIONS.LEFT} />
              )}
              <span>
                {isHukamnama
                  ? dateMath.expand(nav.previous, false)
                  : 'Previous'}
              </span>
            </Link>
          </div>
        ) : !isSync ? (
          <div className="shabad-nav left disabled-nav">
            <a>
              {isHukamnama ? (
                <Hour24 direction="previous" />
              ) : (
                <Chevron direction={Chevron.DIRECTIONS.LEFT} />
              )}
              <span>{isHukamnama ? '' : 'Previous'}</span>
            </a>
          </div>
        ) : (
          ''
        )}

        {/* Next navigation */}
        {nav.next ? (
          <div className="shabad-nav right">
            <a role="button" aria-label="next" onClick={this.goToNextAng}>
              <span>
                {isHukamnama ? dateMath.expand(nav.next, false) : 'Next'}
              </span>
              {isHukamnama ? (
                <Hour24 direction="Next" />
              ) : (
                <Chevron direction={Chevron.DIRECTIONS.RIGHT} />
              )}
            </a>
          </div>
        ) : !isSync ? (
          <div className="shabad-nav right disabled-nav">
            <a>
              <span>{isHukamnama ? '' : 'Next'}</span>
              {isHukamnama ? (
                <Hour24 direction="next" />
              ) : (
                <Chevron direction={Chevron.DIRECTIONS.RIGHT} />
              )}
            </a>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }

  /**
   * Handle SaveAng
   * @memberof FootNav
   */
  goToNextAng = () => {
    const link = toNavURL(this.props);
    this.props.history.push(link + this.props.nav.next);
  };
}
export default withRouter(FootNav);
