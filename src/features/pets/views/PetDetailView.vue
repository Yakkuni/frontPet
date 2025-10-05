<template>
  <div>
    <Navbar />
    <div class="container mx-auto py-12">
      <div v-if="isLoading" class="flex justify-center py-20">
        <p class="text-muted-foreground">A carregar informações do pet...</p>
      </div>
      
      <div v-else>
        <div class="flex items-center mb-12">
          <Button variant="ghost" as-child class="mr-4">
            <router-link to="/pets" class="flex items-center text-muted-foreground hover:text-foreground">
              <ArrowLeftIcon class="w-4 h-4 mr-2" />
              Voltar aos Pets
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
                  <div class="flex justify-between"><span class="font-medium">Espécie:</span> <span class="text-muted-foreground">{{ pet.species }}</span></div>
                  <div class="flex justify-between"><span class="font-medium">Raça:</span> <span class="text-muted-foreground">{{ pet.breed }}</span></div>
                  <div class="flex justify-between"><span class="font-medium">Idade:</span> <span class="text-muted-foreground">{{ pet.age }} anos</span></div>
                  <div class="flex justify-between"><span class="font-medium">Peso:</span> <span class="text-muted-foreground">{{ pet.weight }} kg</span></div>
                  <div class="flex justify-between"><span class="font-medium">Sexo:</span> <span class="text-muted-foreground">{{ pet.gender === 'male' ? 'Macho' : 'Fêmea' }}</span></div>
                </div>
                
                <div class="mt-6 flex space-x-2">
                  <Button variant="outline" class="flex-1"><PencilIcon class="w-4 h-4 mr-2" /> Editar</Button>
                  <Button variant="destructive" class="flex-1"><TrashIcon class="w-4 h-4 mr-2" /> Excluir</Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div class="md:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Observações Importantes</CardTitle>
              </CardHeader>
              <CardContent>
                <p class="text-muted-foreground">{{ pet.notes }}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Histórico Recente</CardTitle>
              </CardHeader>
              <CardContent class="space-y-6">
                <div>
                  <h4 class="font-semibold mb-3">Últimas Vacinas</h4>
                  <div v-if="latestVaccines.length === 0" class="text-sm text-center py-4 text-muted-foreground">Nenhuma vacina recente.</div>
                  <div v-else class="space-y-4">
                    <div v-for="service in latestVaccines" :key="service.name" class="border-b pb-3 last:border-b-0">
                      <div class="flex justify-between items-start">
                        <div>
                          <h3 class="font-medium">{{ service.name }}</h3>
                          <p class="text-sm text-muted-foreground">{{ service.date }}</p>
                        </div>
                        <span :class="service.statusClass" class="px-2 py-1 rounded-full text-xs font-medium">
                          {{ service.status }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 class="font-semibold mb-3">Últimos Serviços</h4>
                  <div v-if="latestOtherServices.length === 0" class="text-sm text-center py-4 text-muted-foreground">Nenhum outro serviço recente.</div>
                  <div v-else class="space-y-4">
                    <div v-for="service in latestOtherServices" :key="service.name" class="border-b pb-3 last:border-b-0">
                      <div class="flex justify-between items-start">
                        <div>
                          <h3 class="font-medium">{{ service.name }}</h3>
                          <p class="text-sm text-muted-foreground">{{ service.date }}</p>
                        </div>
                        <span :class="service.statusClass" class="px-2 py-1 rounded-full text-xs font-medium">
                          {{ service.status }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter class="flex-col sm:flex-row gap-2 sm:justify-center">
                <Button variant="default" class="w-full sm:w-auto"><Syringe class="w-4 h-4 mr-2" /> Ver todo o histórico de vacinas</Button>
                <Button class="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"><ClipboardList class="w-4 h-4 mr-2" /> Ver todos os serviços feitos</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Card from '@/components/ui/Card.vue';
import CardContent from '@/components/ui/CardContent.vue';
import CardHeader from '@/components/ui/CardHeader.vue';
import CardTitle from '@/components/ui/CardTitle.vue';
import CardFooter from '@/components/ui/CardFooter.vue';
import Button from '@/components/ui/Button.vue';
import { ArrowLeftIcon, PencilIcon, TrashIcon, Syringe, ClipboardList } from 'lucide-vue-next';

const isLoading = ref(true);

const pet = ref({
  id: 'mock-123',
  name: 'Rex',
  species: 'Cachorro',
  breed: 'Golden Retriever',
  age: 5,
  weight: 32.5,
  gender: 'male' as const,
  imageUrl: '/tittle.jpg',
  notes: 'Rex é muito dócil e adora brincar de buscar a bolinha. Tem alergia a frango e precisa de ração hipoalergénica. Fica ansioso quando ouve trovões.'
});

const allServices = ref([
  { name: 'Vacina Polivalente V10', date: '15/03/2025', status: 'Realizado', statusClass: 'bg-green-100 text-green-800', type: 'vaccine' },
  { name: 'Consulta de Rotina', date: '02/08/2025', status: 'Realizado', statusClass: 'bg-green-100 text-green-800', type: 'service' },
  { name: 'Banho e Tosa', date: '20/09/2025', status: 'Realizado', statusClass: 'bg-green-100 text-green-800', type: 'service' },
  { name: 'Vacina Antirrábica', date: '15/03/2025', status: 'Realizado', statusClass: 'bg-green-100 text-green-800', type: 'vaccine' },
  { name: 'Próxima Vacina (Gripe)', date: '15/03/2026', status: 'Agendado', statusClass: 'bg-blue-100 text-blue-800', type: 'vaccine' },
]);

const latestVaccines = computed(() => 
  allServices.value.filter(s => s.type === 'vaccine').slice(0, 2)
);

const latestOtherServices = computed(() => 
  allServices.value.filter(s => s.type === 'service').slice(0, 2)
);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 500);
});
</script>