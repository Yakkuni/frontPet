<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />

    <!-- Seção Hero -->
    <section class="bg-gradient-to-b from-muted to-background py-12 md:py-20">
      <div class="container px-4 md:px-6">
        <div class="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div class="flex-1 space-y-4">
            <div class="inline-flex items-center rounded-full border border-primary/20 bg-card px-3 py-1 text-sm text-primary">
              <span class="font-medium">Novo recurso</span>
              <span class="ml-1 text-primary">Consultas veterinárias online</span>
            </div>
            <h1 class="text-3xl md:text-5xl font-bold tracking-tighter text-primary-foreground">
              Cuidado amoroso para seus membros peludos da família
            </h1>
            <p class="text-foreground md:text-xl">
              ZamPet oferece serviços premium de cuidados para pets, desde banho e tosa até check-ups de saúde, tudo
              em uma plataforma conveniente.
            </p>
            <div class="flex flex-col sm:flex-row gap-3">
              <Button class="bg-primary hover:bg-primary-hover text-card">Agendar um atendimento</Button>
              <Button variant="outline" class="border-primary text-primary">
                Explorar serviços <ChevronRight class="ml-1 h-4 w-4" />
              </Button>
            </div>
            <div class="flex items-center gap-4 text-sm text-foreground">
              <div class="flex items-center gap-1">
                <Shield class="h-4 w-4 text-primary" />
                <span>Confiado por mais de 10.000 donos de pets</span>
              </div>
              <div class="flex items-center gap-1">
                <Heart class="h-4 w-4 text-primary" />
                <span>Serviços com 5 estrelas</span>
              </div>
            </div>
          </div>
          <div class="flex-1">
            <HeroImage />
          </div>
        </div>
      </div>
    </section>

    <!-- Seção Serviços -->
    <section class="py-12 md:py-20 bg-background">
      <div class="container px-4 md:px-6">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold tracking-tighter mb-4">Nossos Serviços Premium</h2>
          <p class="text-foreground/80 md:text-lg max-w-2xl mx-auto">
            Oferecemos uma variedade de serviços de cuidados para pets para garantir que seu companheiro receba o melhor
            tratamento possível.
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ServiceCard 
            title="Banho e Tosa"
            description="Dê ao seu pet um tratamento de spa completo com produtos premium e cuidados profissionais."
            icon="Scissors"
            duration="1-2 horas"
          />
          <ServiceCard 
            title="Check-up Veterinário"
            description="Consultas completas com veterinários experientes para monitorar a saúde do seu pet."
            icon="Stethoscope"
            duration="30 minutos"
          />
          <ServiceCard 
            title="Hospedagem"
            description="Um lar longe de casa para seu pet enquanto você está fora, com cuidados 24 horas."
            icon="Home"
            duration="Diária"
          />
        </div>
        <div class="text-center mt-10">
          <RouterLink to="/services">
            <Button class="mx-auto">Ver todos os serviços</Button>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Seção Testemunhos -->
    <section class="py-12 md:py-20 bg-muted">
      <div class="container px-4 md:px-6">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold tracking-tighter mb-4">O Que Nossos Clientes Dizem</h2>
          <p class="text-foreground/80 md:text-lg max-w-2xl mx-auto">
            Histórias reais de donos de pets satisfeitos que confiam na ZamPet para cuidar de seus companheiros.
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TestimonialCard 
            name="Carla Silva"
            pet="Max, Labrador"
            image="/placeholder-user.jpg"
            rating="5"
            testimonial="O banho e tosa sempre deixam meu Max cheiroso e lindo! A equipe é incrível e ele adora ir lá."
          />
          <TestimonialCard 
            name="Rafael Mendes"
            pet="Luna, Gato Siamês"
            image="/placeholder-user.jpg"
            rating="5"
            testimonial="A consulta veterinária online salvou minha Luna quando ela estava com um problema urgente. Serviço rápido e eficiente!"
          />
          <TestimonialCard 
            name="Juliana Costa"
            pet="Thor, Bulldog"
            image="/placeholder-user.jpg"
            rating="5"
            testimonial="A hospedagem da ZamPet é a única que confio para deixar meu Thor. Ele volta sempre feliz e bem cuidado."
          />
        </div>
      </div>
    </section>

    <!-- Seção App Mobile -->
    <MobileAppBanner />
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ChevronRight, Heart, Shield } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import Navbar from '@/components/Navbar.vue'
import HeroImage from '@/components/HeroImage.vue'
import ServiceCard from '@/components/ServiceCard.vue'
import TestimonialCard from '@/components/TestimonialCard.vue'
import MobileAppBanner from '@/components/MobileAppBanner.vue'
</script>