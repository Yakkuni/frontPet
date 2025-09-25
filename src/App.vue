<template>
  <ThemeProvider>
    <div class="min-h-screen">
      <RouterView />
      <LoadingSpinner v-if="uiStore.isLoading" />
    </div>
  </ThemeProvider>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import ThemeProvider from '@/components/ThemeProvider.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import { useUiStore } from '@/stores/ui'

const uiStore = useUiStore()
</script>