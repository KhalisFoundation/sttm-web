import React from "react";
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
    (endpoint, config) => client(endpoint, {config, token}),
    [token],
  )
}

function onRemoveFavourite(shabad) {
  const client = useClient()

  client(`favourite-shabads/${shabad.id}`, {method: 'DELETE'})
  .catch(err => {throw new Error(err)})
  
}

function onCreateFavourite(shabad) {
  const client = useClient()

  client(`favourite-shabads/${shabad.id}`, {method: 'POST'})
  .catch(err => {throw new Error(err)})
}

function userFavouriteShabad(shabad) {
  const client = useClient()

  client(`user-favourite-shabad/${shabad.id}`, {method: 'POST'})
  .catch(err => {throw new Error(err)})
}

export {
  getToken,
  useClient,
  onRemoveFavourite,
  onCreateFavourite,
  userFavouriteShabad,
}