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
  },
  {
      path: '/my-projects',
      name: 'MyProjects',
      component: () => import('../views/MyProjects.vue')
  },
  {
      path: '/project/:projectId',
      name: 'Project',
      component: () => import('../views/AppProject.vue')
  },
]

const router = createRouter({
  history: process.env.IS_ELECTRON ? createWebHashHistory() : createWebHistory(),
  routes
})

export default router
