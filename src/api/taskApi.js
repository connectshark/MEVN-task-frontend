import { onMounted, ref } from 'vue'

const useTasks = () => {
  const data = ref(null)
  const err = ref(null)
  const loading = ref(false)
  function doFetch () {
    data.value = null
    err.value = null
    loading.value = true
    const domain = import.meta.env.VITE_SERVER_DOMAIN
    fetch(domain + '/task')
      .then(res => res.json())
      .then(json => {
        data.value = json
        err.value = false
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
    err,
    retry: doFetch,
    loading
  }
}

const deleteTask = async id => {
  const domain = import.meta.env.VITE_SERVER_DOMAIN
  const fetch_res = await fetch(domain + '/task', {
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

const addTask = async ({ owner: id, content }) => {
  const domain = import.meta.env.VITE_SERVER_DOMAIN
  const fetch_res = await fetch(domain + '/task', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      content,
      id
    })
  })
  const fetch_data = await fetch_res.json()
  return fetch_data
}

const updateTask = async ({ taskId: id, content }) => {
  const domain = import.meta.env.VITE_SERVER_DOMAIN
  const fetch_res = await fetch(domain + '/task', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      content,
      id
    })
  })
  const fetch_data = await fetch_res.json()
  return fetch_data
}

const getOwnerTasks = async ({ ownerId }) => {
  const domain = import.meta.env.VITE_SERVER_DOMAIN
  const fetch_res = await fetch(domain + `/task/${ownerId}`)
  const fetch_data = await fetch_res.json()
  return fetch_data
}

export {
  useTasks,
  deleteTask,
  addTask,
  updateTask,
  getOwnerTasks
}