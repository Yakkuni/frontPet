<template>
  <label
    :class="labelClasses"
    v-bind="$attrs"
  >
    <slot />
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils'

const props = defineProps<{
  class?: string
}>()

const labelClasses = computed(() => {
  return cn(
    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
    props.class
  )
})
</script>