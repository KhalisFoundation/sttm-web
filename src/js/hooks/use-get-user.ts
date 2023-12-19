import * as React from 'react';
import { LOCAL_STORAGE_KEY_FOR_SESSION_TOKEN } from '@/constants';
import { apiClient } from '@/components/FavouriteShabadButton/utils/api-client';
import { getQueryParams } from '@/util';

export const useGetUser = <D>() => {
  const { token } = getQueryParams();
  const [user, setUser] = React.useState<D | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const isUserLoggedIn =
    window.localStorage.getItem(LOCAL_STORAGE_KEY_FOR_SESSION_TOKEN) || token;
  React.useEffect(() => {
    if (isUserLoggedIn) {
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
    }
  }, []);

  return { user, isLoading };
};
