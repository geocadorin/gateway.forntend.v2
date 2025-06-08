<template>
    <div class="bg-background text-foreground min-h-screen p-4 sm:p-8 transition-colors duration-300">
        <div class="max-w-4xl mx-auto space-y-8">

            <header class="text-center">
                <h1 class="text-4xl font-bold text-primary mb-2">{{ t('showcase.title') }}</h1>
                <p class="text-muted-foreground">{{ t('showcase.subtitle') }}</p>
            </header>

            <div class="flex justify-center">
                <select v-model="locale"
                    class="w-full max-w-xs bg-secondary text-secondary-foreground border-border border font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring">
                    <option value="pt">Português</option>
                    <option value="en">English</option>
                    <option value="es">Español</option>
                </select>
            </div>

            <div class="bg-card border-border border rounded-lg p-6 space-y-4">
                <h2 class="text-2xl font-semibold text-card-foreground">{{ t('showcase.pluralization.title') }}</h2>

                <div>
                    <label for="file-slider" class="font-medium">{{ t('showcase.pluralization.simple_label') }}: {{
                        fileCount }}</label>
                    <input id="file-slider" type="range" min="0" max="10" v-model.number="fileCount"
                        class="w-full mt-2">
                    <p class="bg-accent text-accent-foreground p-3 rounded-md mt-2 font-mono text-lg">
                        "{{ t('showcase.pluralization.simple_files', { n: fileCount }) }}"
                    </p>
                </div>

                <div>
                    <label for="message-slider" class="font-medium">{{ t('showcase.pluralization.advanced_label') }}: {{
                        messageCount }}</label>
                    <input id="message-slider" type="range" min="0" max="5" v-model.number="messageCount"
                        class="w-full mt-2">
                    <p class="bg-accent text-accent-foreground p-3 rounded-md mt-2 font-mono text-lg">
                        "{{ t('showcase.pluralization.advanced_messages', { count: messageCount }) }}"
                    </p>
                </div>
            </div>

            <div class="bg-card border-border border rounded-lg p-6 space-y-4">
                <h2 class="text-2xl font-semibold text-card-foreground">{{ t('showcase.interpolation.title') }}</h2>

                <div>
                    <label for="user-name" class="font-medium">{{ t('showcase.interpolation.named_label') }}</label>
                    <input id="user-name" type="text" v-model="userName"
                        :placeholder="t('showcase.interpolation.named_placeholder')"
                        class="w-full mt-2 bg-background border-border border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-ring">
                    <p class="mt-2 text-muted-foreground">{{ t('showcase.interpolation.hello', { name: userName }) }}
                    </p>
                </div>

                <div>
                    <h3 class="font-medium">{{ t('showcase.interpolation.linked_html_label') }}</h3>
                    <i18n-t keypath="showcase.interpolation.terms_html" tag="p"
                        class="mt-2 bg-secondary text-secondary-foreground p-3 rounded-md">
                        <template #link>
                            <a href="#" @click.prevent class="text-primary underline font-bold">{{
                                t('showcase.interpolation.terms_link_text') }}</a>
                        </template>
                    </i18n-t>
                </div>
            </div>

            <div class="bg-card border-border border rounded-lg p-6 space-y-4">
                <h2 class="text-2xl font-semibold text-card-foreground">{{ t('showcase.formatting.title') }}</h2>

                <div>
                    <h3 class="font-medium">{{ t('showcase.formatting.datetime_label') }}</h3>
                    <ul class="list-disc list-inside text-muted-foreground">
                        <li>{{ t('showcase.formatting.short_date') }}: <span class="font-semibold text-foreground">{{
                            d(now,
                                'short') }}</span></li>
                        <li>{{ t('showcase.formatting.long_date') }}: <span class="font-semibold text-foreground">{{
                            d(now, 'long')
                                }}</span></li>
                    </ul>
                </div>

                <div>
                    <h3 class="font-medium">{{ t('showcase.formatting.numeric_date_label') }}</h3>
                    <ul class="list-disc list-inside text-muted-foreground">
                        <li>{{ t('showcase.formatting.numeric_date') }}: <span class="font-semibold text-foreground">{{
                            d(now, 'numeric') }}</span></li>
                    </ul>
                </div>

                <div>
                    <h3 class="font-medium">{{ t('showcase.formatting.number_label') }}</h3>
                    <input type="number" v-model.number="price"
                        class="w-full max-w-xs mt-2 bg-background border-border border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-ring">
                    <ul class="list-disc list-inside text-muted-foreground mt-2">
                        <li>{{ t('showcase.formatting.currency_brl') }}: <span class="font-semibold text-foreground">{{
                            price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</span></li>
                        <li>{{ t('showcase.formatting.currency_usd') }}: <span class="font-semibold text-foreground">{{
                            price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</span></li>
                        <li>{{ t('showcase.formatting.percent') }}: <span class="font-semibold text-foreground">{{
                            n(0.95,
                                'percent') }}</span></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

// Hook do i18n para acessar todas as funcionalidades
// t: traduzir texto
// d: formatar data
// n: formatar número
// locale: idioma atual
const { t, d, n, locale } = useI18n();

// Estado reativo para os controles da UI
const fileCount = ref(1);
const messageCount = ref(0);
const userName = ref('Alex');
const price = ref(12345.67);
const now = ref(new Date());
</script>
