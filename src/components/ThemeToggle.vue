<template>
  <div>
    <Button variant="ghost" size="icon" @click="toggleMenu">
      <Sun v-if="!isDark" class="h-5 w-5" />
      <Moon v-else class="h-5 w-5" />
      <span class="sr-only">Alternar tema</span>
    </Button>
    <div v-if="isOpen" class="absolute right-2 top-12 z-50 rounded-md border bg-card p-1 shadow-md">
      <Button variant="ghost" class="w-full justify-start" @click="setTheme('light')">
        <Sun class="mr-2 h-4 w-4" />
        <span>Claro</span>
      </Button>
      <Button variant="ghost" class="w-full justify-start" @click="setTheme('dark')">
        <Moon class="mr-2 h-4 w-4" />
        <span>Escuro</span>
      </Button>
      <Button variant="ghost" class="w-full justify-start" @click="setTheme('system')">
        <Laptop class="mr-2 h-4 w-4" />
        <span>Sistema</span>
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { Sun, Moon, Laptop } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
const isOpen = ref(false)

const isDark = computed(() => {
  if (themeStore.theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  return themeStore.theme === 'dark'
})

function toggleMenu() {
  isOpen.value = !isOpen.value
}

function setTheme(theme: 'light' | 'dark' | 'system') {
  themeStore.setTheme(theme)
  isOpen.value = false
}

// Fechar menu ao clicar fora
function handleClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement
  if (!target.closest('div') || !target.closest('div').contains(target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>