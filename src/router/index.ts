import { createRouter, createWebHistory } from 'vue-router'
import { useUiStore } from '@/stores/ui'
import { homeRoutes } from '../features/home/routes'
import { authRoutes } from '../features/auth/routes'
import { aboutRoutes } from '../features/about/routes'
import { petsRoutes } from '../features/pets/routes'
import { profileRoutes } from '../features/profile/routes' // 1. Importe as rotas

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...homeRoutes,
    ...authRoutes,
    ...aboutRoutes,
    ...petsRoutes,
    ...profileRoutes, // 2. Adicione as rotas aqui
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('@/views/NotFoundView.vue')
    }
  ]
})



export default router