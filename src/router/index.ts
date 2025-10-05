import { createRouter, createWebHistory } from 'vue-router'
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'; // Importe os tipos aqui também
import { useUiStore } from '@/stores/ui'
import { useAuthStore } from '@/stores/auth'
import { homeRoutes } from '../features/home/routes'
import { authRoutes } from '../features/auth/routes'
import { aboutRoutes } from '../features/about/routes'
import { petsRoutes } from '../features/pets/routes'
import { profileRoutes } from '../features/profile/routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...homeRoutes,
    ...authRoutes,
    ...aboutRoutes,
    ...petsRoutes,
    ...profileRoutes,
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('@/views/NotFoundView.vue')
    }
  ]
})

// Aplique os tipos aos parâmetros do "navigation guard" global
router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const uiStore = useUiStore();
  const authStore = useAuthStore();
  
  uiStore.startLoading();

  const protectedRoutes = ['pets', 'perfil']; 
  
  if (protectedRoutes.includes(to.name as string) && !authStore.isAuthenticated) {
    next({ name: 'login' });
  } else {
    next();
  }
});

router.afterEach(() => {
  const uiStore = useUiStore();
  uiStore.stopLoading();
});

export default router;