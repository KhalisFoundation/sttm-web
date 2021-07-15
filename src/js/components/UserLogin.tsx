import React from 'react'
import { useGetUser, useOnClickOutside } from '@/hooks';
import BackIcon from './Icons/Back';
import { Link } from 'react-router-dom';
import { IUser } from '@/types/user'

const UserLogin = () => {
  const dropTogglerRefProfile = React.useRef(null)
  const displayAreaRefProfile = React.useRef(null)
  const [toggleDropdownProfile, setToggleDropdownProfile] = React.useState(false);
  useOnClickOutside(dropTogglerRefProfile, displayAreaRefProfile, () => setToggleDropdownProfile(false))
  const user = useGetUser<IUser>()

  const toggleDropdownHandlerProfile = () => {
    setToggleDropdownProfile(!toggleDropdownProfile)
  }

  const handleLogout = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    if (user) {
      window.location.href = `/logout?nameID=${user?.nameID}&nameIDFormat=${encodeURIComponent(user.nameIDFormat)}`;
    }
  }

  const onLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    window.location.href = `/login/sso`
  }

  return (
    user ?
      (
        <li className={`${toggleDropdownProfile ? 'opened' : ''} submenu`}>
          <button name="profile-btn" onClick={toggleDropdownHandlerProfile} ref={dropTogglerRefProfile}>
            <span>
              {user.firstname + ' ' + user.lastname}
              <BackIcon />
            </span>
          </button>
          <div className="submenu-items" ref={displayAreaRefProfile}>
            <Link to="/logout" onClick={handleLogout}>
              Logout
            </Link>
          </div>
        </li>
      )
      : (
        <li>
          <button name="login-btn" onClick={onLogin}>
            <span>
              Login
            </span>
          </button>
        </li>
      )
  )
}

export default UserLogin
