import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<'light' | 'dark' | 'system'>('system')

  function setTheme(newTheme: 'light' | 'dark' | 'system') {
    theme.value = newTheme
  }

  return {
    theme,
    setTheme
  }
})