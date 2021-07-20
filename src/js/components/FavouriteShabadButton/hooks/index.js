import React, { useEffect, useState } from "react";
import { client } from "../utils/api-client";
import { LOCAL_STORAGE_KEY_FOR_SESSION_TOKEN } from "@/constants";

export async function getUser() {
  let user = null;
  const {token} = getToken()
  if (token) {
    user = await client('auth/jwt', {token})
  }
  return user;
}

function getToken() {
  const session = window.localStorage.getItem(LOCAL_STORAGE_KEY_FOR_SESSION_TOKEN)
  return JSON.parse(session)  
}

function useClient() {
  const {token} = getToken()  
  return React.useCallback(
    (endpoint, config) => client(endpoint, {...config, token}),
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

function useFavouriteShabad(shabadId) {
  const [isFavourite, setIsFavourite] = useState(false)
  const client = useClient()

  useEffect(() => {
    client(`/favourite-shabad/${shabadId}`)
    .then(data =>  {
      setIsFavourite(data.favourite)
    })
  }, [shabadId])

  return isFavourite
}

export {
  getToken,
  useClient,
  onRemoveFavourite,
  onCreateFavourite,
  useFavouriteShabad,
}