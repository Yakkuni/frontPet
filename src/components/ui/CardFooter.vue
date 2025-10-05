<template>
  <div :class="cn('flex items-center p-6 pt-0', $attrs.class as string)">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/utils';
// A diretiva `inheritAttrs: false` não é necessária no <script setup> por padrão
</script>