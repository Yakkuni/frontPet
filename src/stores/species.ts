import { defineStore } from 'pinia';
import { ref } from 'vue';
import { petsService } from '@/api/petsService';

// Tipos atualizados para corresponder à resposta da API com 'uuid'
export interface Breed {
  id: number;
  uuid: string;
  descricao: string;
}

export interface Species {
  uuid: string;
  descricao: string;
  racas: Breed[];
}

export const useSpeciesStore = defineStore('species', () => {
  const allSpeciesData = ref<Species[]>([]);
  const isLoading = ref(false);

  async function fetchSpeciesAndBreeds() {
    if (allSpeciesData.value.length > 0) return; // Não busca novamente se já tiver os dados

    isLoading.value = true;
    try {
      const response = await petsService.getSpecies();
      allSpeciesData.value = response.data.data;
    } catch (error) {
      console.error("Erro ao buscar espécies e raças:", error);
      allSpeciesData.value = [];
    } finally {
      isLoading.value = false;
    }
  }

  return { allSpeciesData, isLoading, fetchSpeciesAndBreeds };
});