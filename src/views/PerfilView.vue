<template>
  <div class="container mx-auto py-12">
    <h1 class="text-3xl font-bold mb-8">Meu Perfil</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <Card>
          <CardContent class="p-6 text-center">
            <div class="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4">
              <img src="/placeholder.jpg" alt="Foto de perfil" class="w-full h-full object-cover" />
            </div>
            
            <h2 class="text-xl font-semibold">João Silva</h2>
            <p class="text-muted-foreground">joao.silva@email.com</p>
            
            <div class="mt-4">
              <Button variant="outline" class="w-full">
                <CameraIcon class="w-4 h-4 mr-2" />
                Alterar foto
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div class="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Informações Pessoais</CardTitle>
            <CardDescription>Atualize suas informações pessoais</CardDescription>
          </CardHeader>
          
          <CardContent>
            <form @submit.prevent="saveProfile" class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
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
                <p class="text-xs text-muted-foreground">O email não pode ser alterado</p>
              </div>
              
              <div class="space-y-2">
                <Label for="phone">Telefone</Label>
                <Input id="phone" v-model="form.phone" />
              </div>
              
              <div class="space-y-2">
                <Label for="birthdate">Data de Nascimento</Label>
                <Input id="birthdate" type="date" v-model="form.birthdate" />
              </div>
              
              <div class="pt-4 border-t">
                <CardTitle class="text-lg mb-4">Endereço</CardTitle>
                
                <div class="space-y-4">
                  <div class="space-y-2">
                    <Label for="address">Endereço</Label>
                    <Input id="address" v-model="form.address" />
                  </div>
                  
                  <div class="grid grid-cols-2 gap-4">
                    <div class="space-y-2">
                      <Label for="city">Cidade</Label>
                      <Input id="city" v-model="form.city" />
                    </div>
                    
                    <div class="space-y-2">
                      <Label for="state">Estado</Label>
                      <select
                        id="state"
                        v-model="form.state"
                        class="w-full rounded-md border border-input bg-background px-3 py-2"
                      >
                        <option value="AC">Acre</option>
                        <option value="AL">Alagoas</option>
                        <option value="AP">Amapá</option>
                        <option value="AM">Amazonas</option>
                        <option value="BA">Bahia</option>
                        <option value="CE">Ceará</option>
                        <option value="DF">Distrito Federal</option>
                        <option value="ES">Espírito Santo</option>
                        <option value="GO">Goiás</option>
                        <option value="MA">Maranhão</option>
                        <option value="MT">Mato Grosso</option>
                        <option value="MS">Mato Grosso do Sul</option>
                        <option value="MG">Minas Gerais</option>
                        <option value="PA">Pará</option>
                        <option value="PB">Paraíba</option>
                        <option value="PR">Paraná</option>
                        <option value="PE">Pernambuco</option>
                        <option value="PI">Piauí</option>
                        <option value="RJ">Rio de Janeiro</option>
                        <option value="RN">Rio Grande do Norte</option>
                        <option value="RS">Rio Grande do Sul</option>
                        <option value="RO">Rondônia</option>
                        <option value="RR">Roraima</option>
                        <option value="SC">Santa Catarina</option>
                        <option value="SP">São Paulo</option>
                        <option value="SE">Sergipe</option>
                        <option value="TO">Tocantins</option>
                      </select>
                    </div>
                  </div>
                  
                  <div class="space-y-2">
                    <Label for="zipCode">CEP</Label>
                    <Input id="zipCode" v-model="form.zipCode" />
                  </div>
                </div>
              </div>
              
              <div class="pt-4 border-t">
                <CardTitle class="text-lg mb-4">Segurança</CardTitle>
                
                <div class="space-y-4">
                  <Button type="button" variant="outline" @click="showPasswordForm = !showPasswordForm">
                    <LockIcon class="w-4 h-4 mr-2" />
                    Alterar senha
                  </Button>
                  
                  <div v-if="showPasswordForm" class="space-y-4 pt-4 border-t">
                    <div class="space-y-2">
                      <Label for="currentPassword">Senha atual</Label>
                      <Input id="currentPassword" type="password" v-model="passwordForm.current" />
                    </div>
                    
                    <div class="space-y-2">
                      <Label for="newPassword">Nova senha</Label>
                      <Input id="newPassword" type="password" v-model="passwordForm.new" />
                    </div>
                    
                    <div class="space-y-2">
                      <Label for="confirmPassword">Confirmar nova senha</Label>
                      <Input id="confirmPassword" type="password" v-model="passwordForm.confirm" />
                    </div>
                    
                    <Button type="button" @click="updatePassword">
                      Atualizar senha
                    </Button>
                  </div>
                </div>
              </div>
              
              <div class="flex justify-end space-x-4 pt-4">
                <Button type="button" variant="outline" @click="resetForm">
                  Cancelar
                </Button>
                <Button type="submit" :disabled="isSaving">
                  <span v-if="isSaving">Salvando...</span>
                  <span v-else>Salvar alterações</span>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card.vue';
import { Label } from '@/components/ui/Label.vue';
import { Input } from '@/components/ui/Input.vue';
import { Button } from '@/components/ui/Button.vue';
import { CameraIcon, LockIcon } from 'lucide-vue-next';

const isSaving = ref(false);
const showPasswordForm = ref(false);

// Mock user data
const form = reactive({
  firstName: 'João',
  lastName: 'Silva',
  email: 'joao.silva@email.com',
  phone: '(11) 98765-4321',
  birthdate: '1990-05-15',
  address: 'Rua das Flores, 123',
  city: 'São Paulo',
  state: 'SP',
  zipCode: '01234-567'
});

const passwordForm = reactive({
  current: '',
  new: '',
  confirm: ''
});

const saveProfile = () => {
  isSaving.value = true;
  
  // Mock API call
  setTimeout(() => {
    isSaving.value = false;
    alert('Perfil atualizado com sucesso!');
  }, 1500);
};

const resetForm = () => {
  // Reset form to original values
  Object.assign(form, {
    firstName: 'João',
    lastName: 'Silva',
    email: 'joao.silva@email.com',
    phone: '(11) 98765-4321',
    birthdate: '1990-05-15',
    address: 'Rua das Flores, 123',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01234-567'
  });
};

const updatePassword = () => {
  // Mock password update
  if (passwordForm.new !== passwordForm.confirm) {
    alert('As senhas não coincidem');
    return;
  }
  
  // Here you would call your API to update the password
  alert('Senha atualizada com sucesso!');
  
  // Reset form
  passwordForm.current = '';
  passwordForm.new = '';
  passwordForm.confirm = '';
  showPasswordForm.value = false;
};
</script>