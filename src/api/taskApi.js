const getAllTasks = async () => {
  const domain = import.meta.env.VITE_SERVER_DOMAIN
  const fetch_res = await fetch(domain + '/task')
  const fetch_data = await fetch_res.json()
  return fetch_data
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
  getAllTasks,
  deleteTask,
  addTask,
  updateTask,
  getOwnerTasks
}