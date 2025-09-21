<template>
  <div class="bg-card rounded-lg shadow-sm border p-6 transition-all hover:shadow-md hover:border-primary/50">
    <div class="flex items-center justify-between mb-4">
      <div class="bg-primary/10 p-3 rounded-full">
        <component :is="iconComponent" class="h-6 w-6 text-primary" />
      </div>
      <div class="flex items-center text-xs text-foreground/70">
        <Clock class="h-3 w-3 mr-1" />
        {{ duration }}
      </div>
    </div>
    <h3 class="text-xl font-bold mb-2">{{ title }}</h3>
    <p class="text-foreground/80 mb-4">{{ description }}</p>
    <Button variant="outline" class="w-full">
      Agendar
      <CalendarIcon class="h-4 w-4 ml-1" />
    </Button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { 
  Clock, 
  Calendar as CalendarIcon,
  Scissors,
  Stethoscope,
  Home,
  DogIcon,
  Cat,
  ShowerHead,
  Syringe
} from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'

const props = defineProps<{
  title: string
  description: string
  icon: string
  duration: string
}>()

const iconComponent = computed(() => {
  const iconMap: Record<string, any> = {
    Scissors,
    Stethoscope,
    Home,
    DogIcon,
    Cat,
    ShowerHead,
    Syringe
  }
  
  return iconMap[props.icon] || DogIcon
})
</script>