<template>
  <slot />
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

// Inicializar tema com base nas preferências do usuário ou sistema
onMounted(() => {
  // Verificar se há tema salvo no localStorage
  const storedTheme = localStorage.getItem('theme')
  
  if (storedTheme) {
    themeStore.setTheme(storedTheme as 'light' | 'dark' | 'system')
  } else {
    // Usar sistema como padrão
    themeStore.setTheme('system')
  }
  
  // Aplicar tema inicial
  applyTheme()
  
  // Observar mudanças nas preferências do sistema
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', applyTheme)
})

// Observar mudanças no tema
watch(() => themeStore.theme, () => {
  localStorage.setItem('theme', themeStore.theme)
  applyTheme()
})

// Aplicar o tema correto com base nas configurações
function applyTheme() {
  const isDarkMode = 
    themeStore.theme === 'dark' || 
    (themeStore.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  
  if (isDarkMode) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
</script>