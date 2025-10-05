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
            src="/gatoCuidado.png" 
            alt="Animal de estimação feliz" 
            class="max-w-full h-auto rounded-lg shadow-xl"
          >
          <h2 class="text-4xl font-extrabold text-primary-foreground mt-6 text-center leading-tight">
            Seu melhor amigo <span class="text-primary">sentiu saudades</span>
          </h2>
          <p class="text-lg text-muted-foreground mt-2 text-center">
            Acesse sua conta e agende o próximo cuidado.
          </p>
        </div>

        <div class="w-full md:w-1/2 max-w-md space-y-8 p-4">
          <div class="text-center">
            <h1 class="text-3xl font-bold">Bem-vindo de volta</h1>
            <p class="text-foreground/70 mt-2">Entre com sua conta para continuar</p>
          </div>

          <Card>
            <CardContent>
              <form @submit.prevent="handleLogin" class="space-y-4">
                <div class="space-y-2">
                  <Label for="email">Email</Label>
                  <div class="relative">
                    <Mail class="absolute left-3 top-3 h-4 w-4 text-foreground/50" />
                    <Input
                      id="email"
                      v-model="email"
                      type="email"
                      placeholder="seu@email.com"
                      class="pl-10"
                      required
                      @input="authStore.clearError()"
                    />
                  </div>
                </div>

                <div class="space-y-2">
                  <div class="flex items-center justify-between">
                    <Label for="password">Senha</Label>
                    <RouterLink to="/auth/forgot-password" class="text-xs text-primary hover:underline">
                      Esqueceu a senha?
                    </RouterLink>
                  </div>
                  <div class="relative">
                    <Lock class="absolute left-3 top-3 h-4 w-4 text-foreground/50" />
                    <Input
                      id="password"
                      v-model="password"
                      :type="showPassword ? 'text' : 'password'"
                      placeholder="••••••••"
                      class="pl-10"
                      required
                      @input="authStore.clearError()"
                    />
                    <button
                      type="button"
                      @click="showPassword = !showPassword"
                      class="absolute right-3 top-3 text-foreground/50"
                    >
                      <Eye v-if="!showPassword" class="h-4 w-4" />
                      <EyeOff v-else class="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div class="flex items-center space-x-2">
                  <Checkbox id="remember" v-model="rememberMe" />
                  <Label for="remember" class="text-sm">Lembrar de mim</Label>
                </div>

                <div v-if="authStore.error" class="bg-destructive/10 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
                  <AlertCircle class="h-4 w-4" />
                  <p>{{ authStore.error }}</p>
                </div>

                <Button type="submit" class="w-full" :disabled="isLoading">
                  <Loader2 v-if="isLoading" class="h-4 w-4 mr-2 animate-spin" />
                  Entrar
                </Button>
              </form>
            </CardContent>
            <CardFooter>
              <p class="text-center text-sm text-foreground/70 w-full">
                Não tem uma conta?
                <RouterLink to="/auth/register" class="text-primary hover:underline">
                  Cadastre-se
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
import { ref, onUnmounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { PawPrint as Paw, Eye, EyeOff, Mail, Lock, Loader2, AlertCircle } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import Label from '@/components/ui/Label.vue'
import Checkbox from '@/components/ui/Checkbox.vue'
import Card from '@/components/ui/Card.vue'
import CardContent from '@/components/ui/CardContent.vue'
import CardFooter from '@/components/ui/CardFooter.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'

const router = useRouter()
const authStore = useAuthStore()
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const rememberMe = ref(false)
const isLoading = ref(false)

const handleLogin = async () => {
  isLoading.value = true;
  try {
    await authStore.login({
      email: email.value,
      password: password.value,
    });
  } catch (error) {
    // A store já trata o erro, não precisamos fazer nada aqui
  } finally {
    isLoading.value = false;
  }
};

// Limpa a mensagem de erro quando o componente é desmontado (ex: o utilizador navega para outra página)
onUnmounted(() => {
  authStore.clearError();
});
</script>