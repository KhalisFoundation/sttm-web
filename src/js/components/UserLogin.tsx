import React from 'react'
import { LOCAL_STORAGE_KEY_FOR_SESSION_TOKEN } from '@/constants';
import { useGetUser } from '@/hooks/use-get-user';

function UserLogin() {
  const [user, setUser] = useGetUser()

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    window.localStorage.removeItem(LOCAL_STORAGE_KEY_FOR_SESSION_TOKEN)
    setUser(null)
  }

  return (
    user &&
    (<li><button onClick={handleLogout}><span>Logout</span></button></li>)
  )
}

export default UserLogin
