import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Adicione esta seção de "server"
  server: {
    proxy: {
      // Qualquer requisição que comece com /api será redirecionada
      '/api': {
        target: 'https://api.zampet.dev.cybercore.dev.br', // A URL da sua API real
        changeOrigin: true, // Necessário para o proxy funcionar
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove /api antes de enviar para o backend
      },
    },
  },
})