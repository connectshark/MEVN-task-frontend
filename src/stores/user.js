import { defineStore } from 'pinia'
import { getAllUsers } from '../api/userApi'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    users: []
  }),
  actions: {
    async updateUsers () {
      const res_users = await getAllUsers()
      this.users = res_users
    }
  }
})
