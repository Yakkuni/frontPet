import HomeView from '@/features/home/views/HomeView.vue';
import { useAuthStore } from '@/stores/auth';
// 1. Importe os tipos necessários do vue-router
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';

export const homeRoutes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    // 2. Aplique os tipos aos parâmetros da função
    beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      const authStore = useAuthStore();
      
      if (authStore.isAuthenticated) {
        // Se o usuário estiver logado, a "página inicial" dele é a lista de pets.
        next({ name: 'pets' });
      } else {
        // Se não estiver logado, mostre a página inicial pública.
        next();
      }
    },
  },
];