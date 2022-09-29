<template>
  <main class="">
    <div class=" bg-amber-900 text-white">
      <p class=" flex justify-between max-w-md mx-auto">
        <span>USERNAME:</span>
        <span>{{payload.userInfo.username}}</span>
      </p>
      <p class=" flex justify-between max-w-md mx-auto">
        <span>ID:</span>
        <span>{{payload.userInfo.id}}</span>
      </p>
    </div>
    <ul v-if="tasks?.length > 0">
      <li v-for="task in tasks" class=" max-w-md mx-auto bg-fuchsia-200 mb-4 p-4 rounded-xl">
        <p>OWNER: {{payload.userInfo.username}}</p>
        <p>ID: <span class=" text-xs">{{task._id}}</span></p>
        <p>CONTENT: {{task.content}}</p>
        <p>
          <router-link :to="{
              path: '/task/update',
              query: {
                taskId: task._id,
                redirect: '/user'
              }
            }"
              class=" mr-4 bg-amber-500 text-white inline-block py-3 px-5 rounded-lg hover:opacity-80 transition-colors">更新任務
            </router-link>
            <button @click="deleteTheTask(task._id)"
              class=" bg-slate-500 text-white inline-block py-3 px-5 rounded-lg hover:opacity-80 transition-colors">刪除任務
            </button>
        </p>
      </li>
    </ul>
    <ul v-else>
      <li class=" max-w-md mx-auto p-4 rounded-xl">無任務狀態</li>
    </ul>
    <div class=" max-w-md mx-auto p-4 rounded-xl">
      <router-link :to="{
        path: '/task/new',
        query: {
          owner: payload.userInfo.id,
          redirect: '/user'
        }
      }"
        class=" bg-sky-800 text-white inline-block py-3 px-5 rounded-lg hover:opacity-80 transition-colors">新增任務
      </router-link>
    </div>
  </main>
</template>

<script setup>
import { useJwt } from '@vueuse/integrations/useJwt'
import { onMounted, ref } from 'vue'
import { useUserStore } from '../stores/user'
import { getOwnerTasks } from '../api/taskApi'
import { deleteTask } from '../api/taskApi'
const store = useUserStore()

const { header, payload } = useJwt(store.token)

const tasks = ref([])

const updateTasks = async () => {
  const resData =  await getOwnerTasks({ ownerId: payload.value.userInfo.id })
  tasks.value = resData
}

onMounted(updateTasks)

const deleteTheTask = async taskId => {
  await deleteTask(taskId)
  updateTasks()
}

</script>