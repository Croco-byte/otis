import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'AppHome',
    component: () => import('../views/AppHome.vue')
  },
  {
      path: '/new-project',
      name: 'NewProject',
      component: () => import('../views/NewProject.vue')
  }
]

const router = createRouter({
  history: process.env.IS_ELECTRON ? createWebHashHistory() : createWebHistory(),
  routes
})

export default router
