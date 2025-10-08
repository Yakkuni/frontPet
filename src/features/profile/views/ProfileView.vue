<template>
  <div>
    <Navbar />
    <div class="container mx-auto py-12">
      <h1 class="text-3xl font-bold mb-8">Meu Perfil</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <Card>
            <CardContent class="p-6 text-center">
              <div class="w-32 h-32 mx-auto rounded-full bg-muted flex items-center justify-center mb-4 border-2 border-primary/20">
                <CircleUserRound class="w-20 h-20 text-muted-foreground/50" />
              </div>
              
              <h2 class="text-xl font-semibold truncate">{{ form.firstName }} {{ form.lastName }}</h2>
              <p class="text-muted-foreground truncate">{{ form.email }}</p>
              
              <div class="mt-4">
                <Button variant="outline" class="w-full">
                  <CameraIcon class="w-4 h-4 mr-2" />
                  Alterar foto
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div class="md:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
              <CardDescription>Atualize suas informações pessoais e de endereço.</CardDescription>
            </CardHeader>
            
            <CardContent>
              <form @submit.prevent="saveProfile" class="space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <Label for="firstName">Nome</Label>
                    <Input id="firstName" v-model="form.firstName" />
                  </div>
                  <div class="space-y-2">
                    <Label for="lastName">Sobrenome</Label>
                    <Input id="lastName" v-model="form.lastName" />
                  </div>
                </div>
                <div class="space-y-2">
                  <Label for="email">Email</Label>
                  <Input id="email" type="email" v-model="form.email" disabled />
                  <p class="text-xs text-muted-foreground">O email não pode ser alterado.</p>
                </div>
                <div class="space-y-2">
                  <Label for="phone">Telefone</Label>
                  <Input id="phone" v-model="form.phone" />
                </div>
                <div class="flex justify-end pt-4">
                  <Button type="submit" :disabled="isSaving">
                    <span v-if="isSaving">Salvando...</span>
                    <span v-else>Salvar Alterações</span>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card class="border-destructive">
            <CardHeader>
              <CardTitle class="flex items-center gap-2 text-destructive">
                <ShieldAlert class="w-5 h-5" />
                Zona de Perigo
              </CardTitle>
            </CardHeader>
            <CardContent class="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <div>
                <h3 class="font-semibold">Excluir sua conta</h3>
                <p class="text-sm text-muted-foreground mt-1">
                  Esta ação é permanente e todos os seus dados serão removidos.
                </p>
              </div>
              <Button 
                variant="destructive" 
                @click="isDeleteModalOpen = true" 
                class="mt-4 sm:mt-0"
              >
                Excluir Conta
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>

    <Dialog v-model:open="isDeleteModalOpen">
      <DialogContent>
        <DialogHeader>
          <DialogTitle class="text-xl">Você tem certeza absoluta?</DialogTitle>
          <DialogDescription class="pt-2">
            Esta ação é **permanente** e não pode ser desfeita. Isso irá excluir para sempre sua conta e todos os seus dados, incluindo seus pets e históricos.
            <br/><br/>
            Para confirmar, clique no botão vermelho.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter class="pt-4">
          <Button variant="outline" @click="isDeleteModalOpen = false">Cancelar</Button>
          <Button variant="destructive" @click="handleDeleteAccount" :disabled="isDeleting">
            <span v-if="isDeleting">Excluindo...</span>
            <span v-else>Sim, excluir minha conta</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Card from '@/components/ui/Card.vue';
import CardContent from '@/components/ui/CardContent.vue';
import CardHeader from '@/components/ui/CardHeader.vue';
import CardTitle from '@/components/ui/CardTitle.vue';
import CardDescription from '@/components/ui/CardDescription.vue';
import Label from '@/components/ui/Label.vue';
import Input from '@/components/ui/Input.vue';
import Button from '@/components/ui/Button.vue';
import { CameraIcon } from 'lucide-vue-next';

const isSaving = ref(false);

// Mock de dados do usuário
const form = reactive({
  firstName: 'Seu Nome',
  lastName: 'Seu Sobrenome',
  email: 'seuemail@email.com',
  phone: '(88) 98765-4321',
});

const saveProfile = () => {
  isSaving.value = true;
  // Simula uma chamada de API
  setTimeout(() => {
    isSaving.value = false;
    alert('Perfil atualizado com sucesso!');
  }, 1500);
};
</script>