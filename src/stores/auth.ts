import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { authService } from '@/api/authService';
import axios from 'axios';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('authToken'));
  const user = ref(null);
  const error = ref<string | null>(null);
  const router = useRouter();

  const isAuthenticated = computed(() => !!token.value);

  function clearError() {
    error.value = null;
  }

  async function login(credentials: { email: string; password: string }) {
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
    error.value = null; // Limpa erros antigos
    try {
      const { confirmPassword, ...apiData } = userData;
      await authService.register(apiData);
      
      // Remove o alert de sucesso para um fluxo mais limpo
      // alert('Conta criada com sucesso! Por favor, faça o login.');
      await router.push({ name: 'login', query: { registered: 'true' } });

    } catch (err) {
      // Guarda a mensagem de erro no estado
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

  function logout() {
    token.value = null;
    user.value = null;
    localStorage.removeItem('authToken');
    router.push('/auth/login');
  }

  return { token, user, error, isAuthenticated, login, register, logout, clearError };
});