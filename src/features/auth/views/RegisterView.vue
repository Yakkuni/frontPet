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

    <main class="flex-1 flex items-center justify-center p-4 pb-24">
      <div class="container grid items-center justify-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div class="hidden flex-col items-center justify-center text-center lg:flex">
          <img 
            src="/felizPet.png" 
            alt="Cão feliz sendo cuidado" 
            class="max-w-md w-full h-auto rounded-lg shadow-xl"
          >
          <h2 class="text-4xl font-extrabold text-primary-foreground mt-8 leading-tight">
            O bem-estar do seu melhor amigo, <span class="text-primary">em um só lugar.</span>
          </h2>
          <p class="text-lg text-muted-foreground mt-2 max-w-sm">
            Gerencie vacinas, histórico e muito mais. Tudo para uma vida longa e feliz ao seu lado.
          </p>
        </div>

        <div class="flex justify-center lg:justify-start">
          <div class="w-full max-w-md space-y-8">
            <div class="text-center">
              <h1 class="text-3xl font-bold">Crie sua conta</h1>
              <p class="text-foreground/70 mt-2">Preencha os campos para começar</p>
            </div>

            <Card>
              <CardContent>
                <form @submit.prevent="handleRegister" class="space-y-4">
                  <div class="space-y-2">
                    <Label for="name">Nome completo</Label>
                    <Input id="name" v-model="form.name" @input="authStore.clearError()" required />
                  </div>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="space-y-2">
                      <Label for="cpf">CPF</Label>
                      <Input id="cpf" v-model="form.cpf" @input="() => { formatCPF(); authStore.clearError(); }" placeholder="000.000.000-00" maxlength="14" required />
                    </div>
                    <div class="space-y-2">
                      <Label for="birthdate">Data de Nascimento</Label>
                      <Input id="birthdate" type="date" v-model="form.birthdate" @input="authStore.clearError()" required />
                      <p v-if="form.birthdate && !isAgeValid" class="text-sm text-red-600">Data inválida.</p>
                    </div>
                  </div>
                  <div class="space-y-2">
                    <Label for="email">Email</Label>
                    <Input id="email" type="email" v-model="form.email" @input="authStore.clearError()" required />
                  </div>
                  <div class="space-y-2">
                    <Label for="password">Senha</Label>
                    <div class="relative">
                      <Input id="password" :type="showPassword ? 'text' : 'password'" v-model="form.password" @input="() => { validatePassword(); authStore.clearError(); }" required />
                      <button type="button" @click="showPassword = !showPassword" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        <span v-if="showPassword">🙈</span>
                        <span v-else>👁️</span>
                      </button>
                    </div>
                    <div v-if="form.password.length > 0" class="text-xs space-y-1 mt-2">
                      <p :class="passwordValidation.minLength ? 'text-green-500' : 'text-muted-foreground'">✓ Mínimo de 8 caracteres</p>
                      <p :class="passwordValidation.hasUppercase ? 'text-green-500' : 'text-muted-foreground'">✓ Pelo menos uma letra maiúscula</p>
                      <p :class="passwordValidation.hasLowercase ? 'text-green-500' : 'text-muted-foreground'">✓ Pelo menos uma letra minúscula</p>
                      <p :class="passwordValidation.hasNumber ? 'text-green-500' : 'text-muted-foreground'">✓ Pelo menos um número</p>
                      <p :class="passwordValidation.hasSymbol ? 'text-green-500' : 'text-muted-foreground'">✓ Pelo menos um símbolo (!@#$%^&*)</p>
                    </div>
                  </div>
                  <div class="space-y-2">
                    <Label for="confirmPassword">Confirme sua senha</Label>
                     <div class="relative">
                      <Input id="confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" v-model="form.confirmPassword" required />
                      <button type="button" @click="showConfirmPassword = !showConfirmPassword" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        <span v-if="showConfirmPassword">🙈</span>
                        <span v-else>👁️</span>
                      </button>
                    </div>
                  </div>
                  <div v-if="authStore.error" class="bg-destructive/10 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
                    <AlertCircle class="h-4 w-4" />
                    <p>{{ authStore.error }}</p>
                  </div>
                  <div class="flex items-center space-x-2">
                    <Checkbox id="terms" v-model="form.acceptTerms" />
                    <Label for="terms" class="text-sm"> Eu aceito os <a href="#" class="text-primary hover:underline">Termos de Uso</a> e a <a href="#" class="text-primary hover:underline">Política de Privacidade</a></Label>
                  </div>
                  <Button type="submit" class="w-full" :disabled="isLoading || !isPasswordValid">
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
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onUnmounted } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import { PawPrint as Paw, AlertCircle } from 'lucide-vue-next';
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

// --- Validação de idade ---
function calculateYearsFromDate(dateStr: string) {
  if (!dateStr) return NaN;
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return NaN;
  const today = new Date();
  let years = today.getFullYear() - d.getFullYear();
  const m = today.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < d.getDate())) years--;
  return years;
}

const ageYears = computed(() => {
  return calculateYearsFromDate(form.birthdate);
});

const isAgeValid = computed(() => {
  if (!form.birthdate) return false;
  const years = ageYears.value;
  if (isNaN(years)) return false;
  // Not future and not older than 110
  return years >= 0 && years <= 110;
});

// Lógica de validação de senha
const passwordValidation = reactive({
  minLength: false,
  hasUppercase: false,
  hasNumber: false,
  hasSymbol: false,
  hasLowercase: false,
});

const isPasswordValid = computed(() => Object.values(passwordValidation).every(Boolean));

function validatePassword() {
  const pass = form.password;
  passwordValidation.minLength = pass.length >= 8;
  passwordValidation.hasUppercase = /[A-Z]/.test(pass);
  passwordValidation.hasLowercase = /[a-z]/.test(pass);
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
    authStore.error = 'A sua senha não cumpre todos os requisitos de segurança.';
    return;
  }
  if (!isAgeValid.value) {
    authStore.error = 'Data de nascimento inválida.';
    return;
  }
  if (form.password !== form.confirmPassword) {
    authStore.error = 'As senhas não coincidem.';
    return;
  }
  if (!form.acceptTerms) {
    authStore.error = 'Você precisa aceitar os termos de uso.';
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
    // A store já trata o erro, e o <template> irá exibi-lo
  } finally {
    isLoading.value = false;
  }
};

onUnmounted(() => {
  authStore.clearError();
});
</script>