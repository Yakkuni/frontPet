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
      <div class="w-full max-w-md space-y-8">
        <div class="text-center">
          <h1 class="text-3xl font-bold">Bem-vindo de volta</h1>
          <p class="text-foreground/70 mt-2">Entre com sua conta para continuar</p>
        </div>

        <Card>
          <CardContent class="pt-6">
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

              <Button type="submit" class="w-full">
                <span v-if="isLoading" class="mr-2">
                  <Loader2 class="h-4 w-4 animate-spin" />
                </span>
                Entrar
              </Button>
            </form>

            <div class="mt-6">
              <div class="relative">
                <div class="absolute inset-0 flex items-center">
                  <span class="w-full border-t"></span>
                </div>
                <div class="relative flex justify-center text-xs uppercase">
                  <span class="bg-card px-2 text-foreground/70">Ou continue com</span>
                </div>
              </div>

              <div class="mt-4 grid grid-cols-2 gap-2">
                <Button variant="outline" type="button" class="justify-center">
                  <GoogleIcon class="mr-2 h-4 w-4" />
                  Google
                </Button>
                <Button variant="outline" type="button" class="justify-center">
                  <FacebookIcon class="mr-2 h-4 w-4" />
                  Facebook
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <p class="text-center text-sm text-foreground/70 w-full">
              Não tem uma conta?{" "}
              <RouterLink to="/auth/register" class="text-primary hover:underline">
                Cadastre-se
              </RouterLink>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { RouterLink } from 'vue-router'
import { PawPrint as Paw, Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import Label from '@/components/ui/Label.vue'
import Checkbox from '@/components/ui/Checkbox.vue'
import { Card, CardContent, CardFooter } from '@/components/ui/Card.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'

const router = useRouter()
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const rememberMe = ref(false)
const isLoading = ref(false)

const handleLogin = async () => {
  isLoading.value = true
  
  try {
    // Simulando um login
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Após login bem-sucedido, redirecionar para o dashboard
    router.push('/dashboard')
  } catch (error) {
    console.error('Erro ao fazer login:', error)
  } finally {
    isLoading.value = false
  }
}

// Componentes de ícones para serviços externos
const GoogleIcon = {
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M8 12 h8"></path>
      <path d="M12 8 v8"></path>
    </svg>
  `
}

const FacebookIcon = {
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
  `
}
</script>