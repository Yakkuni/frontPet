export const petsRoutes = [
  {
    // Esta será a página principal após o login
    path: '/pets',
    name: 'pets',
    component: () => import('@/features/pets/views/PetView.vue')
  },
  // Futuramente, as rotas de adicionar e detalhar pets virão aqui
  // {
  //   path: '/pets/add',
  //   name: 'addPet',
  //   component: () => import('@/features/pets/views/AddPetView.vue')
  // },
  // {
  //   path: '/pets/:id',
  //   name: 'petDetail',
  //   component: () => import('@/features/pets/views/PetDetailView.vue')
  // }
]