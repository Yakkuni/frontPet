<template>
  <div class="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
    <div class="loader"></div>
  </div>
</template>

<style scoped>
.loader {
  border: 4px solid hsl(var(--muted));
  border-top: 4px solid hsl(var(--primary));
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>