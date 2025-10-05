import apiClient from './axios';

export const authService = {
  // A função de login deve enviar JSON
  login(credentials: { email: string; password: string }) {
    return apiClient.post('/v0/auth/login', credentials);
  },

  // A função de registro também deve enviar JSON
  register(userData: any) {
    return apiClient.post('/v0/auth/register', userData);
  },
};