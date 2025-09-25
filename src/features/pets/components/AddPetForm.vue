<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
      <div class="space-y-2 md:col-span-2">
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
        <Label for="breed">Raça *</Label>
        <Combobox
          v-model="pet.breed"
          :options="breedOptions"
          placeholder="Selecione ou digite a raça"
        />
      </div>
      <div class="space-y-2">
        <Label for="dob">Data de Nascimento</Label>
        <Input id="dob" type="date" v-model="pet.dob" @input="calculateAge" />
      </div>
      <div class="space-y-2">
        <Label for="age">Idade (anos) *</Label>
        <Input id="age" type="number" v-model.number="pet.age" required min="0" />
      </div>
      <div class="space-y-2 md:col-span-2">
        <Label for="weight">Peso (kg)</Label>
        <Input id="weight" type="number" step="0.1" v-model.number="pet.weight" min="0" />
      </div>
    </div>

    <div>
      <h3 class="font-medium mb-2">Vacinas</h3>
      <div class="space-y-4 rounded-lg border p-4">
        <div v-if="pet.vaccines.length === 0" class="text-center text-sm text-muted-foreground">
          Nenhuma vacina adicionada.
        </div>
        <div v-for="(vaccine, index) in pet.vaccines" :key="index" class="flex items-end gap-2">
          <div class="flex-1 space-y-2">
            <Label :for="'vaccine-name-' + index">Nome da Vacina</Label>
            <Combobox
              :id="'vaccine-name-' + index"
              v-model="vaccine.name"
              :options="vaccineOptions"
              placeholder="Selecione a vacina"
            />
          </div>
          <div class="space-y-2">
            <Label :for="'vaccine-date-' + index">Data de Aplicação</Label>
            <Input :id="'vaccine-date-' + index" type="date" v-model="vaccine.date" />
          </div>
          <Button type="button" variant="destructive" size="icon" @click="removeVaccine(index)">
            <Trash2 class="h-4 w-4" />
          </Button>
        </div>
        <Button type="button" variant="outline" class="w-full" @click="addVaccine">
          <Plus class="h-4 w-4 mr-2" /> Adicionar Vacina
        </Button>
      </div>
    </div>

    <slot name="footer" :is-form-valid="isFormValid" />
  </form>
</template>

<script setup lang="ts">
import { reactive, computed, ref } from 'vue';
import { differenceInYears } from 'date-fns';
import { Plus, Trash2, User } from 'lucide-vue-next';
import Input from '@/components/ui/Input.vue';
import Label from '@/components/ui/Label.vue';
import Button from '@/components/ui/Button.vue';
import Combobox from '@/components/ui/Combobox.vue';

// Lógica para upload e pré-visualização da foto
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

// Mock de dados
const breedOptions = [
  { value: 'srd', label: 'SRD (Sem Raça Definida)' },
  { value: 'poodle', label: 'Poodle' },
  { value: 'labrador', label: 'Labrador Retriever' },
  { value: 'golden', label: 'Golden Retriever' },
  { value: 'bulldog', label: 'Bulldog Francês' },
  { value: 'shih_tzu', label: 'Shih Tzu' },
  { value: 'persa', label: 'Gato Persa' },
  { value: 'siames', label: 'Gato Siamês' },
  { value: 'maine_coon', label: 'Gato Maine Coon' },
];

const vaccineOptions = [
  { value: 'polivalente_v8', label: 'Polivalente V8 (Cães)' },
  { value: 'polivalente_v10', label: 'Polivalente V10 (Cães)' },
  { value: 'antirrabica', label: 'Antirrábica' },
  { value: 'gripe_canina', label: 'Gripe Canina' },
  { value: 'giardia', label: 'Giárdia' },
  { value: 'quadrupla_felina', label: 'Quádrupla Felina (V4)' },
  { value: 'quintupla_felina', label: 'Quíntupla Felina (V5)' },
];

type Vaccine = { name: string | null; date: string | null };

const pet = reactive({
  name: '',
  breed: null as string | null,
  dob: '',
  age: null as number | null,
  weight: null as number | null,
  vaccines: [] as Vaccine[],
});

const isFormValid = computed(() => !!pet.name && !!pet.breed && pet.age !== null && pet.age >= 0);

function calculateAge() {
  if (pet.dob) {
    pet.age = differenceInYears(new Date(), new Date(pet.dob));
  }
}

function addVaccine() {
  pet.vaccines.push({ name: null, date: null });
}
function removeVaccine(index: number) {
  pet.vaccines.splice(index, 1);
}

function handleSubmit() {
  if (!isFormValid.value) {
    alert('Por favor, preencha os campos obrigatórios (*).');
    return;
  }
  
  // Em uma aplicação real, você faria o upload do 'photoFile' para um servidor
  console.log('Pet salvo:', { ...pet, photo: photoFile.value?.name });
  alert(`Pet "${pet.name}" adicionado com sucesso!`);
}

defineExpose({ handleSubmit });
</script>