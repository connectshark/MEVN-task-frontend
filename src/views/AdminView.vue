<template>
  <main class="bg-amber-50 min-h-[90vh] grid grid-cols-2 gap-4 p-4">
    <div>
      <h2>所有任務</h2>
      <ul v-if="tasks.length > 0">
        <li v-for="task in tasks_list" :key="task._id" class=" bg-gray-50 mb-2 p-3">
          <p>OWNER: {{task.ownerName}}</p>
          <p>ID: <span class=" text-xs">{{task.id}}</span></p>
          <p>CONTENT: {{task.content}}</p>
          <p>
            <router-link :to="{
              path: '/task/update',
              query: {
                taskId: task.id,
                redirect: '/admin'
              }
            }"
              class=" bg-amber-500 text-white inline-block py-3 px-5 rounded-lg hover:opacity-80 transition-colors">更新任務
            </router-link>
            <button @click="deleteTheTask(task.id)"
              class=" bg-slate-500 text-white inline-block py-3 px-5 rounded-lg hover:opacity-80 transition-colors">刪除任務
            </button>
          </p>
        </li>
      </ul>
    </div>
    <div>
      <h2>所有使用者</h2>
      <ul>
        <li v-for="user in store.users" :key="user._id" class=" bg-gray-50 mb-2 p-3">
          <p>NAME: {{user.username}}</p>
          <p>ID: <span class=" text-xs">{{user._id}}</span></p>
          <p>ACTIVE: {{user.active}}</p>
          <p>
            <router-link :to="{
              path: '/task/new',
              query: {
                owner: user._id,
                redirect: '/admin'
              }
            }"
              class=" bg-amber-500 text-white inline-block py-3 px-5 rounded-lg hover:opacity-80 transition-colors">為使用者新增任務
            </router-link>
            <button @click="deleteTheUser(user._id)"
              class=" bg-slate-500 text-white inline-block py-3 px-5 rounded-lg hover:opacity-80 transition-colors">刪除這個使用者
            </button>
          </p>
        </li>
      </ul>
      <div>
        <router-link :to="{
          path: '/signup',
          query: {
            redirect: '/admin'
          }
        }"
          class=" bg-sky-600 text-white inline-block py-3 px-5 rounded-lg hover:opacity-80 transition-colors">創建使用者
        </router-link>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { getAllTasks, deleteTask } from '../api/taskApi'
import { deleteUser } from '../api/userApi'
import { useUserStore } from '../stores/user'

const store = useUserStore()

const tasks = ref([])
const tasks_list = computed(() => {
  return tasks.value.map(task => {
    const user = store.users.find(user => user._id === task.owner)
    return {
      id: task._id,
      ownerName: user.username,
      ownerId: task.owner,
      content: task.content
    }
  })
})

const deleteTheTask = async taskId => {
  await deleteTask(taskId)
  updateState()
}

const deleteTheUser = async userId => {
  await deleteUser(userId)
  updateState()
}

const updateState = async () => {
  await store.updateUsers()
  const res_tasks = await getAllTasks()
  console.log(res_tasks)
  tasks.value = res_tasks
}
onMounted(updateState)
</script>