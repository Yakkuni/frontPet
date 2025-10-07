<template>
  <nav class="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
    <div class="container flex h-16 items-center">
      <RouterLink to="/" class="flex items-center space-x-2">
        <Paw class="h-6 w-6 text-primary" />
        <span class="font-bold text-lg">ZamPet</span>
      </RouterLink>
      <div class="ml-auto flex items-center space-x-4">
        <div class="hidden md:flex md:items-center md:space-x-4">
          <RouterLink to="/suporte" class="text-sm font-medium transition-colors hover:text-primary">
            Suporte
          </RouterLink>
          <RouterLink to="/sobre" class="text-sm font-medium transition-colors hover:text-primary">
            Sobre
          </RouterLink>

          <template v-if="authStore.isAuthenticated">
            <RouterLink to="/pets" class="text-sm font-medium transition-colors hover:text-primary">
              Meus Pets
            </RouterLink>
            <RouterLink to="/perfil" class="text-sm font-medium transition-colors hover:text-primary">
              Meu Perfil
            </RouterLink>
            <Button variant="ghost" @click="handleLogout">Sair</Button>
          </template>

          <template v-else>
            <RouterLink to="/auth/login" class="text-sm font-medium transition-colors hover:text-primary">
              Entrar
            </RouterLink>
            <RouterLink to="/auth/register">
              <Button>Cadastrar</Button>
            </RouterLink>
          </template>
        </div>
        <ThemeToggle />
        <Button variant="ghost" size="icon" @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden">
          <X v-if="mobileMenuOpen" class="h-5 w-5" />
          <Menu v-else class="h-5 w-5" />
          <span class="sr-only">Abrir menu</span>
        </Button>
      </div>
    </div>
    <div v-if="mobileMenuOpen" class="md:hidden">
      <div class="container py-4 space-y-3">
        <RouterLink to="/suporte" class="block text-sm font-medium transition-colors hover:text-primary" @click="mobileMenuOpen = false">
          Suporte
        </RouterLink>
        <RouterLink to="/sobre" class="block text-sm font-medium transition-colors hover:text-primary" @click="mobileMenuOpen = false">
          Sobre
        </RouterLink>
        
        <template v-if="authStore.isAuthenticated">
          <RouterLink to="/pets" class="block text-sm font-medium transition-colors hover:text-primary" @click="mobileMenuOpen = false">
            Meus Pets
          </RouterLink>
          <RouterLink to="/perfil" class="block text-sm font-medium transition-colors hover:text-primary" @click="mobileMenuOpen = false">
            Meu Perfil
          </RouterLink>
          <Button variant="ghost" @click="handleLogout" class="w-full justify-start">Sair</Button>
        </template>
        
        <template v-else>
          <RouterLink to="/auth/login" class="block text-sm font-medium transition-colors hover:text-primary" @click="mobileMenuOpen = false">
            Entrar
          </RouterLink>
          <RouterLink to="/auth/register" @click="mobileMenuOpen = false">
            <Button class="w-full">Cadastrar</Button>
          </RouterLink>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { Menu, X, PawPrint as Paw } from 'lucide-vue-next';
import { useAuthStore } from '@/stores/auth';
import Button from '@/components/ui/Button.vue';
import ThemeToggle from '@/components/ThemeToggle.vue';

const authStore = useAuthStore();
const mobileMenuOpen = ref(false);

const handleLogout = () => {
  mobileMenuOpen.value = false;
  authStore.logout();
};
</script>