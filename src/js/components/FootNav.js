import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { navLink } from '../util';

export default class FootNav extends React.PureComponent {
  static propTypes = {
    info: PropTypes.object.isRequired,
    type: PropTypes.string,
    nav: PropTypes.shape({
      previous: PropTypes.string,
      next: PropTypes.string,
    }),
  };

  render() {
    const { info, nav, type } = this.props;
    const link = navLink(type, info.source.id);
    return (
      <div className="pagination">
        {nav.previous && (
          <div className="shabad-nav left">
            <Link to={link + nav.previous}>
              <i className="fa fa-chevron-left" aria-hidden="true" />
              <span>Previous</span>
            </Link>
          </div>
        )}
        {nav.next && (
          <div className="shabad-nav right">
            <Link to={link + nav.next}>
              <span>Next</span>
              <i className="fa fa-chevron-right" aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    );
  }
}
