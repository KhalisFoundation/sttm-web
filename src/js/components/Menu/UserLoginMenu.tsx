/* globals SP_API */

import React from 'react';
import { useGetUser, useOnClickOutside } from '@/hooks';
import BackIcon from '../Icons/Back';
import { Link } from 'react-router-dom';
import { IUser } from '@/types/user';

interface UserLoginMenuProps {
  toggleMenu: () => void;
}

const UserLoginMenu: React.FC<UserLoginMenuProps> = ({ toggleMenu }) => {
  const dropTogglerRefProfile = React.useRef(null);
  const displayAreaRefProfile = React.useRef(null);
  const [toggleDropdownProfile, setToggleDropdownProfile] =
    React.useState(false);
  useOnClickOutside(dropTogglerRefProfile, displayAreaRefProfile, () =>
    setToggleDropdownProfile(false)
  );
  const { user } = useGetUser<IUser>();

  const toggleDropdownHandlerProfile = () => {
    setToggleDropdownProfile(!toggleDropdownProfile);
  };

  const handleLogout = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (user) {
      window.location.href = '/?logout=success';
    }
  };

  const onLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.location.href = `${SP_API}/login/sso?redirect_url=${encodeURIComponent(window.location.href)}`;
  };

  return user ? (
    <li className={`${toggleDropdownProfile ? 'opened' : ''} submenu`}>
      <button
        name="profile-btn"
        className="profile-btn"
        onClick={toggleDropdownHandlerProfile}
        ref={dropTogglerRefProfile}
      >
        <span>
          {user.firstname + ' ' + user.lastname}
          <BackIcon />
        </span>
      </button>
      <div className="submenu-items" ref={displayAreaRefProfile}>
        <Link to="/user/favourite-shabads" onClick={toggleMenu}>
          Favourite Shabads
        </Link>
        <Link to="/logout" onClick={handleLogout} className="submenu-logout">
          Logout
        </Link>
      </div>
    </li>
  ) : (
    <li className="submenu-login">
      <button name="login-btn" onClick={onLogin}>
        <span>Login</span>
      </button>
    </li>
  );
};

export default UserLoginMenu;
