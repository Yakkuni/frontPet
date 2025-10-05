// Caminho do arquivo: src/services/axios.ts

import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

// Criação da instância base do Axios
const apiClient = axios.create({
  // Aponta para o proxy configurado no vite.config.ts
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  // Define um tempo limite de 10 segundos para as requisições
  timeout: 10000,
});

// --- INTERCEPTOR DE REQUISIÇÃO ---
// Esta é a versão correta, que envia o cabeçalho "Authorization: Bearer"
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    
    if (token) {
      // Adiciona o cabeçalho no formato que o seu backend PHP espera
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    console.log('Enviando requisição com cabeçalho Bearer:', config.headers);
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- INTERCEPTOR DE RESPOSTA ---
// Lida com respostas de erro, como tokens expirados (401)
apiClient.interceptors.response.use(
  // Se a resposta for um sucesso, apenas a retorna
  (response) => response,

  // Se a resposta for um erro...
  async (error) => {
    const authStore = useAuthStore();
    
    // Previne loops infinitos de logout
    if (authStore.isLoggingOut) {
      return Promise.reject(error);
    }
    
    // Verifica se o erro é uma resposta da API com status 401 (Não Autorizado)
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      console.warn('Token inválido ou expirado (recebido status 401). Efetuando logout automático.');
      
      // Chama a ação de logout da store para limpar a sessão e redirecionar
      authStore.logout();
    }
    
    // Retorna o erro para que a chamada original também possa tratá-lo se necessário
    return Promise.reject(error);
  }
);

// Exporta a instância configurada para ser usada em outras partes da aplicação
export default apiClient;