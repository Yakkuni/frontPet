<template>
  <div class="min-h-screen flex flex-col">
    <div class="container flex h-16 items-center">
      <RouterLink to="/" class="flex items-center space-x-2">
        <Paw class="h-6 w-6 text-primary" />
        <span class="font-bold text-lg">ZamPet</span>
      </RouterLink>
      <div class="ml-auto">
        <ThemeToggle />
      </div>
    </div>

    <div class="flex-1 flex items-center justify-center p-4">
      <div class="w-full max-w-4xl flex items-center justify-center space-x-8 md:-mt-64">
        
        <div class="hidden md:flex flex-col items-center justify-center w-1/2 p-8">
          <img 
            src="/felizPet.png" 
            alt="Cão feliz sendo cuidado" 
            class="max-w-full h-auto rounded-lg shadow-xl"
          >
          <h2 class="text-4xl font-extrabold text-primary-foreground mt-6 text-center leading-tight">
            O bem-estar do seu melhor amigo, <span class="text-primary">em um só lugar.</span>
          </h2>
          <p class="text-lg text-muted-foreground mt-2 text-center">
            Gerencie vacinas, histórico e muito mais. Tudo para uma vida longa e feliz ao seu lado.
          </p>
        </div>

        <div class="w-full md:w-1/2 max-w-md space-y-8 p-4">
          <div class="text-center">
            <h1 class="text-3xl font-bold">Crie sua conta</h1>
            <p class="text-foreground/70 mt-2">Preencha os campos para começar</p>
          </div>

          <Card>
            <CardContent>
              <form @submit.prevent="handleRegister" class="space-y-4">
                <div class="space-y-2">
                  <Label for="name">Nome completo</Label>
                  <Input id="name" v-model="form.name" placeholder="Digite seu nome completo" required />
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <Label for="cpf">CPF</Label>
                    <Input id="cpf" v-model="form.cpf" @input="formatCPF" placeholder="000.000.000-00" maxlength="14" required />
                  </div>
                  <div class="space-y-2">
                    <Label for="birthdate">Data de Nascimento</Label>
                    <Input id="birthdate" type="date" v-model="form.birthdate" required />
                  </div>
                </div>

                <div class="space-y-2">
                  <Label for="email">Email</Label>
                  <Input id="email" type="email" v-model="form.email" placeholder="Digite seu email" required />
                </div>

                <div class="space-y-2">
                  <Label for="password">Senha</Label>
                  <div class="relative">
                    <Input
                      id="password"
                      :type="showPassword ? 'text' : 'password'"
                      v-model="form.password"
                      placeholder="Digite sua senha"
                      required
                    />
                    <button
                      type="button"
                      @click="showPassword = !showPassword"
                      class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      <span v-if="showPassword">🙈</span>
                      <span v-else>👁️</span>
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
                      required
                    />
                    <button
                      type="button"
                      @click="showConfirmPassword = !showConfirmPassword"
                      class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      <span v-if="showConfirmPassword">🙈</span>
                      <span v-else>👁️</span>
                    </button>
                  </div>
                </div>

                <div class="flex items-center space-x-2">
                  <Checkbox id="terms" v-model="form.acceptTerms" />
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
            </CardContent>
            <CardFooter>
              <p class="text-center text-sm text-foreground/70 w-full">
                Já possui uma conta?
                <RouterLink to="/auth/login" class="text-primary hover:underline">
                  Faça login
                </RouterLink>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import { PawPrint as Paw } from 'lucide-vue-next';
import { useAuthStore } from '@/stores/auth';
import Card from '@/components/ui/Card.vue';
import CardContent from '@/components/ui/CardContent.vue';
import CardFooter from '@/components/ui/CardFooter.vue';
import Label from '@/components/ui/Label.vue';
import Input from '@/components/ui/Input.vue';
import Checkbox from '@/components/ui/Checkbox.vue';
import Button from '@/components/ui/Button.vue';
import ThemeToggle from '@/components/ThemeToggle.vue';

const router = useRouter();
const authStore = useAuthStore();
const isLoading = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const form = reactive({
  name: '',
  cpf: '',
  birthdate: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false
});

const formatCPF = (event: Event) => {
  const input = event.target as HTMLInputElement;
  let value = input.value.replace(/\D/g, '');
  value = value.replace(/(\d{3})(\d)/, '$1.$2');
  value = value.replace(/(\d{3})(\d)/, '$1.$2');
  value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  form.cpf = value;
};

const handleRegister = async () => {
  if (!form.acceptTerms) {
    alert('Você precisa aceitar os termos de uso.');
    return;
  }
  if (form.password !== form.confirmPassword) {
    alert('As senhas não coincidem.');
    return;
  }

  isLoading.value = true;
  try {
    const apiData = { 
      fullName: form.name,
      cpf: form.cpf.replace(/\D/g, ''),
      birthDate: form.birthdate,
      email: form.email,
      password: form.password,
    };
    await authStore.register(apiData);
  } catch(error) {
    // A store já trata o alerta de erro
  } finally {
    isLoading.value = false;
  }
};
</script>