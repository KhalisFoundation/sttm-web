import React from 'react'
import { useGetUser } from '@/hooks/use-get-user';
import BackIcon from './Icons/Back';
import { Link } from 'react-router-dom';

interface IUser {
  email: string,
  iat: number,
  nameID: string,
  nameIDFormat: string,
}

function UserLogin() {
  const user = useGetUser<IUser>()
  const dropTogglerRefProfile = React.useRef(null)
  const displayAreaRefProfile = React.useRef(null)
  const [toggleDropdownProfile, setToggleDropdownProfile] = React.useState(false);

  function toggleDropdownHandlerProfile() {
    setToggleDropdownProfile(!toggleDropdownProfile)
  }

  function handleLogout(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault()
    if (user) {
      window.location.href = `/logout?nameID=${user?.nameID}&nameIDFormat=${encodeURIComponent(user.nameIDFormat)}`;
    }
  }

  return (
    user ?
      (
        <li className={`${toggleDropdownProfile ? 'opened' : ''} submenu`}>
          <button name="sync-btn" onClick={toggleDropdownHandlerProfile} ref={dropTogglerRefProfile}>
            <span>
              Profile
              <BackIcon />
            </span>
          </button>
          <div className="submenu-items" ref={displayAreaRefProfile}>
            <Link to="/">
              {user.email}
            </Link>
            <Link to="/logout" onClick={handleLogout}>
              Logout
            </Link>
          </div>
        </li >
      )
      : null
  )
}

export default UserLogin
