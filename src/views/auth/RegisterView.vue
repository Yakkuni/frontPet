<template>
  <div class="container mx-auto py-12 flex justify-center">
    <div class="w-full max-w-md">
      <h1 class="text-3xl font-bold mb-8 text-center">Crie sua conta</h1>
      
      <Card>
        <CardContent>
          <form @submit.prevent="handleRegister" class="space-y-4">
            <div class="space-y-2">
              <Label for="name">Nome completo</Label>
              <Input id="name" v-model="form.name" placeholder="Digite seu nome completo" />
            </div>
            
            <div class="space-y-2">
              <Label for="email">Email</Label>
              <Input id="email" type="email" v-model="form.email" placeholder="Digite seu email" />
            </div>
            
            <div class="space-y-2">
              <Label for="password">Senha</Label>
              <div class="relative">
                <Input 
                  id="password"
                  :type="showPassword ? 'text' : 'password'"
                  v-model="form.password"
                  placeholder="Digite sua senha" 
                />
                <button 
                  type="button"
                  @click="togglePassword"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <i v-if="showPassword" class="icon">visibility_off</i>
                  <i v-else class="icon">visibility</i>
                </button>
              </div>
            </div>
            
            <div class="space-y-2">
              <Label for="confirmPassword">Confirme sua senha</Label>
              <div class="relative">
                <Input 
                  id="confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  v-model="form.confirmPassword"
                  placeholder="Confirme sua senha" 
                />
                <button 
                  type="button"
                  @click="toggleConfirmPassword"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <i v-if="showConfirmPassword" class="icon">visibility_off</i>
                  <i v-else class="icon">visibility</i>
                </button>
              </div>
            </div>
            
            <div class="flex items-center space-x-2">
              <Checkbox id="terms" v-model:checked="form.acceptTerms" />
              <Label for="terms" class="text-sm">
                Eu aceito os <a href="#" class="text-primary hover:underline">Termos de Uso</a> e a 
                <a href="#" class="text-primary hover:underline">Política de Privacidade</a>
              </Label>
            </div>
            
            <Button type="submit" class="w-full" :disabled="isLoading">
              <span v-if="isLoading">Registrando...</span>
              <span v-else>Registrar</span>
            </Button>
          </form>
          
          <div class="mt-4 text-center">
            <p class="text-sm">
              Já possui uma conta?
              <router-link to="/auth/login" class="text-primary hover:underline">
                Faça login
              </router-link>
            </p>
          </div>
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
import { Checkbox } from '@/components/ui/Checkbox.vue';
import { Button } from '@/components/ui/Button.vue';

const router = useRouter();
const isLoading = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false
});

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

const handleRegister = async () => {
  isLoading.value = true;
  
  // Here you would normally call your API to register the user
  // This is just a mock registration for demonstration
  setTimeout(() => {
    isLoading.value = false;
    router.push('/onboarding');
  }, 1500);
};
</script>