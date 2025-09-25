<template>
  <div class="flex flex-col min-h-screen bg-background">
    <Navbar />

    <main class="flex-1">
      <section class="relative py-20 md:py-32 bg-muted">
        <div class="container relative z-10 px-4 md:px-6">
          <div class="max-w-3xl mx-auto text-center">
            <h1 class="text-4xl md:text-5xl font-bold tracking-tighter text-primary-foreground">
              Nascido da paixão, criado para o cuidado.
            </h1>
            <p class="mt-4 text-lg md:text-xl text-muted-foreground">
              Conheça a história por trás do ZamPet e a nossa missão de simplificar a vida de quem ama seus animais de estimação.
            </p>
          </div>
        </div>
      </section>

      <section class="py-20 md:py-24">
        <div class="container px-4 md:px-6">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div class="prose prose-lg max-w-none prose-p:text-muted-foreground prose-h2:text-primary-foreground">
              <h2>Das salas de aula para a sua casa</h2>
              <p>
                O ZamPet não nasceu em uma sala de reuniões, mas sim de conversas entre amigos de faculdade. O que começou como um trabalho para uma disciplina rapidamente se tornou algo maior ao percebermos que a dificuldade em organizar a rotina de saúde dos pets era uma dor compartilhada por muitos.
              </p>
              <p>
                Vendo o potencial da ideia, investimos mais do nosso esforço e tempo para tornar esse projeto realidade, transformando uma necessidade acadêmica em uma solução real para tutores de pets em todo lugar.
              </p>
            </div>
            <div class="flex items-center justify-center">
              <img 
                src="/logo.png" 
                alt="Logo do ZamPet"
                class="rounded-full shadow-xl w-80 h-80 object-cover"
              >
            </div>
          </div>
        </div>
      </section>

      <section class="py-20 md:py-24 bg-muted">
        <div class="container px-4 md:px-6">
          <div class="grid md:grid-cols-2 gap-12 text-center md:text-left">
            <div class="space-y-4">
              <h2 class="text-3xl font-bold tracking-tighter text-primary-foreground">Nossa Missão</h2>
              <p class="text-lg text-muted-foreground">
                Oferecer a plataforma de gerenciamento mais completa e intuitiva para pets, proporcionando a paz de espírito de saber que o bem-estar do seu melhor amigo está organizado, acessível e sempre em dia.
              </p>
            </div>
            <div class="space-y-4">
              <h2 class="text-3xl font-bold tracking-tighter text-primary-foreground">Nossa Visão</h2>
              <p class="text-lg text-muted-foreground">
                Ser a referência nacional em cuidados com pets, inovando constantemente e estabelecendo novos padrões de qualidade no mercado, impulsionados pela paixão que deu início a tudo.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section class="py-20 md:py-24">
        <div class="container px-4 md:px-6">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold tracking-tighter">O que nos move</h2>
            <p class="text-muted-foreground md:text-lg max-w-2xl mx-auto mt-4">
              Nossos valores são o coração de tudo o que fazemos no ZamPet.
            </p>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <ValueCard :icon="Heart" title="Amor aos Animais" />
            <ValueCard :icon="Sparkles" title="Excelência" />
            <ValueCard :icon="Users" title="Comunidade" />
            <ValueCard :icon="Lightbulb" title="Inovação" />
            <ValueCard :icon="ShieldCheck" title="Confiança" />
          </div>
        </div>
      </section>

      <section class="py-20 bg-primary/10">
        <div class="container text-center">
          <h2 class="text-3xl font-bold tracking-tighter text-primary-foreground">Faça parte da nossa história</h2>
          <p class="text-muted-foreground md:text-lg max-w-2xl mx-auto mt-4 mb-8">
            Junte-se a milhares de tutores que estão a simplificar a gestão da saúde dos seus pets.
          </p>
          <RouterLink to="/auth/register">
            <Button size="lg">Comece a usar gratuitamente</Button>
          </RouterLink>
        </div>
      </section>

    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Heart, Sparkles, Users, Lightbulb, ShieldCheck } from 'lucide-vue-next'
import Navbar from '@/components/Navbar.vue'
import Button from '@/components/ui/Button.vue'
import ValueCard from '@/features/about/components/ValueCard.vue'
</script>