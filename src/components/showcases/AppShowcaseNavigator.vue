<template>
    <div class="flex flex-col h-screen bg-background">
        <header class="border-b border-border shadow-sm">
            <nav class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="relative flex items-center justify-center h-16">
                    <div class="flex space-x-2 sm:space-x-4">
                        <button v-for="showcase in showcases" :key="showcase.id" @click="activeShowcaseId = showcase.id"
                            :class="[
                                'px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-ring',
                                activeShowcaseId === showcase.id
                                    ? 'bg-primary text-primary-foreground'
                                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                            ]">
                            {{ t(showcase.labelKey) }}
                        </button>
                        <button @click="logout" class="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-ring text-muted-foreground hover:bg-muted hover:text-foreground">
                            Logout
                        </button>
                    </div>
                </div>
            </nav>
        </header>

        <main class="flex-1 overflow-y-auto">
            <!-- Renderização dos componentes usando v-show -->
            <div v-show="activeShowcaseId === 'ThemeShowcase'">
                <ThemeShowcase />
            </div>

            <div v-show="activeShowcaseId === 'I18nShowcase'">
                <I18nPotentialShowcase />
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '../../store/auth.store';
import { useRouter } from 'vue-router';
import ThemeShowcase from './ThemeShowCase.vue';
import I18nPotentialShowcase from './I18nPotentialShowcase.vue';

const { t } = useI18n();

const authStore = useAuthStore();
const router = useRouter();

// 3. A "Fonte da Verdade": uma lista dos showcases disponíveis
// Para adicionar um novo, basta adicioná-lo a esta lista!
const showcases = [
    {
        id: 'ThemeShowcase',
        labelKey: 'showcase.navigation.themes',
        component: ThemeShowcase
    },
    {
        id: 'I18nShowcase',
        labelKey: 'showcase.navigation.i18n',
        component: I18nPotentialShowcase
    },
    // {
    //   id: 'OutroShowcase',
    //   labelKey: 'navigation.outro',
    //   component: shallowRef(OutroShowcase)
    // }
];

// 4. Estado para controlar qual aba/componente está ativo
const activeShowcaseId = ref(showcases[0].id); // Começa com o primeiro da lista

function logout() {
    authStore.logout();
    router.push('/login');
}
</script>

<style>
/* Estilos para a transição suave entre os componentes */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
