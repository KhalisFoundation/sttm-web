import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { toNavURL, shouldSaveAng, saveAng, dateMath } from '../util';
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
    return (
      <div className="pagination">
        {nav.previous ? (
          <div className="shabad-nav left">
            <Link to={link + nav.previous}>
              {type === 'hukamnama' ? (
                <Hour24 direction='previous' />
              ) : (
                <Chevron direction={Chevron.DIRECTIONS.LEFT} />
              )}
              <span>{type === 'hukamnama' ? dateMath.expand(nav.previous, false) : 'Previous'}</span>
            </Link>
          </div>
        ) : (
          <div className="shabad-nav left disabled-nav">
            <a>
              {type === 'hukamnama' ? (
                <Hour24 direction='previous' />
              ) : (
                <Chevron direction={Chevron.DIRECTIONS.LEFT} />
              )}
              <span>{type === 'hukamnama' ? '' : 'Previous'}</span>
            </a>
          </div>
        )}
        {nav.next ? (
          <div className="shabad-nav right">
            <a role="button" aria-label="next" onClick={this.handleSaveAng}>
              <span>{type === 'hukamnama' ? dateMath.expand(nav.next, false) : 'Next'}</span>
              {type === 'hukamnama' ? (
                <Hour24 direction='Next' />
              ) : (
                <Chevron direction={Chevron.DIRECTIONS.Right} />
              )}
            </a>
          </div>
        ) : (
          <div className="shabad-nav right disabled-nav">
            <a>
              <span>{type === 'hukamnama' ? '' : 'Next'}</span>
              {type === 'hukamnama' ? (
                <Hour24 direction='next' />
              ) : (
                <Chevron direction={Chevron.DIRECTIONS.RIGHT} />
              )}
            </a>
          </div>
        )}
      </div>
    );
  }

  /**
   * Handle SaveAng
   * @memberof FootNav
   */
  handleSaveAng = () => {
    const link = toNavURL(this.props);
    shouldSaveAng(this.props) && saveAng(this.props.nav.next);
    this.props.history.push(link + this.props.nav.next);
  };
}
export default withRouter(FootNav);
