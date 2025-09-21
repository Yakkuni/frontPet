<template>
  <div class="container mx-auto py-12">
    <div class="max-w-2xl mx-auto">
      <div class="flex items-center mb-8">
        <Button variant="ghost" as-child class="mr-2">
          <router-link to="/pets">
            <ArrowLeftIcon class="w-4 h-4 mr-2" />
            Voltar
          </router-link>
        </Button>
        <h1 class="text-3xl font-bold">Adicionar Pet</h1>
      </div>
      
      <Card>
        <CardContent class="p-6">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div class="space-y-2">
              <Label for="name">Nome do Pet</Label>
              <Input id="name" v-model="form.name" placeholder="Digite o nome do seu pet" />
            </div>
            
            <div class="space-y-2">
              <Label for="species">Espécie</Label>
              <select 
                id="species"
                v-model="form.species"
                class="w-full rounded-md border border-input bg-background px-3 py-2"
              >
                <option value="">Selecione uma espécie</option>
                <option value="dog">Cachorro</option>
                <option value="cat">Gato</option>
                <option value="bird">Pássaro</option>
                <option value="other">Outro</option>
              </select>
            </div>
            
            <div class="space-y-2">
              <Label for="breed">Raça</Label>
              <Input id="breed" v-model="form.breed" placeholder="Digite a raça do seu pet" />
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label for="age">Idade (anos)</Label>
                <Input id="age" type="number" v-model="form.age" min="0" max="30" />
              </div>
              
              <div class="space-y-2">
                <Label for="weight">Peso (kg)</Label>
                <Input id="weight" type="number" v-model="form.weight" min="0" step="0.1" />
              </div>
            </div>
            
            <div class="space-y-2">
              <Label>Sexo</Label>
              <div class="flex space-x-4">
                <div class="flex items-center">
                  <input 
                    type="radio" 
                    id="male" 
                    value="male" 
                    v-model="form.gender"
                    class="mr-2"
                  />
                  <Label for="male">Macho</Label>
                </div>
                <div class="flex items-center">
                  <input 
                    type="radio" 
                    id="female" 
                    value="female" 
                    v-model="form.gender"
                    class="mr-2"
                  />
                  <Label for="female">Fêmea</Label>
                </div>
              </div>
            </div>
            
            <div class="space-y-2">
              <Label for="photo">Foto do Pet</Label>
              <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input 
                  type="file" 
                  id="photo" 
                  accept="image/*"
                  class="hidden"
                  ref="fileInput"
                  @change="handleFileChange"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  @click="() => fileInput?.click()"
                >
                  <UploadIcon class="w-4 h-4 mr-2" />
                  Escolher arquivo
                </Button>
                <p v-if="selectedFile" class="mt-2">
                  {{ selectedFile.name }}
                </p>
              </div>
            </div>
            
            <div class="space-y-2">
              <Label for="notes">Observações</Label>
              <textarea 
                id="notes" 
                v-model="form.notes"
                rows="3"
                placeholder="Adicione informações importantes sobre seu pet"
                class="w-full rounded-md border border-input bg-background px-3 py-2"
              ></textarea>
            </div>
            
            <div class="flex justify-end space-x-4">
              <Button type="button" variant="outline" @click="$router.push('/pets')">
                Cancelar
              </Button>
              <Button type="submit" :disabled="isSubmitting">
                <span v-if="isSubmitting">Salvando...</span>
                <span v-else>Salvar Pet</span>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { Card, CardContent } from '@/components/ui/Card.vue';
import { Label } from '@/components/ui/Label.vue';
import { Input } from '@/components/ui/Input.vue';
import { Button } from '@/components/ui/Button.vue';
import { ArrowLeftIcon, UploadIcon } from 'lucide-vue-next';

const router = useRouter();
const fileInput = ref<HTMLInputElement | null>(null);
const selectedFile = ref<File | null>(null);
const isSubmitting = ref(false);

const form = reactive({
  name: '',
  species: '',
  breed: '',
  age: '',
  weight: '',
  gender: '',
  notes: ''
});

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    selectedFile.value = input.files[0];
  }
};

const handleSubmit = async () => {
  isSubmitting.value = true;
  
  // Here you would normally call your API to save the pet data
  // This is just a mock submission for demonstration
  setTimeout(() => {
    isSubmitting.value = false;
    router.push('/pets');
  }, 1500);
};
</script>