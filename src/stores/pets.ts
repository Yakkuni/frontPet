import { defineStore } from 'pinia';
import { ref } from 'vue';
import { petsService } from '@/api/petsService';

// Definindo os tipos de dados para o Pet
export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  weight: number;
  gender: 'male' | 'female';
  imageUrl?: string;
  notes?: string;
}

export const usePetsStore = defineStore('pets', () => {
  const pets = ref<Pet[]>([]);
  const currentPet = ref<Pet | null>(null);
  const isLoading = ref(false);

  async function fetchAllPets() {
    isLoading.value = true;
    try {
      const response = await petsService.getAllPets();
      // Assumindo que a API retorna { data: [...] }
      pets.value = response.data.data; 
    } catch (error) {
      console.error("Erro ao buscar pets:", error);
      pets.value = []; // Limpa a lista em caso de erro
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchPetById(petId: string) {
    isLoading.value = true;
    currentPet.value = null; // Limpa o pet atual antes de buscar
    try {
      const response = await petsService.getPetById(petId);
      // Assumindo que a API retorna { data: {...} }
      currentPet.value = response.data.data;
    } catch (error) {
      console.error(`Erro ao buscar o pet com ID ${petId}:`, error);
      currentPet.value = null;
    } finally {
      isLoading.value = false;
    }
  }

  return { pets, currentPet, isLoading, fetchAllPets, fetchPetById };
});