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
    fetch('/logout', {
      method: 'POST',
      body: JSON.stringify({ nameID: user?.nameID, nameIDFormat: user?.nameIDFormat })
    })
  }


  return (
    user ?
      (
        <li data-cy="sync" className={`${toggleDropdownProfile ? 'opened' : ''} submenu`}>
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
