import { ref } from 'vue'

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

const useUsers = () => {
  const data = ref(null)
  const loading = ref(false)
  const err = ref(null)
  function doFetch () {
    data.value = null
    loading.value = true
    err.value = null
    const domain = import.meta.env.VITE_SERVER_DOMAIN
    fetch(domain + '/user')
      .then(res => res.json())
      .then(json => {
        data.value = json
        loading.value = false
      })
      .catch(errMsg => {
        err.value = true
        loading.value = false
      })
    
  }

  doFetch()

  return {
    data,
    loading,
    err,
    retry: doFetch
  }
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
  useUsers,
  deleteUser
}