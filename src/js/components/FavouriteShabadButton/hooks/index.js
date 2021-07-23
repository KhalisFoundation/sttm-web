import React, { useEffect, useState } from "react";
import { client } from "../utils/api-client";
import { LOCAL_STORAGE_KEY_FOR_SESSION_TOKEN } from "@/constants";
import { useQuery, queryCache } from "react-query";

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
  const token = window.localStorage.getItem(LOCAL_STORAGE_KEY_FOR_SESSION_TOKEN)
  return React.useCallback(
    (endpoint, ...config) => client(endpoint, {token, ...config}),
    [token],
  )
}

function onRemoveFavourite(shabadId) {
  const client = useClient()

  return client(`favourite-shabad/${shabadId}`, {method: 'DELETE'})
  .catch(err => {throw new Error(err)})
  
}

function onCreateFavourite(shabadId) {
  const client = useClient()

  return client(`favourite-shabad/${shabadId}`, {method: 'POST'})
  .catch(err => {throw new Error(err)})
}

function setQueryDataForShabad(shabad) {
  queryCache.setQueryData(['shabad', {shabadId: shabad.shabad_id}], shabad)
}


function useFavouriteShabads() {
    const client = useClient()

    const {data: favouriteShabads} = useQuery({
    queryKey: 'favourite-shabads',
    queryFn: () =>
      client(`favourite-shabads`).then(data => data.favouriteShabads),
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

export {
  getToken,
  useClient,
  onRemoveFavourite,
  onCreateFavourite,
  useFavouriteShabad,
}