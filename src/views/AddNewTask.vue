<template>
  <main class=" w-5/6 mx-auto bg-white">
    <form @submit.prevent="addNewTask">
      <h2 class=" text-2xl leading-loose mb-4">新增任務</h2>
      <div class="mb-5">
        <p>
          <label for="username">填入使用者ID</label>
        </p>
        <p>
          <input id="username" disabled required v-model.trim="form.owner" type="text" placeholder="使用者ID" maxlength="10" minlength="1"
            class="w-full border-none p-4 bg-gray-200 focus:ring-2 focus:ring-primary rounded-full text-sm">
        </p>
      </div>
      <div class="mb-5">
        <p>
          <label for="content">填入任務內容</label>
        </p>
        <p>
          <input id="content" required v-model.trim="form.content" type="text" maxlength="10" minlength="4" placeholder="填入任務內容"
            class="w-full border-none p-4 bg-gray-200 focus:ring-2 focus:ring-primary rounded-full text-sm">
        </p>
      </div>
      <div class="mb-5">
        <input type="submit" value="新增任務"
          class=" bg-primary text-white py-3 w-full rounded-full cursor-pointer hover:opacity-80 transition">
      </div>
    </form>
  </main>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { addTask } from '../api/taskApi'

const route = useRoute()
const router = useRouter()
const redirect = route.query.redirect || '/task'


const props = defineProps({
  owner: {
    type: String
  }
})

const form = reactive({
  owner: '',
  content: ''
})

const addNewTask = async () => {
  await addTask({
    content: form.content,
    owner: form.owner
  })
  router.push({
    path: redirect
  })
}

onMounted(() => {
  form.owner = props.owner
})
</script>