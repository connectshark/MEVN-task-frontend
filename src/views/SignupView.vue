<template>
  <main class=" w-5/6 mx-auto bg-white">
    <form @submit.prevent="signup">
      <h2 class=" text-2xl leading-loose mb-4">創建帳戶</h2>
      <div class="mb-5">
        <p>
          <label for="username">填入使用者名稱(最多10字)</label>
        </p>
        <p>
          <input id="username" required v-model.trim="form.username" type="text" placeholder="使用者名稱" maxlength="10" minlength="1"
            class="w-full border-none p-4 bg-gray-200 focus:ring-2 focus:ring-primary rounded-full text-sm">
        </p>
      </div>
      <div class="mb-5">
        <p>
          <label for="psw">填入登入密碼(需為4~10英文數字組合)</label>
        </p>
        <p>
          <input id="psw" required v-model.trim="form.password" type="password" maxlength="10" minlength="4" placeholder="使用者密碼"
            class="w-full border-none p-4 bg-gray-200 focus:ring-2 focus:ring-primary rounded-full text-sm">
        </p>
      </div>
      <div class="mb-5">
        <input type="submit" value="開始使用"
          class=" bg-primary text-white py-3 w-full rounded-full cursor-pointer hover:opacity-80 transition">
      </div>
    </form>
    <p v-if="msg" class=" bg-red-200 p-3 rounded-full text-gray-700">{{ msg }}</p>
  </main>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { createAccount } from '../api/userApi'

const route = useRoute()
const router = useRouter()
const redirect = route.query.redirect || '/'


const form = reactive({
  username: '',
  password: ''
})
const msg = ref('')
const signup = async () => {
  const res = await createAccount({
    username: form.username,
    password: form.password
  })
  msg.value = res.message
  setTimeout(() => {
    router.push({
      path: redirect
    })
  }, 1000)
}
</script>