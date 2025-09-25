<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start sm:items-center justify-center p-4 overflow-y-auto"
        @click.self="emit('update:open', false)"
      >
        <div class="bg-card text-card-foreground rounded-lg border shadow-lg w-full max-w-sm sm:max-w-lg my-8">
          <div class="p-6 border-b">
            <h2 class="text-xl font-semibold">{{ title }}</h2>
            <p v-if="description" class="text-sm text-muted-foreground mt-1">{{ description }}</p>
          </div>
          <div class="p-6">
            <slot />
          </div>
          <div v-if="$slots.footer" class="p-6 border-t flex justify-end gap-2">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { watch } from 'vue';

const props = defineProps<{
  open: boolean;
  title: string;
  description?: string;
}>();

const emit = defineEmits(['update:open']);

watch(() => props.open, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});
</script>