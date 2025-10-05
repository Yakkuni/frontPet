import axios from 'axios';

const apiClient = axios.create({
  // Aponta para o proxy configurado no vite.config.ts para evitar erros de CORS
  baseURL: '/api', 
  headers: {
    'Content-Type': 'application/json',
  },
  // Define um tempo limite de 10 segundos para as requisições
  timeout: 10000, 
});

// Interceptor de REQUISIÇÃO: executado ANTES de cada requisição ser enviada
apiClient.interceptors.request.use(
  (config) => {
    // Pega o token salvo no localStorage
    const token = localStorage.getItem('authToken');
    
    // Se o token existir, adiciona-o ao cabeçalho de autorização
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de RESPOSTA: executado DEPOIS de cada resposta da API ser recebida
apiClient.interceptors.response.use(
  // Se a resposta for um sucesso, apenas a retorna
  (response) => response,
  
  // Se a resposta for um erro...
  async (error) => {
    // Verifica se o erro é uma resposta da API com status 401 (Não Autorizado)
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      console.warn('Token inválido ou expirado. A efetuar logout automático.');
      
      // Importa a store de autenticação dinamicamente para evitar loops de importação
      const { useAuthStore } = await import('@/stores/auth');
      const authStore = useAuthStore();
      
      // Chama a função de logout para limpar a sessão e redirecionar o usuário
      authStore.logout();
    }
    
    // Retorna o erro para que a chamada original (ex: no login) possa tratá-lo
    return Promise.reject(error);
  }
);

export default apiClient;