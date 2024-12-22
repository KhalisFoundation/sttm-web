/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import BarsIcon from '../Icons/Bars';
import BackIcon from '../Icons/Back';
import UserLoginMenu from './UserLoginMenu';
import { SunIcon } from '../Icons/SunIcon';
import { NightIcon } from '../Icons/NightIcon';
import store from '@/features/store';
import { toggleDarkMode } from '@/features/actions';
import { FloatingActions } from '../FloatingActions';

interface Props {
  isHome: boolean;
  pathname: string;
}

const Menu = (props: Props) => {
  const displayAreaRefInfo = useRef(null);
  const dropTogglerRefInfo = useRef(null);
  const displayAreaRefIndex = useRef(null);
  const dropTogglerRefIndex = useRef(null);
  const displayAreaRefSync = useRef(null);
  const dropTogglerRefSync = useRef(null);
  const isDarkMode = useSelector<typeof store>(state => state.darkMode);
  const dispatch = useDispatch();

  const [toggleDropdownInfo, setToggleDropdownInfo] = useState(false);
  const [toggleDropdownSync, setToggleDropdownSync] = useState(false);
  const [toggleDropdownIndex, setToggleDropdownIndex] = useState(false);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  function handleClickOutside(event: any) {
    const path = event.path || (event.composedPath && event.composedPath());

    if (
      !path.includes(displayAreaRefInfo.current) &&
      !path.includes(dropTogglerRefInfo.current)
    ) {
      setToggleDropdownInfo(false);
    }

    if (
      !path.includes(displayAreaRefIndex.current) &&
      !path.includes(dropTogglerRefIndex.current)
    ) {
      setToggleDropdownIndex(false);
    }

    if (
      !path.includes(displayAreaRefSync.current) &&
      !path.includes(dropTogglerRefSync.current)
    ) {
      setToggleDropdownSync(false);
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

  function toggleDropdownHandlerInfo() {
    setToggleDropdownInfo(!toggleDropdownInfo);
  }

  function toggleDropdownHandlerSync() {
    setToggleDropdownSync(!toggleDropdownSync);
  }

  function toggleDropdownHandlerIndex() {
    setToggleDropdownIndex(!toggleDropdownIndex);
  }

  return (
    <React.Fragment>
      {!props.isHome && (
        <div className="top-bar-left">
          <div className="open-mobile-menu-wrapper">
            <span
              role="button"
              aria-label="Go back"
              className="button"
              id="open-mobile-menu"
              onClick={goBack}
            >
              <BackIcon />
            </span>
          </div>
        </div>
      )}
      <div className="top-bar-right">
        <div className='open-mobile-menu-wrapper'>
          <button
            aria-label="Open menu"
            className="button"
            id="open-mobile-menu"
            onClick={toggleMenu}
          >
            <BarsIcon />
          </button>
          <button style={{ marginLeft: 8 }}>
            <FloatingActions
              isNoFloat
              onIconButtonClick={() => dispatch(toggleDarkMode())}
              iconPosition='Top'
              iconShadow='hide'
              CustomIcon={isDarkMode ? SunIcon : NightIcon}
              customIconProps={{
                width: '18px',
                height: '18px',
              }}
            />
          </button>
        </div>

        <ul className="menu header-menu">
          <li>
            <Link to="/hukamnama" onClick={toggleMenu}>
              Hukamnama
            </Link>
          </li>

          <li
            data-cy="index"
            className={`${toggleDropdownIndex ? 'opened' : ''} submenu`}
          >
            <button
              name="index-btn"
              onClick={toggleDropdownHandlerIndex}
              ref={dropTogglerRefIndex}
            >
              <span>
                Index
                <BackIcon />
              </span>
            </button>
            <div className="submenu-items" ref={displayAreaRefIndex}>
              <Link to="/sundar-gutka" onClick={toggleMenu}>
                Sundar Gutka
              </Link>
              <Link to="/index/sri-guru-granth-sahib" onClick={toggleMenu}>
                Sri Guru Granth Sahib Jee
              </Link>
              <Link to="/index/sri-dasam-granth-sahib" onClick={toggleMenu}>
                Sri Dasam Granth
              </Link>
              <Link to="index/amrit-keertan" onClick={toggleMenu}>
                Amrit Keertan
              </Link>
            </div>
          </li>

          <li
            data-cy="info"
            className={`${toggleDropdownInfo ? 'opened' : ''} submenu`}
          >
            <button
              name="info-btn"
              onClick={toggleDropdownHandlerInfo}
              ref={dropTogglerRefInfo}
            >
              <span>
                Information
                <BackIcon />
              </span>
            </button>
            <div className="submenu-items" ref={displayAreaRefInfo}>
              <Link to="/rehat-maryadha" onClick={toggleMenu}>
                Rehat Maryadha
              </Link>
            </div>
          </li>

          <li
            data-cy="sync"
            className={`${toggleDropdownSync ? 'opened' : ''} submenu`}
          >
            <button
              name="sync-btn"
              onClick={toggleDropdownHandlerSync}
              ref={dropTogglerRefSync}
            >
              <span>
                Sync
                <BackIcon />
              </span>
            </button>
            <div className="submenu-items" ref={displayAreaRefSync}>
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
          <li className="donate-button">
            <Link
              className="donate-button-text"
              to={{ pathname: 'https://khalisfoundation.org/donate/' }}
              target="_blank"
              onClick={toggleMenu}
            >
              Donate
            </Link>
          </li>
          <UserLoginMenu toggleMenu={toggleMenu} />

          <li>
            <FloatingActions
              isNoFloat
              onIconButtonClick={() => dispatch(toggleDarkMode())}
              iconPosition='Top'
              iconShadow='hide'
              CustomIcon={isDarkMode ? SunIcon : NightIcon}
              customIconProps={{
                width: '24px',
                height: '24px',
              }}
            />
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};


export default Menu;
