<script setup>
</script>

<template>
  <main class="container mx-auto bg-primary/10 text-center bg-teal-50 py-20">
    <h2 class=" text-2xl leading-loose mb-4">Hi 歡迎來到MEVN前端專案</h2>
    <p>這是一個可以任務管理系統,使用者創建帳戶後即可創建任務,修改任務,刪除任務or刪除帳戶</p>
    <p class=" divide-x-4">
      <router-link to="/user"
        class=" bg-sky-600 text-white inline-block py-3 px-5 rounded-lg hover:opacity-80 transition-colors">主頁面
      </router-link>
      <router-link to="/login"
        class=" bg-sky-600 text-white inline-block py-3 px-5 rounded-lg hover:opacity-80 transition-colors">登入
      </router-link>
      <router-link to="/signup"
        class=" bg-sky-600 text-white inline-block py-3 px-5 rounded-lg hover:opacity-80 transition-colors">創建
      </router-link>
    </p>
  </main>
</template>
