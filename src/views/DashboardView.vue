<template>
  <div class="container mx-auto py-12">
    <h1 class="text-3xl font-bold mb-8">Dashboard</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card class="bg-primary/10">
        <CardContent class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium">Total de Pets</p>
              <h2 class="text-3xl font-bold">3</h2>
            </div>
            <div class="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
              <DogIcon class="w-6 h-6" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card class="bg-orange-500/10">
        <CardContent class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium">Agendamentos</p>
              <h2 class="text-3xl font-bold">2</h2>
            </div>
            <div class="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
              <CalendarIcon class="w-6 h-6" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card class="bg-green-500/10">
        <CardContent class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium">Serviços Concluídos</p>
              <h2 class="text-3xl font-bold">5</h2>
            </div>
            <div class="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
              <CheckCircleIcon class="w-6 h-6" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Próximos Agendamentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <div class="flex items-center justify-between border-b pb-4">
                <div class="flex items-center space-x-4">
                  <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <DogIcon class="w-5 h-5" />
                  </div>
                  <div>
                    <p class="font-medium">Banho e Tosa - Rex</p>
                    <p class="text-sm text-muted-foreground">30/09/2025 às 14:00</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Ver detalhes
                </Button>
              </div>
              
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                  <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <CatIcon class="w-5 h-5" />
                  </div>
                  <div>
                    <p class="font-medium">Consulta Veterinária - Luna</p>
                    <p class="text-sm text-muted-foreground">05/10/2025 às 10:30</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Ver detalhes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Meus Pets</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <div class="flex items-center space-x-4">
                <img src="/placeholder.jpg" alt="Rex" class="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p class="font-medium">Rex</p>
                  <p class="text-sm text-muted-foreground">Labrador, 3 anos</p>
                </div>
              </div>
              
              <div class="flex items-center space-x-4">
                <img src="/placeholder.jpg" alt="Luna" class="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p class="font-medium">Luna</p>
                  <p class="text-sm text-muted-foreground">Poodle, 2 anos</p>
                </div>
              </div>
              
              <div class="flex items-center space-x-4">
                <img src="/placeholder.jpg" alt="Max" class="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p class="font-medium">Max</p>
                  <p class="text-sm text-muted-foreground">Golden Retriever, 4 anos</p>
                </div>
              </div>
              
              <div class="mt-4">
                <Button variant="outline" class="w-full" as-child>
                  <router-link to="/pets">
                    Ver todos os pets
                  </router-link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card.vue';
import { Button } from '@/components/ui/Button.vue';
import { DogIcon, CatIcon, CalendarIcon, CheckCircleIcon } from 'lucide-vue-next';
</script>