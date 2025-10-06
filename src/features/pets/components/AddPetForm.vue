<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
      <div class="space-y-2 sm:col-span-2">
        <Label for="photo">Foto do Pet</Label>
        <div class="flex items-center gap-4">
          <div class="w-24 h-24 bg-muted rounded-full flex-shrink-0 overflow-hidden flex items-center justify-center">
            <img v-if="photoPreview" :src="photoPreview" alt="Pré-visualização do pet" class="w-full h-full object-cover">
            <User class="w-12 h-12 text-muted-foreground" v-else />
          </div>
          <Input id="photo" type="file" @change="handleFileChange" accept="image/*" class="flex-1" />
        </div>
      </div>

      <div class="space-y-2">
        <Label for="name">Nome do Pet *</Label>
        <Input id="name" v-model="pet.name" required />
      </div>
      
      <div class="space-y-2">
        <Label for="dob">Data de Nascimento *</Label>
        <Input id="dob" type="date" v-model="pet.dob" required />
      </div>

      <div class="space-y-2">
        <Label for="species">Espécie *</Label>
        <select 
          id="species"
          v-model="pet.species"
          class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          required
        >
          <option :value="null" disabled>Selecione uma espécie</option>
          <option v-for="s in speciesStore.allSpeciesData" :key="s.uuid" :value="s.uuid">
            {{ s.descricao }}
          </option>
        </select>
      </div>

      <div class="space-y-2">
        <Label for="breed" :class="!pet.species ? 'opacity-50' : ''">Raça *</Label>
        <Combobox
          v-model="pet.breed"
          :options="breedOptions"
          :disabled="!pet.species"
          placeholder="Selecione uma raça existente ou digite uma nova"
        />

        <!-- Mensagens de status -->
        <div class="mt-1 text-sm">
          <p v-if="isExistingBreed" class="text-green-600 flex items-center gap-1">
            ✓ Raça existente selecionada
          </p>

          <div v-else-if="showCreateBreedPrompt" class="text-blue-600 flex flex-col gap-2">
            <span>❓ Deseja criar essa raça "{{ newBreedName }}"?</span>
            <button 
              type="button"
              class="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 w-fit"
              @click="confirmCreateBreed"
            >
              Criar Raça
            </button>
          </div>

          <p v-else-if="pet.breed && pet.breed.length < 2 && pet.species" 
             class="text-gray-500 flex items-center gap-1">
            ⌨️ Digite pelo menos 2 caracteres para buscar ou criar raça
          </p>
        </div>
      </div>
      
      <div class="space-y-2 sm:col-span-2">
        <Label for="weight">Peso (kg)</Label>
        <Input id="weight" type="number" step="0.1" v-model.number="pet.weight" min="0" />
      </div>
    </div>

    <slot name="footer" :is-form-valid="isFormValid" />
  </form>
</template>

<script setup lang="ts">
import { reactive, computed, ref, onMounted, watch } from 'vue';
import { useSpeciesStore } from '@/stores/species';
import { petsService } from '@/api/petsService';
import { User } from 'lucide-vue-next';
import Input from '@/components/ui/Input.vue';
import Label from '@/components/ui/Label.vue';
import Combobox from '@/components/ui/Combobox.vue';

const speciesStore = useSpeciesStore();

// --- LÓGICA DA FOTO ---
const photoPreview = ref<string | null>(null);
const photoFile = ref<File | null>(null);
function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    photoFile.value = file;
    photoPreview.value = URL.createObjectURL(file);
  }
}

// --- ESTADO DO FORMULÁRIO ---
const pet = reactive({
  name: '',
  species: null as string | null,
  breed: null as string | null,
  dob: '',
  weight: undefined as number | undefined,
});

// --- OPÇÕES DE RAÇA ---
const breedOptions = computed(() => {
  if (!pet.species) return [];
  const selectedSpecies = speciesStore.allSpeciesData.find(s => s.uuid === pet.species);
  if (!selectedSpecies || !selectedSpecies.racas) return [];

  const existingBreeds = selectedSpecies.racas
    .filter(r => r && r.uuid && r.descricao)
    .map(r => ({ value: r.uuid, label: r.descricao }));

  return existingBreeds;
});

// --- VERIFICAÇÕES ---
const isExistingBreed = computed(() => {
  if (!pet.breed || !pet.species) return false;
  const selectedSpecies = speciesStore.allSpeciesData.find(s => s.uuid === pet.species);
  if (!selectedSpecies || !selectedSpecies.racas) return false;
  return selectedSpecies.racas.some(r => r && r.uuid === pet.breed);
});

const newBreedName = computed(() => {
  if (pet.breed && typeof pet.breed === 'string') return pet.breed.trim();
  return '';
});

// --- Mostrar o prompt de criação ---
const showCreateBreedPrompt = computed(() => {
  return (
    pet.species &&
    typeof pet.breed === 'string' &&
    pet.breed.trim().length >= 2 &&
    !isExistingBreed.value
  );
});

// --- Confirmação manual de criação ---
async function confirmCreateBreed() {
  const confirmed = confirm(`Deseja criar a raça "${newBreedName.value}"?`);
  if (confirmed) {
    await createNewBreed();
  }
}

// --- Criação de nova raça ---
async function createNewBreed() {
  if (!pet.species || !newBreedName.value) return null;

  try {
    // Use petsService so apiClient interceptor adds Authorization header
    const response = await petsService.createBreed({
      especie_uuid: pet.species,
      descricao: newBreedName.value,
    });

    const data = response.data;
    console.log('Resposta da criação de nova raça:', data);

    if (data?.status === 'success' && data?.data?.uuid) {
      pet.breed = data.data.uuid;

      const species = speciesStore.allSpeciesData.find(s => s.uuid === pet.species);
      if (species && Array.isArray(species.racas)) {
        // A interface Breed exige um `id:number` — adicionamos um id temporário 0.
        species.racas.push({
          id: 0,
          uuid: String(data.data.uuid),
          descricao: String(data.data.descricao),
        });
      }

      alert(`Raça "${data.data.descricao}" criada com sucesso!`);
      return data.data.uuid;
    } else {
      alert('Erro ao criar nova raça. Verifique os dados e tente novamente.');
      return null;
    }
  } catch (error) {
    console.error('Erro ao criar nova raça:', error);
    alert('Erro ao comunicar com o servidor.');
    return null;
  }
}

// --- Validação geral ---
const isFormValid = computed(() => {
  return !!pet.name && !!pet.species && !!pet.breed && !!pet.dob;
});

// --- Envio do formulário ---
async function handleSubmit() {
  if (!isFormValid.value) {
    alert('Por favor, preencha os campos obrigatórios (*).');
    return;
  }

  // Se a raça digitada não existir, cria automaticamente antes de enviar
  if (!isExistingBreed.value && typeof pet.breed === 'string') {
    const confirmed = confirm(`A raça "${pet.breed}" não existe. Deseja criá-la agora?`);
    if (confirmed) {
      const newBreedUuid = await createNewBreed();
      if (!newBreedUuid) return;
    } else {
      return; // cancela o envio
    }
  }

  const apiData: any = {
    nome: pet.name,
    data_nascimento: pet.dob,
    especie_uuid: pet.species,
    raca_uuid: pet.breed,
  };

  if (pet.weight) apiData.peso = pet.weight;

  console.log('Dados a serem enviados para a API:', apiData);
  alert(`Pet "${pet.name}" pronto para ser salvo!`);
}

onMounted(() => {
  speciesStore.fetchSpeciesAndBreeds();
});

defineExpose({ handleSubmit });
</script>
