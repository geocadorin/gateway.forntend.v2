<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold text-foreground">{{ $t('layout.breadcrumb.analytics') }}</h1>
      <p class="text-muted-foreground mt-1">Análises detalhadas dos dados de telemetria</p>
    </div>
    
    <div class="rounded-lg border border-border bg-card p-6 shadow-sm">
      <h2 class="text-xl font-semibold text-foreground mb-4">Relatórios Analíticos</h2>
      <p class="text-muted-foreground">Esta página mostra análises detalhadas dos dados coletados.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script> 