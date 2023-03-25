import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { apiClient } from '../utils/api-client';
import { LOCAL_STORAGE_KEY_FOR_SESSION_TOKEN } from '@/constants';

export async function getUser() {
  let user = null;
  const { token } = getToken();
  if (token) {
    user = await apiClient('auth/jwt', { token });
  }
  return user;
}

function getToken() {
  return window.localStorage.getItem(LOCAL_STORAGE_KEY_FOR_SESSION_TOKEN);
}

function useClient() {
  const token = getToken();
  return React.useCallback(
    (endpoint, ...config) => apiClient(endpoint, { token, ...config }),
    [token]
  );
}

function useFavouriteShabads() {
  const { data: favouriteShabads } = useQuery({
    queryKey: 'favourite-shabads',
    queryFn: () =>
      apiClient(`/favourite-shabads`, { token: getToken() }).then((data) => 
        data.favouriteShabads
      ),
  });

  return favouriteShabads ?? [];
}

function useFavouriteShabad(shabadId) {
  const favouriteShabads = useFavouriteShabads();
  const favouriteShabadIds = favouriteShabads.map(shabad => shabad.shabad_id)
  return (
    !!favouriteShabadIds.find((shabad_id) => shabad_id === shabadId) ?? false
  );
}

function useCreateFavouriteShabad() {
  const queryClient = useQueryClient();
  return useMutation(
    (data) => {
      apiClient(`/favourite-shabads`, { token: getToken(), data })
    },
    {
      onMutate: (newShabad) => {
        // Snapshot the previous values
        const oldShabads = queryClient.getQueryData('favourite-shabads');
        if (queryClient.getQueryData('favourite-shabads')) {
          queryClient.setQueryData('favourite-shabads', (old) => [
            ...old,
            newShabad,
          ]);
        }

        // Return a context object with the snapshotted value
        return { oldShabads };
      },
      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (err, variables, recover) =>
        typeof recover === 'function' ? recover() : null,
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries('favourite-shabads');
      },
    }
  );
}

function useRemoveFavouriteShabad() {
  const queryClient = useQueryClient();
  return useMutation(
    (shabadId) =>
      apiClient(`/favourite-shabads/${shabadId}`, {
        token: getToken(),
        method: 'DELETE',
      }),
    {
      onMutate: (shabadId) => {
        const oldShabads = queryClient.getQueryData('favourite-shabads');

        if (queryClient.getQueryData('favourite-shabads')) {
          queryClient.setQueryData('favourite-shabads', (old) =>
            old.filter((e) => e !== Number(shabadId))
          );
        }

        return () => queryClient.setQueryData('favourite-shabads', oldShabads);
      },
      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (_err, _variables, recover) =>
        typeof recover === 'function' ? recover() : null,
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries('favourite-shabads');
      },
    }
  );
}

export {
  getToken,
  useClient,
  useCreateFavouriteShabad,
  useRemoveFavouriteShabad,
  useFavouriteShabad,
  useFavouriteShabads,
};
