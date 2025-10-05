import apiClient from './axios';

export const authService = {
  // Envia as credenciais para o endpoint de login
  login(credentials: { email: string; password: string }) {
    // O endpoint de login provavelmente também usa /v0/
    return apiClient.post('/v0/auth/login', credentials);
  },

  // Envia os dados de um novo usuário para o endpoint de registro
  register(userData: any) {
    // A rota de registro foi atualizada aqui
    return apiClient.post('/v0/auth/register', userData);
  },
};