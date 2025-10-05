<template>
  <div class="flex items-start gap-4 p-4 rounded-lg" :class="alert.urgencyClass">
    <div class="flex-shrink-0">
      <component :is="alert.icon" class="w-6 h-6" />
    </div>
    <div class="flex-1">
      <h4 class="font-semibold">{{ alert.name }}</h4>
      <p class="text-sm">
        {{ alert.message }}
      </p>
      <p class="text-xs mt-1 opacity-75">
        Última aplicação em: {{ alert.lastApplied }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FunctionalComponent } from 'vue';

// Define o tipo de um alerta para ser usado como prop
export interface Alert {
  name: string;
  message: string;
  lastApplied: string;
  icon: FunctionalComponent;
  urgencyClass: string;
}

defineProps<{
  alert: Alert;
}>();
</script>