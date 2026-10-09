import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { apiClient } from '../utils/api-client';
import { userStoreClient } from '../utils/user-store-client';
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
  const token = getToken();
  const { data: favouriteShabads } = useQuery({
    queryKey: ['favourite-shabads', token],
    queryFn: () =>
      userStoreClient('/favorite-shabads').then((rows) =>
        // Banis favourited in the new app have no shabadId; this app only lists shabads.
        (rows ?? []).filter((row) => row.shabadId != null)
      ),
    enabled: !!token,
  });

  return favouriteShabads ?? [];
}

function useFavouriteShabad(shabadId) {
  const favouriteShabads = useFavouriteShabads();
  return favouriteShabads.some((shabad) => shabad.shabadId === Number(shabadId));
}

function useCreateFavouriteShabad() {
  const queryClient = useQueryClient();
  return useMutation(
    ({ shabadId, verseId, comment }) =>
      userStoreClient('/favorite-shabads', {
        data: {
          shabadId: Number(shabadId),
          ...(verseId ? { verseId: Number(verseId) } : {}),
          ...(comment ? { comment } : {}),
        },
      }),
    {
      onMutate: (newShabad) => {
        // Snapshot the previous values
        const oldShabads =
          queryClient.getQueryData(['favourite-shabads', getToken()]) || [];
        if (oldShabads.length > 0) {
          queryClient.setQueryData(
            ['favourite-shabads', getToken()],
            (currentShabads) => [...(currentShabads || []), newShabad]
          );
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
      userStoreClient(`/favorite-shabads/${Number(shabadId)}`, {
        method: 'DELETE',
      }),
    {
      onMutate: (shabadId) => {
        // Snapshot the previous values
        const oldShabads =
          queryClient.getQueryData(['favourite-shabads', getToken()]) || [];

        if (oldShabads.length > 0) {
          queryClient.setQueryData(
            ['favourite-shabads', getToken()],
            (currentShabads) =>
              (currentShabads || []).filter(
                (shabad) => shabad.shabadId !== Number(shabadId)
              )
          );
        }

        // Return a context object with the snapshotted value
        return { oldShabads };
      },
      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (_err, _variables, recover) =>
        typeof recover === 'function' ? recover() : null,
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(['favourite-shabads', getToken()]);
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
