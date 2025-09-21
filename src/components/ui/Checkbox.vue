<template>
  <div class="flex items-center space-x-2">
    <input
      type="checkbox"
      :id="id"
      :checked="modelValue"
      @change="updateModelValue"
      class="h-4 w-4 rounded border-primary text-primary focus:ring-primary"
    />
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  id: string
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

function updateModelValue(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
}
</script>