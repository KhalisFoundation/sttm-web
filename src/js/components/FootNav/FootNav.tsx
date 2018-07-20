import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { toNavURL, shouldSaveAng, saveAng } from '@/util';
import Chevron from '@/components/Icons/Chevron';

class FootNav extends React.PureComponent {
  static propTypes = {
    history: PropTypes.object.isRequired,
    info: PropTypes.object.isRequired,
    type: PropTypes.string,
    nav: PropTypes.shape({
      previous: PropTypes.string,
      next: PropTypes.string,
    }),
  };

  render() {
    const { nav } = this.props;
    const link = toNavURL(this.props);
    return (
      <div className="pagination">
        {nav.previous ? (
          <div className="shabad-nav left">
            <Link to={link + nav.previous}>
              <Chevron direction={Chevron.DIRECTIONS.LEFT} />
              <span>Previous</span>
            </Link>
          </div>
        ) : (
          <div className="shabad-nav left disabled-nav">
            <a>
              <Chevron direction={Chevron.DIRECTIONS.LEFT} />
              <span>Previous</span>
            </a>
          </div>
        )}
        {nav.next ? (
          <div className="shabad-nav right">
            <a role="button" aria-label="next" onClick={this.handleSaveAng}>
              <span>Next</span>
              <Chevron direction={Chevron.DIRECTIONS.RIGHT} />
            </a>
          </div>
        ) : (
          <div className="shabad-nav right disabled-nav">
            <a>
              <span>Next</span>
              <Chevron direction={Chevron.DIRECTIONS.RIGHT} />
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
