async function client(
  endpoint,
  {data, token} = {},
) {
  const config = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      'Content-Type': data ? 'application/json' : undefined,
    },
  }

  return window.fetch(`${endpoint}`, config).then(async response => {
    if (response.status === 401) {
      // @TODO logout 
      // await auth.logout()
      // refresh the page for them
      const query = new URLSearchParams(window.location.search);
      query.append("logout", "success");
      window.location.assign(query)
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
