<template>
    <div class="min-h-screen p-4 sm:p-8 transition-colors duration-300"
        style="background-color: hsl(var(--background)); color: hsl(var(--foreground))">
        <div class="max-w-4xl mx-auto">

            <header class="text-center mb-8">
                <h1 class="text-4xl font-bold mb-2" style="color: hsl(var(--primary))">Demonstração de Temas</h1>
                <p style="color: hsl(var(--muted-foreground))">Interaja com os controles para ver a mágica acontecer em
                    tempo real.
                </p>
            </header>

            <div class="border rounded-lg p-6 mb-8 flex flex-col sm:flex-row items-center justify-center gap-4"
                style="background-color: hsl(var(--card)); border-color: hsl(var(--border))">
                <button @click="uiStore.toggleTheme"
                    class="w-full sm:w-auto font-semibold py-2 px-4 rounded-lg transition-transform hover:scale-105"
                    style="background-color: hsl(var(--secondary)); color: hsl(var(--secondary-foreground))">
                    Alternar para Modo {{ uiStore.currentTheme === 'light' ? 'Dark' : 'Light' }}
                </button>

                <button @click="uiStore.applyThemeFromBackend" :disabled="uiStore.isLoading"
                    class="w-full sm:w-auto font-semibold py-2 px-4 rounded-lg transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-wait"
                    style="background-color: hsl(var(--primary)); color: hsl(var(--primary-foreground))">
                    {{ uiStore.isLoading ? 'Carregando Tema...' : 'Aplicar Tema do Backend' }}
                </button>
            </div>

            <main class="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div class="border rounded-lg p-6 space-y-4"
                    style="background-color: hsl(var(--card)); border-color: hsl(var(--border))">
                    <h2 class="text-xl font-semibold" style="color: hsl(var(--card-foreground))">Card Principal</h2>
                    <p style="color: hsl(var(--muted-foreground))">
                        Este é um card simples. Ele usa as cores `bg-card`, `text-card-foreground` e `border`.
                    </p>
                    <button class="py-2 px-4 rounded-md text-sm font-medium"
                        style="background-color: hsl(var(--primary)); color: hsl(var(--primary-foreground))">
                        Botão Primário
                    </button>
                </div>

                <div class="border rounded-lg p-6 space-y-4"
                    style="background-color: hsl(var(--card)); border-color: hsl(var(--border))">
                    <h2 class="text-xl font-semibold" style="color: hsl(var(--card-foreground))">Cores de Destaque</h2>
                    <div class="p-3 rounded-md"
                        style="background-color: hsl(var(--accent)); color: hsl(var(--accent-foreground))">
                        Esta é uma mensagem de destaque (accent).
                    </div>
                    <button class="w-full py-2 px-4 rounded-md font-medium"
                        style="background-color: hsl(var(--destructive)); color: hsl(var(--destructive-foreground))">
                        Ação Destrutiva
                    </button>
                </div>

                <div class="border rounded-lg p-6 space-y-4 md:col-span-2"
                    style="background-color: hsl(var(--card)); border-color: hsl(var(--border))">
                    <h2 class="text-xl font-semibold" style="color: hsl(var(--card-foreground))">Formulário de Exemplo
                    </h2>
                    <div>
                        <label for="name" class="block text-sm font-medium mb-1"
                            style="color: hsl(var(--foreground))">Nome</label>
                        <input type="text" id="name" placeholder="Digite seu nome..."
                            class="w-full border rounded-md p-2 focus:outline-none focus:ring-2"
                            style="background-color: hsl(var(--background)); border-color: hsl(var(--border)); --tw-ring-color: hsl(var(--ring));" />
                    </div>
                    <p class="text-xs" style="color: hsl(var(--muted-foreground))">
                        Observe como a borda e o anel de foco (`ring`) mudam de cor ao clicar no campo de texto.
                    </p>
                </div>

                <div class="rounded-lg p-6 md:col-span-2 space-y-2"
                    style="background-color: hsl(var(--secondary)); color: hsl(var(--secondary-foreground))">
                    <h3 class="text-lg font-semibold">Debug da Store (Pinia)</h3>
                    <p>Modo Atual: <span class="font-mono px-2 py-1 rounded"
                            style="background-color: hsl(var(--background)); color: hsl(var(--foreground))">{{
                                uiStore.currentTheme }}</span></p>
                    <p>Carregando: <span class="font-mono px-2 py-1 rounded"
                            style="background-color: hsl(var(--background)); color: hsl(var(--foreground))">{{
                                uiStore.isLoading }}</span></p>
                    <div v-if="uiStore.backendThemeColors">
                        <p>Cores do Backend Aplicadas:</p>
                        <pre class="text-xs p-2 rounded-md overflow-x-auto"
                            style="background-color: hsl(var(--background)); color: hsl(var(--foreground))">{{ uiStore.backendThemeColors }}</pre>
                    </div>
                </div>

            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUIStore } from '../store/ui.store';

// Instancia a store para ter acesso ao estado e às ações
const uiStore = useUIStore();
</script>
