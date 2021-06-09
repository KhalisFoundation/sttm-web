import React from "react";
import { client } from "../utils/api-client";
import { LOCAL_STORAGE_KEY_FOR_SESSION_TOKEN } from "@/constants";

export async function getUser() {
  let user = null;
  const {token} = await getToken()
  // @TODO send me request to get user details
  if (token) {
    const data = await client('me', {token})
    user = data.user
  }
  return user;
}

async function getToken() {
  return window.localStorage.getItem(LOCAL_STORAGE_KEY_FOR_SESSION_TOKEN)
}

function useClient() {
  const {
    user: {token},
  } = getUser()
  return React.useCallback(
    (endpoint, config) => client(endpoint, {...config, token}),
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

export {
  onRemoveFavourite,
  onCreateFavourite,
}