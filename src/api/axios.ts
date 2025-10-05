import axios from 'axios';

// Crie uma instância do axios
const apiClient = axios.create({
  // URL base da sua API
  baseURL: 'https://api.zampet.dev.cybercore.dev.br', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: Adiciona o token JWT a cada requisição
apiClient.interceptors.request.use(
  (config) => {
    // Pega o token do localStorage
    const token = localStorage.getItem('authToken');
    if (token) {
      // Adiciona o token ao cabeçalho de autorização
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;