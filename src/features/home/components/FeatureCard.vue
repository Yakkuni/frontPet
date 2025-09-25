<template>
  <div class="bg-card rounded-lg p-6 text-center shadow-sm border flex flex-col items-center transition-all hover:shadow-md hover:border-primary/50">
    <div class="bg-primary/10 p-3 rounded-full mb-4">
      <component :is="icon" class="h-8 w-8 text-primary" />
    </div>
    <h3 class="text-xl font-bold mb-2 text-card-foreground">{{ title }}</h3>
    <p class="text-muted-foreground">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
import type { FunctionalComponent } from 'vue';

defineProps<{
  icon: FunctionalComponent;
  title: string;
  description: string;
}>();
</script>