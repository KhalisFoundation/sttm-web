import React from 'react';
import { Link } from 'react-router-dom';
import BarsIcon from './Icons/Bars';

/**
 *
 *
 * @class Menu
 * @extends {React.PureComponent}
 */
export default class Menu extends React.PureComponent {
  toggleMenu = () => document.body.classList.toggle('menu-open');
  closeMenu = () => document.body.classList.remove('menu-open');
  render() {
    const { toggleMenu, closeMenu } = this;
    return (
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
          {/* // TODO Enable when desktop feature is ready
          <li>
            <Link to="/sync" onClick={toggleMenu}>
              Sync
            </Link>
          </li>
          */}
          <li className="close">
            <span role="button" aria-label="Close menu" onClick={closeMenu}>
              Close
            </span>
          </li>
        </ul>
      </div>
    );
  }
}
