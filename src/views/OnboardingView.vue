<template>
  <div class="container mx-auto py-12">
    <div class="max-w-2xl mx-auto text-center mb-12">
      <h1 class="text-3xl font-bold mb-4">Bem-vindo ao ZamPet!</h1>
      <p class="text-lg text-muted-foreground">
        Vamos configurar seu perfil para melhorar sua experiência
      </p>
    </div>
    
    <div class="max-w-2xl mx-auto">
      <Card>
        <CardContent class="p-6">
          <div class="flex justify-between items-center mb-8">
            <div class="flex space-x-2">
              <div class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                1
              </div>
              <div class="w-20 h-1 bg-primary"></div>
              <div class="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                2
              </div>
              <div class="w-20 h-1 bg-primary/20"></div>
              <div class="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                3
              </div>
            </div>
            <div class="text-sm text-muted-foreground">
              Passo 1 de 3
            </div>
          </div>
          
          <form @submit.prevent="nextStep" class="space-y-6">
            <div>
              <h2 class="text-xl font-semibold mb-4">Informações Pessoais</h2>
              
              <div class="space-y-4">
                <div class="space-y-2">
                  <Label for="fullName">Nome Completo</Label>
                  <Input id="fullName" v-model="form.fullName" placeholder="Digite seu nome completo" />
                </div>
                
                <div class="space-y-2">
                  <Label for="phone">Telefone</Label>
                  <Input id="phone" v-model="form.phone" placeholder="(00) 00000-0000" />
                </div>
                
                <div class="space-y-2">
                  <Label for="birthdate">Data de Nascimento</Label>
                  <Input id="birthdate" type="date" v-model="form.birthdate" />
                </div>
                
                <div class="space-y-2">
                  <Label for="address">Endereço</Label>
                  <Input id="address" v-model="form.address" placeholder="Rua, número, bairro" />
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <Label for="city">Cidade</Label>
                    <Input id="city" v-model="form.city" placeholder="Sua cidade" />
                  </div>
                  
                  <div class="space-y-2">
                    <Label for="state">Estado</Label>
                    <select
                      id="state"
                      v-model="form.state"
                      class="w-full rounded-md border border-input bg-background px-3 py-2"
                    >
                      <option value="">Selecione</option>
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
                  <Input id="zipCode" v-model="form.zipCode" placeholder="00000-000" />
                </div>
              </div>
            </div>
            
            <div class="flex justify-end">
              <Button type="submit">
                Próximo
                <ArrowRightIcon class="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { Card, CardContent } from '@/components/ui/Card.vue';
import { Label } from '@/components/ui/Label.vue';
import { Input } from '@/components/ui/Input.vue';
import { Button } from '@/components/ui/Button.vue';
import { ArrowRightIcon } from 'lucide-vue-next';

const router = useRouter();

const form = reactive({
  fullName: '',
  phone: '',
  birthdate: '',
  address: '',
  city: '',
  state: '',
  zipCode: ''
});

const nextStep = () => {
  // In a real app, you would validate and save the data
  // Then redirect to the next step
  router.push('/dashboard');
};
</script>