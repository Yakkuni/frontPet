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
    // Lista de hosts permitidos (útil em alguns ambientes)
    allowedHosts: ['app.zampet.dev.cybercore.dev.br'],
    
    // Configuração do Proxy para evitar erros de CORS
    proxy: {
      '/api': {
        target: 'https://api.zampet.dev.cybercore.dev.br',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false, 
      },
    },

    hmr: {
      protocol: 'ws',
      host: 'localhost',
    },
  },
})