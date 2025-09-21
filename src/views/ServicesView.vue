<template>
  <div class="container mx-auto py-12">
    <h1 class="text-3xl font-bold mb-8">Nossos Serviços</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Service cards will go here -->
      <ServiceCard 
        title="Passeio com Pets" 
        description="Passeios diários com profissionais treinados para manter seu pet ativo e feliz."
        iconName="walk"
      />
      <ServiceCard 
        title="Banho e Tosa" 
        description="Serviços de higiene e estética completos realizados por profissionais experientes."
        iconName="bath"
      />
      <ServiceCard 
        title="Consulta Veterinária" 
        description="Atendimento veterinário em domicílio com profissionais qualificados."
        iconName="stethoscope"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ServiceCard from '@/components/ServiceCard.vue';
</script>