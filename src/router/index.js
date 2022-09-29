import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '../stores/user'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignupView.vue')
    },
    {
      path: '/user',
      name: 'user',
      meta: { requiresAuth: true },
      component: () => import('../views/UserView.vue')
    },
    {
      path: '/task',
      name: 'task',
      meta: { requiresAuth: true },
      component: () => import('../views/TaskView.vue'),
      children: [
        {
          path: '/task/new',
          name: 'addTask',
          props: route => {
            return {
              owner: route.query.owner
            }
          },
          component: () => import('../views/AddNewTask.vue')
        },
        {
          path: '/task/update',
          name: 'updateTask',
          props: route => {
            return {
              taskId: route.query.taskId
            }
          },
          component: () => import('../views/UpdateTask.vue')
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      meta: { requiresAuth: true },
      component: () => import('../views/AdminView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: {
        name: 'home'
      }
    }
  ]
})

router.beforeEach((to, from) => {
  const store = useUserStore()
  if (to.meta.requiresAuth && !store.token) {
    return {
      path: '/login',
      query: {
        redirect: to.fullPath
      }
    }
  }
})

export default router
