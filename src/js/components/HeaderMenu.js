import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BarsIcon from './Icons/Bars';
import BackIcon from './Icons/Back';

/**
 *
 *
 * @class Menu
 * @extends {React.PureComponent}
 */
export default class Menu extends React.PureComponent {
  static propTypes = {
    isHome: PropTypes.bool
  };

  toggleMenu = () => document.body.classList.toggle('menu-open');
  closeMenu = () => document.body.classList.remove('menu-open');
  goBack = () => window.history.back();
  render() {
    const { toggleMenu, closeMenu, goBack } = this;
    return (
      <React.Fragment>
        {!this.props.isHome && (
          <div className="top-bar-left">
            <span
              role="button"
              aria-label="Open menu"
              className="button"
              id="open-mobile-menu"
              onClick={goBack}
            >
              <BackIcon />
            </span>
          </div>
        )}
        <div className="top-bar-right">
          <span
            role="button"
            aria-label="Open menu"
            className="button"
            id="open-mobile-menu"
            onClick={toggleMenu}
          >
            <BarsIcon />
          </span>
          <ul className="menu header-menu">
            <li>
              <Link to="/hukamnama" onClick={toggleMenu}>
                Hukamnama
            </Link>
            </li>
            <li>
              <Link to="/shabad?random" onClick={toggleMenu}>
                Random Shabad
              </Link>
            </li>
            <li>
              <Link to="/sundar-gutka" onClick={toggleMenu}>
                Sundar Gutka
              </Link>
            </li>
            <li>
              <Link to="/index" onClick={toggleMenu}>
                Index
              </Link>
            </li>
            <li className="submenu">
              <p>Sync
              <BackIcon /></p>
              <div className="submenu-items">
                <Link to="/sync" onClick={toggleMenu}>
                  Sangat Sync
                </Link>
                <Link to="/control" onClick={toggleMenu}>
                  Bani Controller
                </Link>
              </div>
            </li>
            <li className="close">
              <span role="button" aria-label="Close menu" onClick={closeMenu}>
                Close
              </span>
            </li>
          </ul>
        </div>
      </React.Fragment>
    );
  }
}
