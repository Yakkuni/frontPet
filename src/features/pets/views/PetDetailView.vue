<template>
  <div>
    <Navbar />
    <div class="container mx-auto py-12">
      <div v-if="isLoading" class="flex justify-center py-20">
        <p class="text-muted-foreground">A carregar informações do pet...</p>
      </div>

      <div v-else-if="error" class="text-center py-20 bg-destructive/10 text-destructive rounded-lg">
        <h2 class="text-2xl font-semibold mb-2">Ops! Algo deu errado</h2>
        <p>{{ error }}</p>
      </div>
      
      <div v-else-if="pet">
        <div class="flex items-center mb-12">
          <Button variant="ghost" as-child class="mr-4">
            <router-link to="/pets" class="flex items-center text-muted-foreground hover:text-foreground">
              <ArrowLeftIcon class="w-4 h-4 mr-2" />
              Voltar aos Pets
            </router-link>
          </Button>
          <h1 class="text-3xl font-bold">{{ pet.nome }}</h1>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="md:col-span-1">
            <Card>
              <div class="w-full h-64 flex items-center justify-center bg-muted">
                <PawPrint class="w-24 h-24 text-muted-foreground/50" />
              </div>

              <CardContent class="p-6">
                <div class="space-y-2">
                  <div class="flex justify-between"><span class="font-medium">Espécie:</span> <span class="text-muted-foreground">{{ pet.especie }}</span></div>
                  <div class="flex justify-between"><span class="font-medium">Raça:</span> <span class="text-muted-foreground">{{ pet.raca }}</span></div>
                  <div class="flex justify-between"><span class="font-medium">Idade:</span> <span class="text-muted-foreground">{{ age }}</span></div>
                  <div class="flex justify-between"><span class="font-medium">Sexo:</span> <span class="text-muted-foreground">{{ formattedSex }}</span></div>
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
                <p class="text-muted-foreground">{{ petNotes }}</p>
              </CardContent>
            </Card>

            <Card class="border-yellow-500/50 bg-yellow-500/5">
              <CardHeader>
                <CardTitle class="flex items-center gap-2">
                  <AlertTriangle class="w-5 h-5 text-yellow-500" />
                  Alertas Próximos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div v-if="upcomingAlerts.length === 0" class="text-center py-4 text-muted-foreground">
                  Nenhum alerta para os próximos 2 meses.
                </div>
                <div v-else class="space-y-4">
                  <AlertItem v-for="alert in upcomingAlerts" :key="alert.name" :alert="alert" />
                </div>
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
                    <div v-for="vaccine in latestVaccines" :key="vaccine.id" class="border-b pb-3 last:border-b-0">
                      <div class="flex justify-between items-start">
                        <div>
                          <h3 class="font-medium">{{ vaccine.nome }}</h3>
                          <p class="text-sm text-muted-foreground">Aplicada em: {{ format(new Date(vaccine.data_aplicacao), 'dd/MM/yyyy') }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 class="font-semibold mb-3">Últimos Serviços</h4>
                  <div class="text-sm text-center py-4 text-muted-foreground">Nenhum outro serviço recente.</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import { format, differenceInDays, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Imports de Serviços
import { petsService } from '@/api/petsService';

// Imports de Componentes e Ícones
import Navbar from '@/components/Navbar.vue';
import Card from '@/components/ui/Card.vue';
import CardContent from '@/components/ui/CardContent.vue';
import CardHeader from '@/components/ui/CardHeader.vue';
import CardTitle from '@/components/ui/CardTitle.vue';
import Button from '@/components/ui/Button.vue';
import AlertItem, { type Alert } from '@/features/pets/components/AlertItem.vue';
import { ArrowLeftIcon, PencilIcon, TrashIcon, Syringe, ClipboardList, AlertTriangle, Stethoscope, PawPrint } from 'lucide-vue-next';

// --- ESTADO DO COMPONENTE ---
const isLoading = ref(true);
const pet = ref<any>(null);
const error = ref<string | null>(null);

// --- SETUP DO ROUTER ---
const route = useRoute();
const petUuid = route.params.uuid as string;

// --- PROPRIEDADES COMPUTADAS (para formatar dados da API) ---
const age = computed(() => {
    if (!pet.value?.data_nascimento) return 'Idade desconhecida';
    const birthDate = new Date(pet.value.data_nascimento);
    if (isNaN(birthDate.getTime())) return 'Data inválida';

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
});

const formattedSex = computed(() => {
  if (!pet.value) return '...';
  return pet.value.sexo === 'M' ? 'Macho' : 'Fêmea';
});

const petNotes = computed(() => {
    return pet.value?.notes || 'Nenhuma observação importante cadastrada.';
});

const latestVaccines = computed(() => {
  if (!pet.value?.vacinas) return [];
  // Cria uma cópia, ordena por data de aplicação (da mais nova para a mais antiga) e pega as 3 primeiras
  return [...pet.value.vacinas]
    .sort((a: any, b: any) => new Date(b.data_aplicacao).getTime() - new Date(a.data_aplicacao).getTime())
    .slice(0, 3);
});

const upcomingAlerts = computed<Alert[]>(() => {
  if (!pet.value?.vacinas) return [];
  const today = new Date();
  const twoMonthsLimit = 60; // Limite de 60 dias para alertas

  return pet.value.vacinas
    .filter((vaccine: any) => vaccine.data_reforco) // Apenas vacinas com data de reforço
    .map((vaccine: any) => ({
      ...vaccine,
      dueDate: new Date(vaccine.data_reforco),
      daysUntilDue: differenceInDays(new Date(vaccine.data_reforco), today),
    }))
    .filter((vaccine: any) => vaccine.daysUntilDue >= 0 && vaccine.daysUntilDue <= twoMonthsLimit) // Filtra reforços nos próximos 60 dias
    .sort((a: any, b: any) => a.daysUntilDue - b.daysUntilDue) // Ordena pelos mais próximos
    .map((vaccine: any) => ({
      name: `Reforço: ${vaccine.nome}`,
      message: `O reforço vence ${formatDistanceToNow(vaccine.dueDate, { locale: ptBR, addSuffix: true })}`,
      lastApplied: `Última aplicação em: ${format(new Date(vaccine.data_aplicacao), 'dd/MM/yyyy')}`,
      icon: Syringe,
      urgencyClass: vaccine.daysUntilDue <= 14 ? 'bg-red-500/10 text-red-700' : 'bg-yellow-500/10 text-yellow-700',
    }));
});

// --- LÓGICA DE CARREGAMENTO (quando o componente é montado) ---
onMounted(async () => {
  isLoading.value = true;
  try {
    const response = await petsService.getPetById(petUuid);
    if (response.data.status === 'success') {
      pet.value = response.data.data;
    } else {
      throw new Error(response.data.message || 'Pet não encontrado.');
    }
  } catch (err: any) {
    error.value = err.message || 'Não foi possível carregar os dados do pet.';
    console.error(err);
  } finally {
    isLoading.value = false;
  }
});
</script>