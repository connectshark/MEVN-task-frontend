const login = async ({ password, username }) => {
  const domain = import.meta.env.VITE_SERVER_DOMAIN
  const fetch_res = await fetch(domain + '/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password,
      username
    })
  })

  const fetch_data = await fetch_res.json()
  return fetch_data
}

export {
  login
}