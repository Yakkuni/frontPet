<template>
  <div class="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-lg">
    <img 
      src="/placeholder.jpg" 
      alt="Cachorro feliz sendo acariciado" 
      class="w-full h-full object-cover"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
    <div class="absolute bottom-4 left-4 flex items-center space-x-2 bg-card/80 backdrop-blur-sm p-2 rounded-lg">
      <div class="bg-primary h-3 w-3 rounded-full animate-pulse"></div>
      <span class="text-xs font-medium">Profissionais online</span>
    </div>
  </div>
</template>