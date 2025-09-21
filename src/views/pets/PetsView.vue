<template>
  <div class="container mx-auto py-12">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">Meus Pets</h1>
      <Button as-child>
        <router-link to="/pets/add">
          <PlusIcon class="w-4 h-4 mr-2" />
          Adicionar Pet
        </router-link>
      </Button>
    </div>
    
    <div v-if="isLoading" class="flex justify-center py-12">
      <p>Carregando...</p>
    </div>
    
    <div v-else-if="pets.length === 0" class="text-center py-12">
      <p class="text-lg mb-4">Você ainda não cadastrou nenhum pet.</p>
      <Button as-child>
        <router-link to="/pets/add">
          Adicionar meu primeiro pet
        </router-link>
      </Button>
    </div>
    
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card v-for="pet in pets" :key="pet.id" class="overflow-hidden">
        <img 
          :src="pet.imageUrl || '/placeholder-pet.jpg'" 
          :alt="pet.name"
          class="w-full h-48 object-cover"
        />
        <CardContent class="p-6">
          <CardTitle>{{ pet.name }}</CardTitle>
          <CardDescription>{{ pet.breed }}, {{ pet.age }} anos</CardDescription>
          
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
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/Card.vue';
import { Button } from '@/components/ui/Button.vue';
import { PlusIcon } from 'lucide-vue-next';

interface Pet {
  id: string;
  name: string;
  breed: string;
  age: number;
  imageUrl?: string;
}

const pets = ref<Pet[]>([]);
const isLoading = ref(true);

onMounted(() => {
  // Mock data loading
  setTimeout(() => {
    pets.value = [
      {
        id: '1',
        name: 'Rex',
        breed: 'Labrador',
        age: 3,
        imageUrl: '/placeholder.jpg'
      },
      {
        id: '2',
        name: 'Luna',
        breed: 'Poodle',
        age: 2,
        imageUrl: '/placeholder.jpg'
      },
      {
        id: '3',
        name: 'Max',
        breed: 'Golden Retriever',
        age: 4,
        imageUrl: '/placeholder.jpg'
      }
    ];
    isLoading.value = false;
  }, 1000);
});
</script>