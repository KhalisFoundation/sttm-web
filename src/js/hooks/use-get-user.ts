import { LOCAL_STORAGE_KEY_FOR_SESSION_TOKEN } from '@/constants';
import { apiClient } from '@/components/FavouriteShabadButton/utils/api-client';
import { getQueryParams } from '@/util';
import { useQuery } from 'react-query';

export const useGetUser = <D>() => {
  const { token } = getQueryParams();
  const isUserLoggedIn = !!(
    window.localStorage.getItem(LOCAL_STORAGE_KEY_FOR_SESSION_TOKEN) || token
  );

  const { data: user, isLoading } = useQuery<D>({
    queryKey: 'favourite-shabads',
    queryFn: () =>
      apiClient(`${process.env.SP_API}/user`, {
        token: window.localStorage.getItem(LOCAL_STORAGE_KEY_FOR_SESSION_TOKEN),
      }),
    onError: (e) => {
      // eslint-disable-next-line no-console
      console.log('Error: ' + e.message);
      localStorage.removeItem(LOCAL_STORAGE_KEY_FOR_SESSION_TOKEN);
    },
    enabled: isUserLoggedIn,
  });

  return { user, isLoading };
};
