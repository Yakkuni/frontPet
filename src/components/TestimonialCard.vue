<template>
  <div class="bg-card rounded-lg shadow-sm border p-6 transition-all hover:shadow-md hover:border-primary/50">
    <div class="flex flex-col h-full">
      <div class="flex items-start gap-4 mb-4">
        <img 
          :src="image" 
          :alt="name" 
          class="h-12 w-12 rounded-full object-cover"
        />
        <div>
          <h3 class="font-bold">{{ name }}</h3>
          <p class="text-foreground/70 text-sm">{{ pet }}</p>
        </div>
      </div>
      <div class="flex mb-4">
        <div v-for="star in 5" :key="star" class="text-accent">
          <Star v-if="star <= parseInt(rating)" class="h-4 w-4 fill-current" />
          <Star v-else class="h-4 w-4" />
        </div>
      </div>
      <p class="text-foreground/80 flex-grow">{{ testimonial }}</p>
      <div class="mt-4 pt-4 border-t border-border flex items-center justify-between">
        <span class="text-xs text-foreground/60">Cliente verificado</span>
        <Heart class="h-4 w-4 text-primary" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Star, Heart } from 'lucide-vue-next'

defineProps<{
  name: string
  pet: string
  image: string
  rating: string
  testimonial: string
}>()
</script>