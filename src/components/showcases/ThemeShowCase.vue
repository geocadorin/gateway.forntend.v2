<template>
    <div class="bg-background text-foreground min-h-screen p-4 sm:p-8 transition-colors duration-300">
        <div class="max-w-4xl mx-auto">

            <header class="text-center mb-8">
                <h1 class="text-4xl font-bold text-primary mb-2">Demonstração de Temas</h1>
                <p class="text-muted-foreground">Interaja com os controles para ver a mágica acontecer em tempo real.
                </p>
            </header>

            <div
                class="bg-card border border-border rounded-lg p-6 mb-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button @click="uiStore.toggleTheme"
                    class="w-full sm:w-auto bg-secondary text-secondary-foreground font-semibold py-2 px-4 rounded-lg transition-transform hover:scale-105">
                    Alternar para Modo {{ uiStore.currentTheme === 'light' ? 'Dark' : 'Light' }}
                </button>

                <button @click="uiStore.applyThemeFromBackend" :disabled="uiStore.isLoading"
                    class="w-full sm:w-auto bg-primary text-primary-foreground font-semibold py-2 px-4 rounded-lg transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-wait">
                    {{ uiStore.isLoading ? 'Carregando Tema...' : 'Aplicar Tema do Backend' }}
                </button>
            </div>

            <main class="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div class="bg-card border border-border rounded-lg p-6 space-y-4">
                    <h2 class="text-xl font-semibold text-card-foreground">Card Principal</h2>
                    <p class="text-muted-foreground">
                        Este é um card simples. Ele usa as cores `bg-card`, `text-card-foreground` e `border`.
                    </p>
                    <button class="bg-primary text-primary-foreground py-2 px-4 rounded-md text-sm font-medium">
                        Botão Primário
                    </button>
                </div>

                <div class="bg-card border border-border rounded-lg p-6 space-y-4">
                    <h2 class="text-xl font-semibold text-card-foreground">Cores de Destaque</h2>
                    <div class="bg-accent text-accent-foreground p-3 rounded-md">
                        Esta é uma mensagem de destaque (accent).
                    </div>
                    <button class="w-full bg-destructive text-destructive-foreground py-2 px-4 rounded-md font-medium">
                        Ação Destrutiva
                    </button>
                </div>

                <div class="bg-card border border-border rounded-lg p-6 space-y-4 md:col-span-2">
                    <h2 class="text-xl font-semibold text-card-foreground">Formulário de Exemplo</h2>
                    <div>
                        <label for="name" class="block text-sm font-medium text-foreground mb-1">Nome</label>
                        <input type="text" id="name" placeholder="Digite seu nome..."
                            class="w-full bg-background border border-border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-ring" />
                    </div>
                    <p class="text-xs text-muted-foreground">
                        Observe como a borda e o anel de foco (`ring`) mudam de cor ao clicar no campo de texto.
                    </p>
                </div>

                <div class="bg-secondary text-secondary-foreground rounded-lg p-6 md:col-span-2 space-y-2">
                    <h3 class="text-lg font-semibold">Debug da Store (Pinia)</h3>
                    <p>Modo Atual: <span class="font-mono bg-background text-foreground px-2 py-1 rounded">{{
                        uiStore.currentTheme }}</span></p>
                    <p>Carregando: <span class="font-mono bg-background text-foreground px-2 py-1 rounded">{{
                        uiStore.isLoading }}</span></p>
                    <div v-if="uiStore.backendThemeColors">
                        <p>Cores do Backend Aplicadas:</p>
                        <pre
                            class="bg-background text-foreground text-xs p-2 rounded-md overflow-x-auto">{{ uiStore.backendThemeColors }}</pre>
                    </div>
                </div>

            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUIStore } from '../../store/ui.store';

// Instancia a store para ter acesso ao estado e às ações
const uiStore = useUIStore();
</script>
