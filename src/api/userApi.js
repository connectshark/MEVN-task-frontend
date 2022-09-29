const createAccount = async ({ username, password }) => {
  const domain = import.meta.env.VITE_SERVER_DOMAIN
  const fetch_res = await fetch(domain + '/user', {
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

const getAllUsers = async () => {
  const domain = import.meta.env.VITE_SERVER_DOMAIN
  const fetch_res = await fetch(domain + '/user')
  const fetch_data = await fetch_res.json()
  return fetch_data
}

const deleteUser = async id => {
  const domain = import.meta.env.VITE_SERVER_DOMAIN
  const fetch_res = await fetch(domain + '/user', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id 
    })
  })
  const fetch_data = await fetch_res.json()
  return fetch_data
}

export {
  createAccount,
  getAllUsers,
  deleteUser
}