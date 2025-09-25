export const authRoutes = [
  {
    path: '/auth/register',
    name: 'register',
    component: () => import('@/features/auth/views/RegisterView.vue')
  },
  // Adicione a nova rota de login abaixo
  {
    path: '/auth/login',
    name: 'login',
    component: () => import('@/features/auth/views/LoginView.vue')
  }
]