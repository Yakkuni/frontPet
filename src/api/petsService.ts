import apiClient from './axios';

export const petsService = {
  // Busca a lista de todos os pets do utilizador logado
  getAllPets() {
    return apiClient.get('/v0/pets');
  },

  // Busca os detalhes de um pet específico pelo seu ID (UUID)
  getPetById(petId: string) {
    return apiClient.get(`/v0/pets/${petId}`);
  },

  getSpecies() {
    return apiClient.get('/module/tutor/v0/pet/especies');
  },

  createPet(petData: any) {
    return apiClient.post('/v0/pets', petData);
  },

  createBreed(data: { especie_uuid: string; descricao: string }) {
    return apiClient.post('/module/tutor/v0/pet/create-raca', data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    });
  }
};