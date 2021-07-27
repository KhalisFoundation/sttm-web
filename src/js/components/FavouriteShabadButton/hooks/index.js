import React from "react";
import { client } from "../utils/api-client";
import { LOCAL_STORAGE_KEY_FOR_SESSION_TOKEN } from "@/constants";
import { useQuery, QueryClient, useMutation } from "react-query";

const queryClient = new QueryClient()

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

function useFavouriteShabads() {
  const {data: favouriteShabads} = useQuery({
    queryKey: 'favourite-shabads',
    queryFn: () =>
      client(`favourite-shabads`, {token: getToken()}).then(data => data.favouriteShabads),
    config : {
      staleTime: 5000
    }
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
  onSuccess: () => queryClient.invalidateQueries('favourite-shabads'),
}

function useCreateFavouriteShabad() {
  return useMutation(
    (shabadId) => client(`favourite-shabads`, {token: getToken(), data: {shabadId}}),
    {
      onMutate: (newShabad) => {
        const oldShabads = queryClient.getQueryData('favourite-shabads')

        if (queryClient.getQueryData('favourite-shabads')) {
          queryClient.setQueryData('favourite-shabads', old => [...old, newShabad])
        }        

        return () => queryClient.setQueryData('favourite-shabads', oldShabads)
      },
      ...defaultMutationOptions
    }
  )
}

function useRemoveFavouriteShabad() {
  return useMutation(
    (shabadId) => client(`favourite-shabads/${shabadId}`, {token: getToken(), method: 'DELETE'}),
    {
      onMutate: (shabadId) => {
        console.log(shabadId)
        const oldShabads = queryClient.getQueryData('favourite-shabads')

        if (queryClient.getQueryData('favourite-shabads')) {
          queryClient.setQueryData('favourite-shabads', old => old.filter(e => e.shabad_id !== Number(shabadId)))
        }

        return () => queryClient.setQueryData('favourite-shabads', oldShabads)
      },
      ...defaultMutationOptions
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