import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { authService } from '@/api/authService';
import axios from 'axios'; // Importe o axios para ter acesso aos tipos de erro

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('authToken'));
  const user = ref(null);
  const router = useRouter();

  const isAuthenticated = computed(() => !!token.value);

  async function login(credentials: { email: string; password: string }) {
    // ... (sua função de login)
  }

  async function register(userData: any) {
    try {
      const { confirmPassword, ...apiData } = userData;
      await authService.register(apiData);
      
      alert('Conta criada com sucesso! Por favor, faça o login.');
      await router.push('/auth/login');

    } catch (error) {
      console.error('Erro de registro:', error);

      // LÓGICA DE ERRO MELHORADA E MAIS DETALHADA
      if (axios.isAxiosError(error) && error.response) {
        // A API respondeu com um erro (4xx ou 5xx)
        const responseData = error.response.data;
        let errorMessage = 'Ocorreu um erro desconhecido.';

        if (responseData && responseData.message) {
          // Tenta pegar a mensagem principal do erro
          errorMessage = responseData.message;
        } else if (responseData && typeof responseData === 'object') {
          // Se houver um objeto de erros (comum em validação), formata a mensagem
          const errorDetails = Object.values(responseData).flat().join('\n');
          errorMessage = errorDetails;
        }
        
        alert(`Erro de registro:\n${errorMessage}`);

      } else {
        // Erro de rede ou outro erro genérico
        alert('Não foi possível criar a conta. Verifique sua conexão e tente novamente.');
      }
      
      // Re-lança o erro para que a interface saiba que a requisição falhou
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