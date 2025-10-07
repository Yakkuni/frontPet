<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
      <!-- Foto removida conforme solicitado -->

      <div class="space-y-2">
        <Label for="name">Nome do Pet *</Label>
        <Input id="name" v-model="pet.name" required />
      </div>
      
      <div class="space-y-2">
        <Label for="dob">Data de Nascimento *</Label>
        <Input id="dob" type="date" v-model="pet.dob" required />
        <p v-if="pet.dob && !isDobValid" class="text-sm text-red-600">A data de nascimento não pode ser posterior à data de hoje.</p>
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
          <p v-if="breedErrorMessage" class="text-sm text-red-600 mt-1">{{ breedErrorMessage }}</p>
        </div>
      </div>
      
      <div class="space-y-2 sm:col-span-2">
        <Label for="sex">Sexo *</Label>
        <select
          id="sex"
          v-model="pet.sex"
          required
          class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option :value="null" disabled>Selecione o sexo</option>
          <option value="M">Macho</option>
          <option value="F">Fêmea</option>
        </select>
      </div>

      <div class="space-y-2 sm:col-span-2">
        <Label for="registro">Registro Geral Animal</Label>
        <Input id="registro" v-model="pet.registro" placeholder="Número de registro (opcional)" />
      </div>
    </div>

    <slot name="footer" :is-form-valid="isFormValid" />
  </form>
</template>

<script setup lang="ts">
import { reactive, computed, ref, onMounted, watch } from 'vue';
import { useSpeciesStore } from '@/stores/species';
import { petsService } from '@/api/petsService';
import Input from '@/components/ui/Input.vue';
import Label from '@/components/ui/Label.vue';
import Combobox from '@/components/ui/Combobox.vue';

const speciesStore = useSpeciesStore();

// Emits: 'created' (payload: created pet), 'close' (request parent to close modal)
const emit = defineEmits<{
  (e: 'created', pet: any): void;
  (e: 'close'): void;
}>();

const successMessage = ref('');

// Foto removida: não armazenamos preview nem arquivo no formulário

// --- ESTADO DO FORMULÁRIO ---
const pet = reactive({
  name: '',
  species: null as string | null,
  breed: null as string | null,
  dob: '',
  sex: null as string | null,
  registro: '',
});

// Prevent duplicate submissions
const isSubmitting = ref(false);

// Se a espécie mudar, limpar a raça para forçar selecionar novamente
watch(() => pet.species, () => {
  pet.breed = null;
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
// Consider a breed 'present' only when it has non-whitespace characters.
const hasBreedValue = computed(() => {
  return typeof pet.breed === 'string' && pet.breed.trim().length > 0;
});

const newBreedName = computed(() => {
  if (pet.breed && typeof pet.breed === 'string') return pet.breed.trim();
  return '';
});

const isExistingBreed = computed(() => {
  if (!hasBreedValue.value || !pet.species) return false;
  const selectedSpecies = speciesStore.allSpeciesData.find(s => s.uuid === pet.species);
  if (!selectedSpecies || !selectedSpecies.racas) return false;
  return selectedSpecies.racas.some(r => r && r.uuid === pet.breed);
});

// --- Mostrar o prompt de criação ---
const showCreateBreedPrompt = computed(() => {
  return pet.species && newBreedName.value.length >= 2 && !isExistingBreed.value;
});

// --- Confirmação manual de criação ---
async function confirmCreateBreed() {
  // Directly create the new breed without asking for browser confirmation
  await createNewBreed();
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
      return data.data.uuid;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Erro ao criar nova raça:', error);
    return null;
  }
}

// --- Validação da data de nascimento ---
// Use string compare because the input returns YYYY-MM-DD which compares
// lexicographically correctly for dates.
const todayISO = new Date().toISOString().slice(0, 10);
const isDobValid = computed(() => {
  if (!pet.dob) return false;
  return pet.dob <= todayISO;
});

// --- Validação geral ---
const isFormValid = computed(() => {
  // nome, data de nascimento (não futura) e sexo são obrigatórios; raça é opcional até
  // que o usuário selecione uma espécie — e a raça se torna obrigatória
  if (!pet.name || !pet.dob || !pet.sex) return false;
  if (!isDobValid.value) return false;
  // species and breed are now required
  if (!pet.species) return false;
  if (!hasBreedValue.value) return false;
  // if breed has a value, it must be an existing breed UUID
  if (!isExistingBreed.value) return false;
  return true;
});

const breedErrorMessage = computed(() => {
  if (!pet.species) return '';
  if (!hasBreedValue.value) return 'A raça é obrigatória.';
  if (!isExistingBreed.value) return 'A raça deve ser uma opção existente ou crie-a antes de salvar.';
  return '';
});

// --- Envio do formulário ---
async function handleSubmit() {
  if (isSubmitting.value) {
    return;
  }
  // Debug: log validation state so we can see why the guard may not run
  console.debug('[AddPetForm] validation check:', {
    isFormValid: isFormValid.value,
    isDobValid: isDobValid.value,
    name: pet.name,
    dob: pet.dob,
    sex: pet.sex,
    species: pet.species,
    breed: pet.breed,
  });

  if (!isFormValid.value) {
    console.warn('[AddPetForm] submit blocked by validation');
    alert('Por favor, preencha os campos obrigatórios (*).');
    return;
  }
  isSubmitting.value = true;
  // Determine a valid breed UUID to send (only send when it's an actual UUID
  // that exists for the selected species). This prevents sending free-text.
  const breedUuid = pet.breed && isExistingBreed.value ? pet.breed : null;

  const apiData: any = {
    name: pet.name,
    birthDate: pet.dob,
    sexo: pet.sex,
    registro_geral_animal: pet.registro || undefined,
  } as any;

  if (breedUuid) apiData.raca_uuid = breedUuid;
  if (pet.sex) apiData.sexo = pet.sex;
  if (pet.registro) apiData.registro = pet.registro;

    // Envia para a API e loga no console se foi bem sucedido ou não
    try {
      // Debug: mostrar a URL completa que axios usará
      try {
        // import apiClient dynamically to avoid circular imports at top-level
        const { default: apiClient } = await import('@/api/axios');
      
      } catch (e) {
      }

      const response = await petsService.createPet(apiData);

      if (response.data?.status === 'success') {
        // Log created pet UUID for quick debugging
        const createdUuid = response.data?.data?.uuid || response.data?.data?.id || null;

        // Notify parent to close the modal / form and provide created pet data
        try {
          emit('created', response.data.data);
          emit('close');
        } catch (e) {
          console.warn('emit error:', e);
        }

        // If backend returns a raca_uuid in the created pet payload, show it too
        const returnedBreedUuid = response.data?.data?.raca_uuid || response.data?.data?.breed_uuid || null;
        if (returnedBreedUuid) {
          console.log('UUID da raça retornada pela API:', returnedBreedUuid);
        }

  // opcional: reset do formulário
  // Object.assign(pet, { name: '', species: null, breed: null, dob: '', sex: null, registro: '' });
      } else {
        console.error('Resposta de erro da API ao criar pet:', response.data);
      }
    } catch (err) {
      console.error('Erro ao comunicar com a API ao criar pet:', err);
    } finally {
      isSubmitting.value = false;
    }

}

onMounted(() => {
  speciesStore.fetchSpeciesAndBreeds();
});

defineExpose({ handleSubmit });
</script>
