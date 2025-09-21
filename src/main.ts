import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Importa estilos globais
import './assets/main.css'

// Importa arquivos principais da aplicação
import App from './App.vue'
import router from './router'

// Importa o ThemeProvider
import ThemeProvider from './components/ThemeProvider.vue'

// Cria a aplicação Vue
const app = createApp(App)

// Adiciona plugins ao app
app.use(createPinia())
app.use(router)

// Registra componentes globais
app.component('ThemeProvider', ThemeProvider)

// Monta a aplicação no elemento com id 'app'
app.mount('#app')