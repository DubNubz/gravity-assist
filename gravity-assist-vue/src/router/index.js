import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/home',
      name: 'home2',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/modules/color-generator/:colorName?/:compression?/:reversed?',
      name: 'color-generator',
      component: () => import('../views/ColorView.vue')
    },
    {
      path: '/modules/research-agreement-helper/:ship?/:manufacturer?/:direction?/:scope?',
      name: 'research-agreement-helper',
      component: () => import('../views/ResearchView.vue')
    },
    {
      path: '/modules/module-library/:ship?/:mod?',
      name: 'module-library',
      component: () => import('../views/LibraryView.vue')
    },
    {
      path: '/modules/equipment-encyclopedia/:type?/:item?',
      name: 'equipment-encyclopedia',
      component: () => import('../views/EquipmentView.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/PlaygroundView.vue')
    }
  ]
})

export default router
