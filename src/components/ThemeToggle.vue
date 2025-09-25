<template>
  <div class="relative" ref="themeToggleRef">
    <Button variant="ghost" size="icon" @click="isOpen = !isOpen">
      <Sun v-if="!isDark" class="h-5 w-5" />
      <Moon v-else class="h-5 w-5" />
      <span class="sr-only">Alternar tema</span>
    </Button>

    <Transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute z-50 mt-2 w-36 origin-top-right rounded-md border bg-card p-1 shadow-lg focus:outline-none left-1/2 -translate-x-1/2"
      >
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
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { Sun, Moon, Laptop } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
const isOpen = ref(false)
const themeToggleRef = ref<HTMLElement | null>(null)

const isDark = computed(() => {
  if (themeStore.theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  return themeStore.theme === 'dark'
})

function setTheme(theme: 'light' | 'dark' | 'system') {
  themeStore.setTheme(theme)
  isOpen.value = false
}

const handleClickOutside = (event: MouseEvent) => {
  if (themeToggleRef.value && !themeToggleRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})
</script>