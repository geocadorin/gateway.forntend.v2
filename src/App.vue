<script setup lang="ts">
import ThemeToggle from './components/ThemeToggle.vue'
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <!-- Header com alternador de tema -->
    <header class="border-b border-border">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-primary">Gateway Frontend v2</h1>
        <ThemeToggle />
      </div>
    </header>

    <!-- Conteúdo principal -->
    <main class="container mx-auto px-4 py-8">
      <div class="text-center space-y-6">
        <div class="flex justify-center space-x-6">
          <a href="https://vite.dev" target="_blank" class="block">
            <img src="/vite.svg" class="h-24 transition-all hover:drop-shadow-lg" alt="Vite logo" />
          </a>
          <a href="https://vuejs.org/" target="_blank" class="block">
            <img src="./assets/vue.svg" class="h-24 transition-all hover:drop-shadow-lg" alt="Vue logo" />
          </a>
        </div>
        
        <h2 class="text-4xl font-bold">Vite + Vue + Tailwind</h2>
        
        <div class="space-y-4">
          <div class="bg-card border border-border rounded-lg p-6 max-w-md mx-auto">
            <h3 class="text-lg font-semibold text-card-foreground mb-2">Tema Aplicado</h3>
            <p class="text-muted-foreground">Este card demonstra as cores do sistema de temas.</p>
          </div>
          
          <div class="flex justify-center space-x-4">
            <button class="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md font-medium transition-colors">
              Botão Primário
            </button>
            <button class="bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-2 rounded-md font-medium transition-colors">
              Botão Secundário
            </button>
            <button class="bg-destructive text-destructive-foreground hover:bg-destructive/90 px-4 py-2 rounded-md font-medium transition-colors">
              Botão Destrutivo
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>


