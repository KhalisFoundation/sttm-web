import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BarsIcon from './Icons/Bars';
import BackIcon from './Icons/Back';

const Menu = ({ isHome }) => {
  const displayAreaRef = useRef(null)
  const dropTogglerRef = useRef(null)

  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    }
  }, [])

  function handleClickOutside(event) {
    const path = event.path || (event.composedPath && event.composedPath());

    if (
      !path.includes(displayAreaRef.current) &&
      !path.includes(dropTogglerRef.current)
    ) {
      setToggleDropdown(false);
    }
  }

  function toggleMenu() {
    /* TODO: This should be derived through useRef */
    document.body.classList.toggle('menu-open');
  }

  function closeMenu() {
    /* Same for this, please use useRef hook in order to access menu */
    document.body.classList.remove('menu-open');
  }

  function goBack() {
    window.history.back();
  }

  function toggleDropdownHandler() {
    setToggleDropdown(!toggleDropdown)
  }

  return (
    <React.Fragment>
      {!isHome && (
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
          <li data-cy="random-shabad">
            <Link to="/shabad?random" onClick={toggleMenu}>
              Random Shabad
              </Link>
          </li>
          <li data-cy="sundar-gutka-page">
            <Link to="/sundar-gutka" onClick={toggleMenu}>
              Sundar Gutka
              </Link>
          </li>
          <li data-cy="index">
            <Link to="/index" onClick={toggleMenu}>
              Index
              </Link>
          </li>
          <li data-cy="sync" className={`${toggleDropdown ? 'opened' : ''} submenu`}>
            <button name="sync-btn" onClick={toggleDropdownHandler} ref={dropTogglerRef}>
              <span>
                Sync
                <BackIcon />
              </span>
            </button>
            <div className="submenu-items" ref={displayAreaRef}>
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

Menu.propTypes = {
  isHome: PropTypes.bool
};

export default Menu;
