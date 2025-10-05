import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { authService } from '@/api/authService';

export const useAuthStore = defineStore('auth', () => {
  // Estado inicial: tenta pegar o token do localStorage
  const token = ref(localStorage.getItem('authToken'));
  const user = ref(null); // Para guardar dados como nome, email, etc.
  const router = useRouter();

  // Getter para verificar se o usuário está autenticado
  const isAuthenticated = computed(() => !!token.value);

  async function login(credentials: { email: string; password: string }) {
    try {
      const response = await authService.login(credentials);
      
      // Assumindo que a API retorna um objeto com uma propriedade 'token'
      const newToken = response.data.token;

      // Guarda o token no estado e no localStorage para persistência
      token.value = newToken;
      localStorage.setItem('authToken', newToken);

      // (Opcional) Se a API retornar dados do usuário, guarde-os também
      // user.value = response.data.user;

      // Redireciona para a página de pets após o login
      await router.push('/pets');

    } catch (error) {
      console.error('Erro de login:', error);
      // Limpa qualquer token antigo em caso de falha
      localStorage.removeItem('authToken');
      token.value = null;
      alert('Email ou senha inválidos. Por favor, tente novamente.');
    }
  }

  function logout() {
    token.value = null;
    user.value = null;
    localStorage.removeItem('authToken');
    router.push('/auth/login');
  }

  return { token, user, isAuthenticated, login, logout };
});