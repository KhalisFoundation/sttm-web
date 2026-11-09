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
  // Wraps both the profile button and its dropdown, so clicks on either stay inside.
  const profileMenuRef = React.useRef(null);
  const [toggleDropdownProfile, setToggleDropdownProfile] =
    React.useState(false);
  useOnClickOutside(profileMenuRef, () =>
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
    window.location.href = `${SP_API}/login/sso?redirect_url=${encodeURIComponent(window.location.origin)}`;
  };

  return user ? (
    <li className={`${toggleDropdownProfile ? 'opened' : ''} submenu`} ref={profileMenuRef}>
      <button
        name="profile-btn"
        className="profile-btn"
        onClick={toggleDropdownHandlerProfile}
      >
        <span>
          {user.firstname + ' ' + user.lastname}
          <BackIcon />
        </span>
      </button>
      <div className="submenu-items">
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
