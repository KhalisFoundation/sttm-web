import React, { useEffect, useState } from 'react'

function UserLogin() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const session = localStorage.getItem('SESSION_USER');
    const { token } = JSON.parse(session);
    console.log(JSON.stringify({ token }))
    // @TODO: Get token and fetch user details
    fetch('/auth/jwt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token })
    })
      .then(result => {
        // @TODO: get json data
        console.log(result)
        //setUser(decoded)
      })
      .catch(e => {
        console.log('E: ' + e)
      })

  }, [])

  return (
    user &&
    (<li>Logged In</li>)
  )
}

export default UserLogin
