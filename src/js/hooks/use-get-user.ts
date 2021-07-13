import * as React from 'react'
import { LOCAL_STORAGE_KEY_FOR_SESSION_TOKEN } from '@/constants'
import { client } from '@/components/FavouriteShabad/utils/api-client';

export const useGetUser = <D>() => {
  const [user, setUser] = React.useState<D | null>(null);

  
  React.useEffect(() => {    
    const session = window.localStorage.getItem(LOCAL_STORAGE_KEY_FOR_SESSION_TOKEN)
    if (session) {
      const { token } = JSON.parse(session);        
      client('/auth/jwt', {
        data: {},
        token
      })      
      .then(response => {
        setUser(response)
      })
      .catch(e => {            
        // eslint-disable-next-line no-console
        console.log('E: ' + e)
      })
    }
  }, []);

  return user;
}

