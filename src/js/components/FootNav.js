import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { navLink } from '../util';
import Chevron from './Icons/Chevron';

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
        {nav.previous ? (
          <div className="shabad-nav left">
            <Link to={link + nav.previous}>
              <Chevron left />
              <span>Previous</span>
            </Link>
          </div>
        ) : (
          <div className="shabad-nav left disabled-nav">
            <a>
              <Chevron left />
              <span>Previous</span>
            </a>
          </div>
        )}
        {nav.next ? (
          <div className="shabad-nav right">
            <Link to={link + nav.next}>
              <span>Next</span>
              <Chevron />
            </Link>
          </div>
        ) : (
          <div className="shabad-nav right disabled-nav">
            <a>
              <span>Next</span>
              <Chevron />
            </a>
          </div>
        )}
      </div>
    );
  }
}
