import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import router from '@/router';
import { authService } from '@/api/authService';
import axios from 'axios';
import { tr } from 'date-fns/locale';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('authToken'));
  const user = ref(null);
  const error = ref<string | null>(null);
  const isLoggingOut = ref(false);

  const isAuthenticated = computed(() => !!token.value);

  function clearError() {
    error.value = null;
  }

  async function login(credentials: { email: string; password:string }) {
    error.value = null;
    try {
      const response = await authService.login(credentials);
      const newToken = response.data.data.token;
      if (!newToken) throw new Error("Token não encontrado");

      token.value = newToken;
      localStorage.setItem('authToken', newToken);
      await router.push('/pets');
    } catch (err) {
      localStorage.removeItem('authToken');
      token.value = null;
      if (axios.isAxiosError(err) && err.response) {
        error.value = err.response.data?.message || 'Credenciais inválidas.';
      } else {
        error.value = 'Não foi possível fazer o login. Verifique a sua conexão.';
      }
      console.error('Erro de login:', err);
      throw err; 
    }
  }

  async function register(userData: any) {
    error.value = null;
    try {
      const { confirmPassword, ...apiData } = userData;
      await authService.register(apiData);
      await router.push({ name: 'login', query: { registered: 'true' } });
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const responseData = err.response.data;
        error.value = responseData?.message || 'Ocorreu um erro desconhecido.';
      } else {
        error.value = 'Não foi possível criar a conta. Verifique sua conexão.';
      }
      console.error('Erro de registro:', err);
      throw err;
    }
  }

  async function logout() {
    isLoggingOut.value = true;
    try {
      if (token.value) {
        await authService.logout();
      }
    } catch (err) {
      console.error("Erro ao invalidar o token na API:", err);
    } finally {
      token.value = null;
      user.value = null;
      localStorage.removeItem('authToken');
      isLoggingOut.value = false;
      await router.push('/auth/login');
    }
  }

  return { token, user, error, isLoggingOut, isAuthenticated, login, register, logout, clearError };
});