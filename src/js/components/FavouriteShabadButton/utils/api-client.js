async function client(
  endpoint,
  {token, ...customConfig} = {},
) {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      'Content-Type': 'application/json'
    },
    ...customConfig,
  }

  return window.fetch(`${endpoint}`, config).then(async response => {
    if (response.status === 401) {
      return Promise.reject({message: 'Please re-authenticate.'})
    }
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

export {client}
