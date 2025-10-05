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
            src="/gatoCuidado.png" 
            alt="Gato a ser cuidado" 
            class="max-w-md w-full h-auto rounded-lg shadow-xl"
          >
          <h2 class="text-4xl font-extrabold text-primary-foreground mt-8 leading-tight">
            Seu melhor amigo <span class="text-primary">sentiu saudades</span>
          </h2>
          <p class="text-lg text-muted-foreground mt-2 max-w-sm">
            Acesse sua conta e agende o próximo cuidado.
          </p>
        </div>

        <div class="flex justify-center lg:justify-start">
          <div class="w-full max-w-md space-y-8">
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
                      <Input id="email" v-model="email" type="email" placeholder="seu@email.com" class="pl-10" required @input="authStore.clearError()" />
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
                      <Input id="password" v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="••••••••" class="pl-10" required @input="authStore.clearError()" />
                      <button type="button" @click="showPassword = !showPassword" class="absolute right-3 top-3 text-foreground/50">
                        <Eye v-if="!showPassword" class="h-4 w-4" />
                        <EyeOff v-else class="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div v-if="authStore.error" class="bg-destructive/10 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
                    <AlertCircle class="h-4 w-4" />
                    <p>{{ authStore.error }}</p>
                  </div>
                  <div class="flex items-center space-x-2">
                    <Checkbox id="remember" v-model="rememberMe" />
                    <Label for="remember" class="text-sm">Lembrar de mim</Label>
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
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
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
    // Chama a ação de login da store
    await authStore.login({
      email: email.value,
      password: password.value,
    });
    // O redirecionamento já é feito dentro da store em caso de sucesso
  } catch (error) {
    // A store já lida com o alerta de erro, não precisamos fazer nada aqui
  } finally {
    isLoading.value = false;
  }
};
</script>