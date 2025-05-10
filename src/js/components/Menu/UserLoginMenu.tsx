/* eslint-disable react/prop-types */
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
      try {
        await fetch(`${process.env.SP_API}/logout/sso?nameID=${user?.nameID}&nameIDFormat=${encodeURIComponent(user.nameIDFormat)}`);
        window.location.href = '/?logout=success';
      } catch (error) {
        console.error('Logout failed:', error);
        // Still redirect to root even if logout fails
        window.location.href = '/?logout=error';
      }
    }
  };

  const onLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.location.href = `${process.env.SP_API}/login/sso?redirect_url=${process.env.SSO_CALLBACK_URL}`;
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
