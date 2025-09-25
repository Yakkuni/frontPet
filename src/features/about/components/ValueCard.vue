<template>
  <div class="bg-card rounded-lg p-6 border text-center flex flex-col items-center shadow-sm">
    <div class="bg-primary/10 p-3 rounded-full mb-4">
      <component :is="icon" class="h-8 w-8 text-primary" />
    </div>
    <h3 class="text-xl font-bold text-card-foreground">{{ title }}</h3>
  </div>
</template>

<script setup lang="ts">
import type { FunctionalComponent } from 'vue';

defineProps<{
  icon: FunctionalComponent;
  title: string;
}>();
</script>