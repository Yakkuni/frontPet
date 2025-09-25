export const profileRoutes = [
  {
    path: '/perfil',
    name: 'perfil',
    component: () => import('@/features/profile/views/ProfileView.vue')
  }
]