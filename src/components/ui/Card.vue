<template>
  <div class="bg-card rounded-lg border shadow-sm">
    <slot />
  </div>
</template>

<script setup lang="ts">
// Card wrapper
</script>

<script lang="tsx">
import { defineComponent } from 'vue'

// CardHeader
export const CardHeader = defineComponent({
  name: 'CardHeader',
  setup(_, { slots }) {
    return () => (
      <div class="flex flex-col space-y-1.5 p-6">
        {slots.default?.()}
      </div>
    )
  }
})

// CardTitle
export const CardTitle = defineComponent({
  name: 'CardTitle',
  setup(_, { slots }) {
    return () => (
      <h3 class="text-lg font-semibold leading-none tracking-tight">
        {slots.default?.()}
      </h3>
    )
  }
})

// CardDescription
export const CardDescription = defineComponent({
  name: 'CardDescription',
  setup(_, { slots }) {
    return () => (
      <p class="text-sm text-muted-foreground">
        {slots.default?.()}
      </p>
    )
  }
})

// CardContent
export const CardContent = defineComponent({
  name: 'CardContent',
  setup(_, { slots }) {
    return () => (
      <div class="p-6 pt-0">
        {slots.default?.()}
      </div>
    )
  }
})

// CardFooter
export const CardFooter = defineComponent({
  name: 'CardFooter',
  setup(_, { slots }) {
    return () => (
      <div class="flex items-center p-6 pt-0">
        {slots.default?.()}
      </div>
    )
  }
})
</script>