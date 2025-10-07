<template>
  <div>
    <Navbar />
    <div class="container mx-auto py-12">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold">Meus Pets</h1>
        <Button @click="isModalOpen = true">
          <PlusIcon class="w-4 h-4 mr-2" />
          Adicionar Pet
        </Button>
      </div>
      
      <div v-if="isLoading" class="flex justify-center py-12">
        <p class="text-muted-foreground">Carregando seus pets...</p>
      </div>
      
      <div v-else-if="pets.length === 0" class="text-center py-20 bg-muted rounded-lg">
        <h2 class="text-2xl font-semibold mb-2">Nenhum pet cadastrado</h2>
        <p class="text-muted-foreground mb-6">Parece que você ainda não adicionou nenhum companheiro.</p>
        <Button size="lg" @click="isModalOpen = true">
          Adicionar meu primeiro pet
        </Button>
      </div>
      
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card v-for="pet in pets" :key="pet.id" class="overflow-hidden">
          <img 
            :src="pet.imageUrl || '/placeholder-pet.jpg'" 
            :alt="pet.name"
            class="w-full h-48 object-cover"
          />
          <CardContent class="p-4">
            <CardTitle>{{ pet.name }}</CardTitle>
            <CardDescription>{{ pet.age }} anos</CardDescription>
            
            <div class="mt-4">
              <Button as-child variant="outline" class="w-full">
                <router-link :to="`/pets/${pet.id}`">
                  Ver detalhes
                </router-link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    <Dialog
      v-model:open="isModalOpen"
      title="Adicionar Novo Pet"
      description="Preencha as informações abaixo para cadastrar seu companheiro."
    >
      <AddPetForm ref="addPetFormRef">
        <template #footer="{ isFormValid }">
          <Button variant="outline" @click="isModalOpen = false">Cancelar</Button>
          <Button @click="submitForm" :disabled="!isFormValid" class="ml-2">Salvar Pet</Button>
        </template>
      </AddPetForm>
    </Dialog>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { PlusIcon, PawPrint } from 'lucide-vue-next';
import Navbar from '@/components/Navbar.vue';
import Button from '@/components/ui/Button.vue';
import Card from '@/components/ui/Card.vue';
import CardContent from '@/components/ui/CardContent.vue';
import CardTitle from '@/components/ui/CardTitle.vue';
import CardDescription from '@/components/ui/CardDescription.vue';
import Dialog from '@/components/ui/Dialog.vue';
import AddPetForm from '@/features/pets/components/AddPetForm.vue';
import { petsService } from '@/api/petsService';

// --- Lógica do Modal ---
const isModalOpen = ref(false);
const addPetFormRef = ref<{ handleSubmit: () => Promise<boolean> } | null>(null);

async function submitForm() {
  if (addPetFormRef.value) {
    const success = await addPetFormRef.value.handleSubmit();
    if (success) {
      isModalOpen.value = false;
      fetchPets();
    }
  }
}

// --- Interface e Estado dos Pets ---
interface Pet {
  uuid: string;
  name: string;
  age: string;
  imageUrl?: string;
}

const pets = ref<Pet[]>([]);
const isLoading = ref(true);

// --- Lógica de Busca de Dados ---
/**
 * Função de cálculo de idade ATUALIZADA.
 * Agora verifica se a data de nascimento é válida antes de calcular.
 */
function calculateAge(dob: string): string {
  if (!dob) return 'Idade desconhecida';
  const birthDate = new Date(dob);

  // Verificação para datas inválidas
  if (isNaN(birthDate.getTime())) {
    return 'Data inválida';
  }
  
  const today = new Date();
  let years = today.getFullYear() - birthDate.getFullYear();
  const months = today.getMonth() - birthDate.getMonth();
  
  if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
    years--;
  }

  if (years < 1) {
    const totalMonths = (today.getFullYear() - birthDate.getFullYear()) * 12 + months;
    return `${totalMonths} ${totalMonths === 1 ? 'mês' : 'meses'}`;
  }
  
  return `${years} ${years === 1 ? 'ano' : 'anos'}`;
}

async function fetchPets() {
  isLoading.value = true;
  try {
    const response = await petsService.getMyPets();
    // A estrutura response.data.data está correta com base no seu exemplo.
    const apiPets = response.data.data || []; 
    
    pets.value = apiPets.map((pet: any) => ({
      uuid: pet.uuid,
      name: pet.nome,
      age: calculateAge(pet.data_nascimento),
      // Mapeamento de foto ATUALIZADO para usar 'caminho_foto' ou 'photo_path'
      imageUrl: pet.caminho_foto || pet.photo_path
    }));
  } catch (error) {
    console.error("Erro ao buscar a lista de pets:", error);
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  fetchPets();
});
</script>