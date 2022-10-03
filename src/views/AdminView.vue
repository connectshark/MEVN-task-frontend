<template>
  <main class="bg-amber-50 min-h-[90vh] grid grid-cols-2 gap-4 p-4">
    <div>
      <h2>所有任務</h2>
      <div v-if="taskLoading">loading</div>
      <ul v-auto-animate>
        <li v-for="task in taskData" :key="task._id" class=" bg-gray-50 mb-2 p-3">
          <p>OWNER: {{task.owner}}</p>
          <p>ID: <span class=" text-xs">{{task._id}}</span></p>
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
      <div v-if="taskErr">
        <button @click="taskRetry" class="bg-sky-600 text-white inline-block py-3 px-5 rounded-lg hover:opacity-80 transition-colors">重新整理</button>
      </div>
    </div>
    <div>
      <h2>所有使用者</h2>
      <div v-if="userLoading">loading</div>
      <ul v-auto-animate>
        <li v-for="user in userData" :key="user._id" class=" bg-gray-50 mb-2 p-3">
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
      <div v-if="userErr">
        <button @click="userRetry" class="bg-sky-600 text-white inline-block py-3 px-5 rounded-lg hover:opacity-80 transition-colors">重新整理</button>
      </div>
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
import { useTasks, deleteTask } from '../api/taskApi'
import { deleteUser, useUsers } from '../api/userApi'
import { useUserStore } from '../stores/user'

const store = useUserStore()

const {
  data: taskData,
  err: taskErr,
  retry: taskRetry,
  loading: taskLoading
} = useTasks()

const {
  data: userData,
  err: userErr,
  retry: userRetry,
  loading: userLoading
} = useUsers()

const deleteTheTask = async taskId => {
  await deleteTask(taskId)
  updateState()
}

const deleteTheUser = async userId => {
  await deleteUser(userId)
  updateState()
}

</script>