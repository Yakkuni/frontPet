export const petsRoutes = [
  {
    path: '/pets',
    name: 'pets',
    component: () => import('@/features/pets/views/PetsView.vue')
  },
  // Descomente e ative a rota para os detalhes do pet
  {
    path: '/pets/:uuid', // O :uuid é um parâmetro dinâmico
    name: 'pet-detalhe',
    component: () => import('@/features/pets/views/PetDetailView.vue')
  },
  {
    path: '/pets/add',
    name: 'addPet',
    // Se você criar uma página separada para adicionar pet, aponte aqui
    // Por enquanto, o formulário está num modal, então esta rota pode não ser usada
  }
]