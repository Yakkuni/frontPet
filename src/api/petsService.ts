import apiClient from './axios';

export const petsService = {
  // Busca a lista de todos os pets do usuário logado
  getAllPets() {
    return apiClient.get('/v0/pets'); // Ajuste o endpoint se necessário
  },

  // Busca os detalhes de um pet específico pelo seu ID (UUID)
  getPetById(petId: string) {
    return apiClient.get(`/v0/pets/${petId}`); // Ajuste o endpoint se necessário
  },

  // (Exemplo para o futuro) Adiciona um novo pet
  createPet(petData: any) {
    return apiClient.post('/v0/pets', petData);
  }
};