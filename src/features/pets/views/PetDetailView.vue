<template>
  <div>
    <div v-if="isNavigating" class="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <div class="text-center">
            <div class="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p class="text-lg font-medium text-foreground">Voltando para a lista de pets...</p>
        </div>
    </div>
    
    <Navbar />
    <div class="container mx-auto py-12">
      <div v-if="isLoading">
        <div class="flex items-center mb-12">
          <div class="w-36 h-10 bg-muted rounded-md mr-4 animate-pulse"></div>
          <div class="w-1/2 h-9 bg-muted rounded-md animate-pulse"></div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="md:col-span-1 space-y-4">
            <div class="w-full h-64 bg-muted rounded-lg animate-pulse"></div>
            <div class="w-full h-40 bg-muted rounded-lg animate-pulse"></div>
          </div>
          <div class="md:col-span-2 space-y-8">
            <div class="w-full h-32 bg-muted rounded-lg animate-pulse"></div>
            <div class="w-full h-48 bg-muted rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>

      <div v-else-if="error" class="text-center py-20 bg-destructive/10 text-destructive rounded-lg">
        <h2 class="text-2xl font-semibold mb-2">Ops! Algo deu errado</h2>
        <p>{{ error }}</p>
      </div>
      
      <div v-else-if="pet">
        <div class="flex items-center mb-12">
          <Button variant="ghost" @click="handleGoBack" class="mr-4 flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeftIcon class="w-4 h-4 mr-2" />
            Voltar aos Pets
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
                
                <div class="mt-6 flex flex-col sm:flex-row sm:space-x-2 gap-2">
                  <Button variant="outline" class="w-full sm:flex-1 flex items-center justify-center"><PencilIcon class="w-4 h-4 mr-2" /> <span>Editar</span></Button>
                  <Button variant="destructive" class="w-full sm:flex-1 flex items-center justify-center"><Skull class="w-4 h-4 mr-2" /> <span>Informar Óbito</span></Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div class="md:col-span-2 space-y-8">
            <Card>
              <CardHeader><CardTitle>Observações Importantes</CardTitle></CardHeader>
              <CardContent><p class="text-muted-foreground">{{ petNotes }}</p></CardContent>
            </Card>
            <Card class="border-yellow-500/50 bg-yellow-500/5">
              <CardHeader><CardTitle class="flex items-center gap-2"><AlertTriangle class="w-5 h-5 text-yellow-500" /> Alertas Próximos</CardTitle></CardHeader>
              <CardContent>
                <div v-if="upcomingAlerts.length === 0" class="text-center py-4 text-muted-foreground">Nenhum alerta para os próximos 2 meses.</div>
                <div v-else class="space-y-4">
                  <AlertItem v-for="alert in upcomingAlerts" :key="alert.name" :alert="alert" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Histórico Recente</CardTitle></CardHeader>
              <CardContent class="space-y-6">
                <div>
                  <h4 class="font-semibold mb-3">Últimas Vacinas</h4>
                  <div v-if="latestVaccines.length === 0" class="text-sm text-center py-4 text-muted-foreground">Nenhuma vacina recente.</div>
                  <div v-else class="space-y-4">
                    <div v-for="vaccine in latestVaccines" :key="vaccine.id" class="border-b pb-3 last:border-b-0">
                      <div>
                        <h3 class="font-medium">{{ vaccine.nome }}</h3>
                        <p class="text-sm text-muted-foreground">Aplicada em: {{ format(new Date(vaccine.data_aplicacao), 'dd/MM/yyyy') }}</p>
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
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';
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
import { ArrowLeftIcon, PencilIcon, TrashIcon, Syringe, ClipboardList, AlertTriangle, Stethoscope, PawPrint, Skull } from 'lucide-vue-next';

// --- ESTADO DO COMPONENTE ---
const isLoading = ref(true);
const pet = ref<any>(null);
const error = ref<string | null>(null);
const isNavigating = ref(false);

const router = useRouter();

// --- SETUP DO ROUTER ---
// receive uuid as a prop (route configured with props:true)
const props = defineProps<{ uuid?: string }>();
const route = useRoute();
const petUuid = computed(() => props.uuid || (route.params.uuid as string));

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
  return [...pet.value.vacinas]
    .sort((a: any, b: any) => new Date(b.data_aplicacao).getTime() - new Date(a.data_aplicacao).getTime())
    .slice(0, 3);
});

const upcomingAlerts = computed<Alert[]>(() => {
  if (!pet.value?.vacinas) return [];
  const today = new Date();
  const twoMonthsLimit = 60;

  return pet.value.vacinas
    .filter((vaccine: any) => vaccine.data_reforco)
    .map((vaccine: any) => ({
      ...vaccine,
      dueDate: new Date(vaccine.data_reforco),
      daysUntilDue: differenceInDays(new Date(vaccine.data_reforco), today),
    }))
    .filter((vaccine: any) => vaccine.daysUntilDue >= -7 && vaccine.daysUntilDue <= twoMonthsLimit) // inclui atrasos leves
    .sort((a: any, b: any) => a.daysUntilDue - b.daysUntilDue)
    .map((vaccine: any) => ({
      name: `Reforço: ${vaccine.nome}`,
      message:
        vaccine.daysUntilDue > 0
          ? `O reforço vence em ${formatDistanceToNow(vaccine.dueDate, { locale: ptBR })}`
          : `O reforço venceu há ${formatDistanceToNow(vaccine.dueDate, { locale: ptBR })}`,
      lastApplied: `Última aplicação: ${format(new Date(vaccine.data_aplicacao), 'dd/MM/yyyy')}`,
      icon: Syringe,
      urgencyClass:
        vaccine.daysUntilDue <= 14
          ? 'bg-red-500/10 text-red-700'
          : 'bg-yellow-500/10 text-yellow-700',
    }));
});

// --- LÓGICA DE CARREGAMENTO (quando o componente é montado) ---
async function loadPet(uuid: string | undefined) {
  console.debug('[PetDetailView] loading pet uuid =', uuid);
  if (!uuid) {
    error.value = 'UUID do pet inválido.';
    isLoading.value = false;
    return;
  }
  isLoading.value = true;
  try {
    const response = await petsService.getPetById(uuid);
    if (response.data.status === 'success') {
      pet.value = response.data.data;

      // --- MOCK PARA TESTE DE ALERTAS ---
      if (pet.value && Array.isArray(pet.value.vacinas)) {
        const today = new Date();
        const futureDate = new Date(today.getTime() + 9 * 24 * 60 * 60 * 1000); // daqui a 9 dias
        const mockVaccineAlert = {
          id: 999,
          nome: "Vacina de Teste (Urgente)",
          data_aplicacao: "2024-10-01",
          data_reforco: futureDate.toISOString().split('T')[0], // Formato YYYY-MM-DD
        };
        pet.value.vacinas.push(mockVaccineAlert);
      }
      // --- FIM DO MOCK ---

    } else {
      throw new Error(response.data.message || 'Pet não encontrado.');
    }
  } catch (err: any) {
    error.value = err.message || 'Não foi possível carregar os dados do pet.';
    console.error(err);
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  loadPet(petUuid.value);
});

// Re-load if route param changes without remounting
watch(petUuid, (newUuid: string | undefined, oldUuid: string | undefined) => {
  if (newUuid && newUuid !== oldUuid) loadPet(newUuid);
});

function handleGoBack() {
  // show overlay while navigating back to list
  isNavigating.value = true;
  // navigate to the pets list view
  router.push('/pets').catch(() => {
    // ignore navigation errors
  });
}
</script>
