import * as React from 'react';
import { LOCAL_STORAGE_KEY_FOR_SESSION_TOKEN } from '@/constants';
import { apiClient } from '@/components/FavouriteShabadButton/utils/api-client';

export const useGetUser = <D>() => {
  const [user, setUser] = React.useState<D | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    apiClient('/auth/jwt', {
      token: window.localStorage.getItem(LOCAL_STORAGE_KEY_FOR_SESSION_TOKEN),
    })
      .then((response) => {
        setUser(response);
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log('Error: ' + e.message);
        localStorage.removeItem(LOCAL_STORAGE_KEY_FOR_SESSION_TOKEN);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { user, isLoading };
};
