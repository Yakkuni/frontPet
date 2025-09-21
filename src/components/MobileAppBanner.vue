<template>
  <section class="py-12 md:py-20 bg-card">
    <div class="container px-4 md:px-6">
      <div class="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div class="flex-1 space-y-4">
          <div class="inline-flex items-center rounded-full border border-primary/20 bg-background px-3 py-1 text-sm text-primary">
            <span class="font-medium">Novidade</span>
            <span class="ml-1 text-primary">App ZamPet</span>
          </div>
          <h2 class="text-3xl font-bold tracking-tighter mb-4">Cuide do seu pet de qualquer lugar</h2>
          <p class="text-foreground/80 md:text-lg">
            Baixe o aplicativo ZamPet para agendar serviços, receber lembretes de cuidados, acessar registros de saúde e 
            muito mais, tudo no seu smartphone.
          </p>
          <div class="flex flex-col sm:flex-row gap-3 pt-4">
            <Button class="bg-foreground text-background hover:bg-foreground/90">
              <AppleIcon class="mr-2 h-5 w-5" />
              App Store
            </Button>
            <Button class="bg-foreground text-background hover:bg-foreground/90">
              <AndroidIcon class="mr-2 h-5 w-5" />
              Google Play
            </Button>
          </div>
        </div>
        <div class="flex-1 relative">
          <div class="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden">
            <img 
              src="/placeholder.jpg" 
              alt="Aplicativo ZamPet" 
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent"></div>
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-card/90 backdrop-blur-sm p-4 rounded-xl border">
              <Paw class="h-12 w-12 text-primary mx-auto mb-2" />
              <div class="text-center">
                <h3 class="font-bold">ZamPet App</h3>
                <p class="text-xs text-foreground/70">Disponível para iOS e Android</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { PawPrint as Paw } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'

// Ícones para app stores
const AppleIcon = {
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"></path>
      <path d="M10 2c1 .5 2 2 2 5"></path>
    </svg>
  `
}

const AndroidIcon = {
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 15V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1"></path>
      <path d="M2 8h2"></path>
      <path d="M2 12h2"></path>
      <path d="M2 16h2"></path>
      <path d="M9 22v-4.5a2.5 2.5 0 0 1 5 0V22"></path>
    </svg>
  `
}
</script>