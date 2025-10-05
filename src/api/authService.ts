import apiClient from './axios';

// Objeto para agrupar as funções de autenticação
export const authService = {
  // Envia as credenciais para o endpoint de login
  login(credentials: { email: string; password: string }) {
    return apiClient.post('/auth/login', credentials); // Ajuste o endpoint se for diferente
  },

  // Envia os dados de um novo usuário para o endpoint de registro
  register(userData: any) {
    return apiClient.post('/auth/register', userData); // Ajuste o endpoint se for diferente
  },
};