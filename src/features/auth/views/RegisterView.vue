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
      <div class="w-full max-w-4xl flex items-center justify-center space-x-8 -mt-16 md:-mt-64">
        
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
import { ref, reactive, computed, onUnmounted } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import { PawPrint as Paw, AlertCircle } from 'lucide-vue-next';
import { useAuthStore } from '@/stores/auth';
// ... outras importações de componentes ...
import Card from '@/components/ui/Card.vue';
import CardContent from '@/components/ui/CardContent.vue';
import CardFooter from '@/components/ui/CardFooter.vue';
import Label from '@/components/ui/Label.vue';
import Input from '@/components/ui/Input.vue';
import Checkbox from '@/components/ui/Checkbox.vue';
import Button from '@/components/ui/Button.vue';
import ThemeToggle from '@/components/ThemeToggle.vue';


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

// Lógica de validação de senha
const passwordValidation = reactive({
  minLength: false,
  hasUppercase: false,
  hasNumber: false,
  hasSymbol: false,
});

const isPasswordValid = computed(() => Object.values(passwordValidation).every(Boolean));

function validatePassword() {
  const pass = form.password;
  passwordValidation.minLength = pass.length >= 8;
  passwordValidation.hasUppercase = /[A-Z]/.test(pass);
  passwordValidation.hasNumber = /\d/.test(pass);
  passwordValidation.hasSymbol = /[!@#$%^&*]/.test(pass);
}

const formatCPF = () => {
  let value = form.cpf.replace(/\D/g, '');
  value = value.replace(/(\d{3})(\d)/, '$1.$2');
  value = value.replace(/(\d{3})(\d)/, '$1.$2');
  value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  form.cpf = value;
};

const handleRegister = async () => {
  if (!isPasswordValid.value) {
    alert('A sua senha não cumpre todos os requisitos de segurança.');
    return;
  }
  if (form.password !== form.confirmPassword) {
    alert('As senhas não coincidem.');
    return;
  }
  // ... outras validações ...

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
    // A store já trata o erro, e o <template> irá exibi-lo
  } finally {
    isLoading.value = false;
  }
};

onUnmounted(() => {
  authStore.clearError();
});
</script>