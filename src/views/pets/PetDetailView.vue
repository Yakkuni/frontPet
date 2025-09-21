<template>
  <div class="container mx-auto py-12">
    <div v-if="isLoading" class="flex justify-center py-12">
      <p>Carregando...</p>
    </div>
    
    <div v-else-if="!pet" class="text-center py-12">
      <p class="text-lg mb-4">Pet não encontrado.</p>
      <Button as-child>
        <router-link to="/pets">
          Voltar para lista de pets
        </router-link>
      </Button>
    </div>
    
    <div v-else>
      <div class="flex items-center mb-8">
        <Button variant="ghost" as-child class="mr-2">
          <router-link to="/pets">
            <ArrowLeftIcon class="w-4 h-4 mr-2" />
            Voltar
          </router-link>
        </Button>
        <h1 class="text-3xl font-bold">{{ pet.name }}</h1>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="md:col-span-1">
          <Card>
            <img 
              :src="pet.imageUrl || '/placeholder.jpg'" 
              :alt="pet.name"
              class="w-full h-64 object-cover"
            />
            <CardContent class="p-6">
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span class="font-medium">Espécie:</span>
                  <span>{{ petSpecies }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-medium">Raça:</span>
                  <span>{{ pet.breed }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-medium">Idade:</span>
                  <span>{{ pet.age }} anos</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-medium">Peso:</span>
                  <span>{{ pet.weight }} kg</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-medium">Sexo:</span>
                  <span>{{ pet.gender === 'male' ? 'Macho' : 'Fêmea' }}</span>
                </div>
              </div>
              
              <div class="mt-6 flex space-x-4">
                <Button variant="outline" class="flex-1">
                  <PencilIcon class="w-4 h-4 mr-2" />
                  Editar
                </Button>
                <Button variant="destructive" class="flex-1">
                  <TrashIcon class="w-4 h-4 mr-2" />
                  Excluir
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div class="md:col-span-2">
          <Card class="mb-8">
            <CardContent class="p-6">
              <CardTitle class="mb-4">Observações</CardTitle>
              <p v-if="pet.notes">{{ pet.notes }}</p>
              <p v-else class="text-muted-foreground">Nenhuma observação adicionada.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent class="p-6">
              <CardTitle class="mb-4">Histórico de Serviços</CardTitle>
              
              <div v-if="services.length === 0" class="text-center py-6">
                <p class="text-muted-foreground">Nenhum serviço registrado para este pet.</p>
                <Button class="mt-4">
                  Agendar um serviço
                </Button>
              </div>
              
              <div v-else class="space-y-4">
                <div 
                  v-for="(service, index) in services" 
                  :key="index"
                  class="border-b pb-4 last:border-0 last:pb-0"
                >
                  <div class="flex justify-between items-start">
                    <div>
                      <h3 class="font-medium">{{ service.name }}</h3>
                      <p class="text-sm text-muted-foreground">
                        {{ service.date }} • {{ service.provider }}
                      </p>
                    </div>
                    <span :class="`px-2 py-1 rounded-full text-xs ${service.statusClass}`">
                      {{ service.status }}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Card, CardContent, CardTitle } from '@/components/ui/Card.vue';
import { Button } from '@/components/ui/Button.vue';
import { ArrowLeftIcon, PencilIcon, TrashIcon } from 'lucide-vue-next';

interface Pet {
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

interface Service {
  name: string;
  date: string;
  provider: string;
  status: string;
  statusClass: string;
}

const route = useRoute();
const petId = route.params.id as string;
const pet = ref<Pet | null>(null);
const isLoading = ref(true);
const services = ref<Service[]>([]);

const petSpecies = computed(() => {
  if (!pet.value) return '';
  
  const speciesMap: Record<string, string> = {
    dog: 'Cachorro',
    cat: 'Gato',
    bird: 'Pássaro',
    other: 'Outro'
  };
  
  return speciesMap[pet.value.species] || pet.value.species;
});

onMounted(() => {
  // Mock data loading
  setTimeout(() => {
    // Simulating API fetch for pet details
    pet.value = {
      id: petId,
      name: 'Rex',
      species: 'dog',
      breed: 'Labrador',
      age: 3,
      weight: 25.5,
      gender: 'male',
      imageUrl: '/placeholder.jpg',
      notes: 'Rex é muito ativo e adora brincar. Ele tem alergia a determinados tipos de ração e precisa de cuidados especiais com a alimentação.'
    };
    
    // Simulating API fetch for service history
    services.value = [
      {
        name: 'Consulta Veterinária',
        date: '10/09/2025',
        provider: 'Dr. Silva',
        status: 'Concluído',
        statusClass: 'bg-green-100 text-green-800'
      },
      {
        name: 'Banho e Tosa',
        date: '25/08/2025',
        provider: 'Pet Shop ZamPet',
        status: 'Concluído',
        statusClass: 'bg-green-100 text-green-800'
      },
      {
        name: 'Vacinação Anual',
        date: '30/09/2025',
        provider: 'Clínica VetCare',
        status: 'Agendado',
        statusClass: 'bg-blue-100 text-blue-800'
      }
    ];
    
    isLoading.value = false;
  }, 1000);
});
</script>