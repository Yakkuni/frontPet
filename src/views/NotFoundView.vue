<template>
  <div class="flex flex-col items-center justify-center min-h-screen py-12 bg-background">
    <div class="container px-4 md:px-6">
      <div class="flex flex-col items-center text-center space-y-4">
        <div class="flex items-center space-x-2 mb-4">
          <Paw class="h-8 w-8 text-primary" />
          <h1 class="text-2xl font-bold">ZamPet</h1>
        </div>
        <h2 class="text-3xl md:text-5xl font-bold tracking-tighter">
          Página não encontrada
        </h2>
        <p class="text-foreground/80 md:text-xl max-w-md mt-2">
          Oops! Parece que você se perdeu pelo caminho. Não conseguimos encontrar a página que você está procurando.
        </p>
        <div class="flex flex-col sm:flex-row gap-3 mt-6">
          <RouterLink to="/">
            <Button size="lg">
              Voltar ao início
            </Button>
          </RouterLink>
        </div>
        <div class="mt-8">
          <img src="/sorry.png" alt="Ilustração de cachorro confuso" class="max-w-xs mx-auto" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { PawPrint as Paw } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
</script>