<template>
  <div class="container mx-auto px-4 py-8 md:py-12">
    <RouterLink to="/" class="inline-flex items-center gap-2 text-primary hover:underline mb-8 font-medium">
      <ArrowLeft class="w-4 h-4" />
      Voltar para a Página Inicial
    </RouterLink>

    <header class="text-center mb-12">
      <h1 class="text-4xl font-bold tracking-tight text-primary">Central de Ajuda</h1>
      <p class="mt-4 text-lg text-muted-foreground">
        Tem alguma dúvida? Encontre respostas aqui ou entre em contato conosco.
      </p>
    </header>

    <section id="faq">
      <h2 class="text-3xl font-semibold text-center mb-8">Perguntas Frequentes</h2>
      <div class="max-w-3xl mx-auto space-y-6">
        
        <div class="border-b pb-4">
          <h3 class="font-semibold text-lg">Como faço para cadastrar meu pet?</h3>
          <p class="mt-2 text-muted-foreground">
            Após criar sua conta e fazer login, clique no botão "Adicionar Pet" no seu painel principal. Preencha as informações como nome, espécie, raça e data de nascimento.
          </p>
        </div>

        <div class="border-b pb-4">
          <h3 class="font-semibold text-lg">Esqueci minha senha, como posso recuperá-la?</h3>
          <p class="mt-2 text-muted-foreground">
            Na página de login, clique em "Esqueceu sua senha?". Você receberá um e-mail com as instruções para criar uma nova senha de acesso.
          </p>
        </div>

        <div class="border-b pb-4">
          <h3 class="font-semibold text-lg">Meus dados e os do meu pet estão seguros?</h3>
          <p class="mt-2 text-muted-foreground">
            Sim! A segurança é nossa prioridade. Utilizamos as melhores práticas de segurança e criptografia para garantir que todas as suas informações estejam sempre protegidas.
          </p>
        </div>
        
        <div class="border-b pb-4">
          <h3 class="font-semibold text-lg">Como posso editar as informações de um pet já cadastrado?</h3>
          <p class="mt-2 text-muted-foreground">
            Acesse a página "Meus Pets", clique no pet que deseja editar e, em seguida, no botão "Editar". Você poderá atualizar todas as informações necessárias.
          </p>
        </div>

      </div>
    </section>

    <section id="contact" class="mt-16">
      <div class="max-w-2xl mx-auto text-center">
        <h2 class="text-3xl font-semibold">Ainda precisa de ajuda?</h2>
        <p class="mt-4 text-muted-foreground">
          Se não encontrou sua resposta, preencha o formulário abaixo e nossa equipe entrará em contato o mais breve possível.
        </p>
      </div>

      <form @submit.prevent="handleSupportSubmit" class="max-w-2xl mx-auto mt-8 space-y-6">
        <div class="space-y-2">
          <Label for="email">Seu E-mail *</Label>
          <Input id="email" type="email" v-model="form.email" placeholder="seuemail@exemplo.com" required />
        </div>
        <div class="space-y-2">
          <Label for="subject">Assunto *</Label>
          <Input id="subject" type="text" v-model="form.subject" placeholder="Ex: Dúvida sobre cadastro de pet" required />
        </div>
        <div class="space-y-2">
          <Label for="message">Mensagem *</Label>
          <textarea 
            id="message" 
            v-model="form.message" 
            rows="5"
            class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Descreva sua dúvida ou problema em detalhes aqui..."
            required
          ></textarea>
        </div>
        <div class="text-center">
          <Button type="submit">Enviar Mensagem</Button>
        </div>
      </form>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { RouterLink } from 'vue-router'; // IMPORTE ADICIONADO
import { ArrowLeft } from 'lucide-vue-next'; // IMPORTE ADICIONADO
import Input from '@/components/ui/Input.vue';
import Label from '@/components/ui/Label.vue';
import Button from '@/components/ui/Button.vue';

const form = reactive({
  email: '',
  subject: '',
  message: '',
});

const handleSupportSubmit = () => {
  if (!form.email || !form.subject || !form.message) {
    alert('Por favor, preencha todos os campos obrigatórios.');
    return;
  }

  console.log('Dados do formulário de suporte:', form);
  
  // TODO: Implementar a lógica de envio para sua API (backend) aqui.
  
  alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');

  form.email = '';
  form.subject = '';
  form.message = '';
};
</script>