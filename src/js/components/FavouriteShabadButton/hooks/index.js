import React from "react";
import { client } from "../utils/api-client";
import { LOCAL_STORAGE_KEY_FOR_SESSION_TOKEN } from "@/constants";
import { useQuery, queryCache, queryClient, useMutation } from "react-query";

export async function getUser() {
  let user = null;
  const {token} = getToken()
  if (token) {
    user = await client('auth/jwt', {token})
  }
  return user;
}

function getToken() {
  return window.localStorage.getItem(LOCAL_STORAGE_KEY_FOR_SESSION_TOKEN)
}

function useClient() {
  const token = getToken()
  return React.useCallback(
    (endpoint, ...config) => client(endpoint, {token, ...config}),
    [token],
  )
}

function setQueryDataForShabad(shabad) {
  queryCache.setQueryData('favourite-shabads', item => {
    return item.push(shabad.shabad_id)
  })
}


function useFavouriteShabads() {
    const {data: favouriteShabads} = useQuery({
    queryKey: 'favourite-shabads',
    queryFn: () =>
      client(`favourite-shabads`, {token: getToken()}).then(data => data.favouriteShabads),
    config: {
      onSuccess(favouriteShabads) {
        for (const favouriteShabad of favouriteShabads) {
          setQueryDataForShabad(favouriteShabad)
        }
      },
    },
  })
  return favouriteShabads ?? []
}

function useFavouriteShabad(shabadId) {
  const favouriteShabads = useFavouriteShabads()
  return !!favouriteShabads.find(shabad => shabad.shabad_id === shabadId) ?? false
}

const defaultMutationOptions = {
  onError: (err, variables, recover) =>
    typeof recover === 'function' ? recover() : null,
  onSettled: () => queryCache.invalidateQueries('favourite-shabads'),
}

function useCreateFavouriteShabad(options) {
  return useMutation((shabadId) => client(`favourite-shabads`, {token: getToken(), data: {shabadId}}),
     {...defaultMutationOptions, ...options},
  )
}

function useRemoveFavouriteShabad(options) {
  return useMutation(
    (shabadId) => client(`favourite-shabads/${shabadId}`, {token: getToken(), method: 'DELETE'}),
    {
      onMutate(removedItem) {
        const previousItems = queryClient.getQueryData('favourite-shabads')

        queryCache.setQueryData('favourite-shabads', old => {
          return old.filter(item => item.shabadId !== removedItem.shabadId)
        })

        return () => queryCache.setQueryData('favourite-shabads', previousItems)
      },
      ...options,
      ...defaultMutationOptions,
    },
  )
}

export {
  getToken,
  useClient,
  useCreateFavouriteShabad,
  useRemoveFavouriteShabad,
  useFavouriteShabad,
}