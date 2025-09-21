<template>
  <ThemeProvider>
    <div class="min-h-screen">
      <RouterView />
    </div>
  </ThemeProvider>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import ThemeProvider from '@/components/ThemeProvider.vue'
</script>