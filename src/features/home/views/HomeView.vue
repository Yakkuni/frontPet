<template>
  <div class="flex flex-col min-h-screen bg-background">
    <Navbar />

    <main class="flex-1">
      <section class="py-20 md:py-32">
        <div class="container px-4 md:px-6 flex flex-col md:flex-row items-center justify-center gap-12 text-center md:text-left">
          
          <div class="max-w-xl space-y-4 md:w-1/2">
            <h1 class="text-4xl md:text-6xl font-bold tracking-tighter text-primary-foreground">
              Todo o cuidado que seu pet merece, <span class="text-primary">na palma da sua mão.</span>
            </h1>
            <p class="text-lg md:text-xl text-muted-foreground">
              Gerencie o histórico de saúde, vacinas e agendamentos do seu melhor amigo de forma simples e inteligente com o ZamPet.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 pt-4 md:justify-start justify-center">
              <RouterLink to="/auth/register">
                <Button size="lg" class="w-full sm:w-auto">Comece a cuidar agora</Button>
              </RouterLink>
              <RouterLink to="/sobre">
                <Button size="lg" variant="outline" class="w-full sm:w-auto">Saber mais</Button>
              </RouterLink>
            </div>
          </div>

          <div class="md:w-1/2 flex justify-center">
            <img 
              src="/tittle.jpg" 
              alt="Pessoa abraçando um cachorro feliz" 
              class="max-w-full h-auto rounded-xl shadow-lg object-cover w-[500px] h-[350px]"
            >
          </div>

        </div>
      </section>

      <section class="py-20 md:py-24 bg-muted">
        <div class="container px-4 md:px-6">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold tracking-tighter">A gestão completa da vida do seu pet</h2>
            <p class="text-muted-foreground md:text-lg max-w-2xl mx-auto mt-4">
              Organize todas as informações importantes e nunca mais perca um compromisso de saúde.
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              :icon="Fingerprint"
              title="Perfil Detalhado"
              description="Crie um perfil único para cada pet com nome, idade, raça, peso e fotos."
            />
            <FeatureCard
              :icon="Syringe"
              title="Controle de Vacinas"
              description="Registre todo o histórico de vacinas e receba alertas inteligentes antes do vencimento."
            />
            <FeatureCard
              :icon="ClipboardList"
              title="Histórico de Saúde"
              description="Mantenha um registro organizado de consultas, exames e medicamentos."
            />
          </div>
        </div>
      </section>

      <section class="py-20 md:py-24">
        <div class="container px-4 md:px-6">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold tracking-tighter">Simples de começar</h2>
            <p class="text-muted-foreground md:text-lg max-w-2xl mx-auto mt-4">
              Em apenas três passos, a vida do seu pet estará organizada.
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div class="space-y-4">
              <div class="inline-block bg-primary/10 text-primary p-4 rounded-full text-4xl font-bold">1</div>
              <h3 class="text-xl font-bold">Cadastre seu Pet</h3>
              <p class="text-muted-foreground">Preencha as informações do seu companheiro para criar um perfil completo.</p>
            </div>
            <div class="space-y-4">
              <div class="inline-block bg-primary/10 text-primary p-4 rounded-full text-4xl font-bold">2</div>
              <h3 class="text-xl font-bold">Registre as Vacinas</h3>
              <p class="text-muted-foreground">Adicione o histórico de vacinação com as datas de aplicação e vencimento.</p>
            </div>
            <div class="space-y-4">
              <div class="inline-block bg-primary/10 text-primary p-4 rounded-full text-4xl font-bold">3</div>
              <h3 class="text-xl font-bold">Receba Alertas</h3>
              <p class="text-muted-foreground">Fique tranquilo! Nós te avisaremos sobre as próximas vacinas e compromissos.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="py-20 md:py-32">
        <div class="container px-4 md:px-6 text-center">
          <div class="max-w-3xl mx-auto space-y-4">
            <h2 class="text-3xl md:text-4xl font-bold tracking-tighter text-primary-foreground">
              Pronto para simplificar a vida do seu pet?
            </h2>
            <p class="text-lg md:text-xl text-muted-foreground">
              Crie uma conta gratuita e comece a gerenciar a saúde do seu melhor amigo hoje mesmo.
            </p>
            <div class="pt-4">
              <RouterLink to="/auth/register">
                <Button size="lg">Cadastre-se Gratuitamente</Button>
              </RouterLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Fingerprint, Syringe, ClipboardList } from 'lucide-vue-next'
import Navbar from '@/components/Navbar.vue'
import Button from '@/components/ui/Button.vue'
import FeatureCard from '@/features/home/components/FeatureCard.vue'
</script>