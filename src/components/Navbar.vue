<template>
  <nav class="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
    <div class="container flex h-16 items-center">
      <RouterLink to="/" class="flex items-center space-x-2">
        <Paw class="h-6 w-6 text-primary" />
        <span class="font-bold text-lg">ZamPet</span>
      </RouterLink>
      <div class="ml-auto flex items-center space-x-4">
        <div class="hidden md:flex md:items-center md:space-x-4">
          <RouterLink to="/services" class="text-sm font-medium transition-colors hover:text-primary">
            Serviços
          </RouterLink>
          <RouterLink to="/sobre" class="text-sm font-medium transition-colors hover:text-primary">
            Sobre
          </RouterLink>
          <RouterLink to="/auth/login" class="text-sm font-medium transition-colors hover:text-primary">
            Entrar
          </RouterLink>
          <RouterLink to="/auth/register">
            <Button>Cadastrar</Button>
          </RouterLink>
        </div>
        <ThemeToggle />
        <Button v-if="mobileMenuOpen" variant="ghost" size="icon" @click="mobileMenuOpen = false" class="md:hidden">
          <X class="h-5 w-5" />
          <span class="sr-only">Fechar menu</span>
        </Button>
        <Button v-else variant="ghost" size="icon" @click="mobileMenuOpen = true" class="md:hidden">
          <Menu class="h-5 w-5" />
          <span class="sr-only">Abrir menu</span>
        </Button>
      </div>
    </div>
    <div v-if="mobileMenuOpen" class="md:hidden">
      <div class="container py-4 space-y-3">
        <RouterLink 
          to="/services" 
          class="block text-sm font-medium transition-colors hover:text-primary"
          @click="mobileMenuOpen = false"
        >
          Serviços
        </RouterLink>
        <RouterLink 
          to="/sobre" 
          class="block text-sm font-medium transition-colors hover:text-primary"
          @click="mobileMenuOpen = false"
        >
          Sobre
        </RouterLink>
        <RouterLink 
          to="/auth/login" 
          class="block text-sm font-medium transition-colors hover:text-primary"
          @click="mobileMenuOpen = false"
        >
          Entrar
        </RouterLink>
        <RouterLink 
          to="/auth/register"
          @click="mobileMenuOpen = false"
        >
          <Button>Cadastrar</Button>
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Menu, X, PawPrint as Paw } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'

const mobileMenuOpen = ref(false)
</script>