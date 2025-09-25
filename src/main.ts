import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Importa estilos globais
import './styles/main.css' // Verifique se este caminho está correto

import App from './App.vue'
import router from './router'

// Cria a aplicação Vue
const app = createApp(App)

app.use(createPinia())
app.use(router)



// Monta a aplicação no elemento com id 'app'
app.mount('#app')