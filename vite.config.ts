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
  server: {
    host: true,
    allowedHosts: ['app.zampet.dev.cybercore.dev.br'],
    proxy: {
      '/api': {
        target: 'https://api.zampet.dev.cybercore.dev.br',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),

        // --- ADICIONE ESTA LINHA ---
        // Desativa a validação do certificado SSL, essencial para targets https em desenvolvimento
        secure: false, 

      },
    },
  },
})