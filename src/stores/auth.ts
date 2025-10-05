import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { authService } from '@/api/authService';
import axios from 'axios';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('authToken'));
  const user = ref(null);
  const router = useRouter();

  const isAuthenticated = computed(() => !!token.value);

  async function login(credentials: { email: string; password: string }) {
    // ... (função de login existente)
  }

  async function register(userData: any) {
    try {
      const { confirmPassword, ...apiData } = userData;
      await authService.register(apiData);
      
      alert('Conta criada com sucesso! Por favor, faça o login.');
      await router.push('/auth/login');

    } catch (error) {
      // O console.log foi adicionado aqui para depuração
      if (axios.isAxiosError(error) && error.response) {
        console.log('Resposta completa do erro do servidor:', error.response);
        
        const responseData = error.response.data;
        let errorMessage = 'Ocorreu um erro desconhecido.';

        if (responseData && responseData.message) {
          errorMessage = responseData.message;
        } else if (responseData && typeof responseData === 'object') {
          const errorDetails = Object.values(responseData).flat().join('\n');
          errorMessage = errorDetails;
        }
        
        alert(`Erro de registro:\n${errorMessage}`);
      } else {
        console.error('Erro de registro (não-Axios):', error);
        alert('Não foi possível criar a conta. Verifique sua conexão e tente novamente.');
      }
      
      throw error;
    }
  }

  function logout() {
    token.value = null;
    user.value = null;
    localStorage.removeItem('authToken');
    router.push('/auth/login');
  }

  return { token, user, isAuthenticated, login, register, logout };
});