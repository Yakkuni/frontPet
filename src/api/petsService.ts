import apiClient from './axios';

export const petsService = {
  // Busca a lista de todos os pets do utilizador logado
  getAllPets() {
    return apiClient.get('/v0/pets');
  },

  // Backwards-compatible alias: some views call `getMyPets`
  getMyPets() {
    // endpoint that returns the pets for the logged user
    return apiClient.get('/module/tutor/v0/pet/list-my-pets');
  },

  // Busca os detalhes de um pet específico pelo seu ID (UUID)
  getPetById(petId: string) {
    return apiClient.get(`/module/tutor/v0/pet/${petId}`);
  },

  getSpecies() {
    return apiClient.get('/module/tutor/v0/pet/especies');
  },

  createPet(petData: any) {
    // interceptor already adds Authorization header, avoid duplicating
    return apiClient.post('/module/tutor/v0/pet/create-pet', petData);
  },

  createBreed(data: { especie_uuid: string; descricao: string }) {
    return apiClient.post('/module/tutor/v0/pet/create-raca', data);
  }
};