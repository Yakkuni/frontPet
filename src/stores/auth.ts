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
    try {
      const response = await authService.login(credentials);
      
      // A CORREÇÃO ESTÁ AQUI: Acessamos response.data.data.token
      const newToken = response.data.data.token;
      if (!newToken) {
        throw new Error("Token não encontrado na resposta da API");
      }

      // Guarda o token no estado e no localStorage para persistir a sessão
      token.value = newToken;
      localStorage.setItem('authToken', newToken);

      // Redireciona para a página de pets após o login bem-sucedido
      await router.push('/pets');

    } catch (error) {
      console.error('Erro de login:', error);
      localStorage.removeItem('authToken');
      token.value = null;

      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data?.message || 'Credenciais inválidas.';
        alert(`Erro de login: ${errorMessage}`);
      } else {
        alert('Não foi possível fazer o login. Verifique sua conexão e tente novamente.');
      }
      throw error;
    }
  }

  async function register(userData: any) {
    try {
      const { confirmPassword, ...apiData } = userData;
      await authService.register(apiData);
      
      alert('Conta criada com sucesso! Por favor, faça o login.');
      await router.push('/auth/login');

    } catch (error) {
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