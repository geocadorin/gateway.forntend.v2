<template>
  <div class="space-y-6">
    <!-- Cabeçalho da página -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-foreground">{{ $t('layout.breadcrumb.dashboard') }}</h1>
        <p class="text-muted-foreground mt-1">{{ $t('dashboard.subtitle') }}</p>
      </div>
              <div class="flex items-center space-x-2">
        <button class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
          <Icon icon="mdi:plus" class="mr-2 h-4 w-4" />
          {{ $t('dashboard.actions.newItem') }}
        </button>
      </div>
    </div>

    <!-- Cards de estatísticas -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div class="rounded-lg border border-border bg-card p-6 shadow-sm">
        <div class="flex items-center justify-between space-y-0 pb-2">
          <h3 class="text-sm font-medium text-muted-foreground">{{ $t('dashboard.stats.totalDevices') }}</h3>
          <Icon icon="mdi:devices" class="h-4 w-4 text-muted-foreground" />
        </div>
        <div class="space-y-1">
          <div class="text-2xl font-bold text-foreground">1,234</div>
          <p class="text-xs text-green-600">+20.1% {{ $t('dashboard.stats.fromLastMonth') }}</p>
        </div>
      </div>

      <div class="rounded-lg border border-border bg-card p-6 shadow-sm">
        <div class="flex items-center justify-between space-y-0 pb-2">
          <h3 class="text-sm font-medium text-muted-foreground">{{ $t('dashboard.stats.activeAlerts') }}</h3>
          <Icon icon="mdi:alert-circle" class="h-4 w-4 text-muted-foreground" />
        </div>
        <div class="space-y-1">
          <div class="text-2xl font-bold text-foreground">23</div>
          <p class="text-xs text-red-600">+2 {{ $t('dashboard.stats.newToday') }}</p>
        </div>
      </div>

      <div class="rounded-lg border border-border bg-card p-6 shadow-sm">
        <div class="flex items-center justify-between space-y-0 pb-2">
          <h3 class="text-sm font-medium text-muted-foreground">{{ $t('dashboard.stats.dataTransmitted') }}</h3>
          <Icon icon="mdi:upload" class="h-4 w-4 text-muted-foreground" />
        </div>
        <div class="space-y-1">
          <div class="text-2xl font-bold text-foreground">12.5 GB</div>
          <p class="text-xs text-green-600">+8.2% {{ $t('dashboard.stats.fromLastWeek') }}</p>
        </div>
      </div>

      <div class="rounded-lg border border-border bg-card p-6 shadow-sm">
        <div class="flex items-center justify-between space-y-0 pb-2">
          <h3 class="text-sm font-medium text-muted-foreground">{{ $t('dashboard.stats.uptime') }}</h3>
          <Icon icon="mdi:check-circle" class="h-4 w-4 text-muted-foreground" />
        </div>
        <div class="space-y-1">
          <div class="text-2xl font-bold text-foreground">99.9%</div>
          <p class="text-xs text-green-600">{{ $t('dashboard.stats.excellent') }}</p>
        </div>
      </div>
    </div>

    <!-- Gráficos e tabelas -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <!-- Gráfico principal -->
      <div class="rounded-lg border border-border bg-card p-6 shadow-sm col-span-4">
        <div class="flex items-center justify-between pb-4">
          <h3 class="text-lg font-semibold text-foreground">{{ $t('dashboard.charts.telemetryOverview') }}</h3>
          <div class="flex items-center space-x-2">
            <button class="text-sm text-muted-foreground hover:text-foreground">{{ $t('dashboard.charts.last7days') }}</button>
            <button class="text-sm text-muted-foreground hover:text-foreground">{{ $t('dashboard.charts.last30days') }}</button>
          </div>
        </div>
        <div class="h-64 flex items-center justify-center bg-muted/20 rounded-md">
          <p class="text-muted-foreground">{{ $t('dashboard.charts.placeholder') }}</p>
        </div>
      </div>

      <!-- Atividades recentes -->
      <div class="rounded-lg border border-border bg-card p-6 shadow-sm col-span-3">
        <h3 class="text-lg font-semibold text-foreground pb-4">{{ $t('dashboard.recentActivity.title') }}</h3>
        <div class="space-y-4">
          <div class="flex items-start space-x-3">
            <div class="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <div class="flex-1">
              <p class="text-sm font-medium text-foreground">{{ $t('dashboard.recentActivity.deviceConnected') }}</p>
              <p class="text-xs text-muted-foreground">{{ $t('dashboard.recentActivity.timeAgo', { time: '2 min' }) }}</p>
            </div>
          </div>

          <div class="flex items-start space-x-3">
            <div class="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
            <div class="flex-1">
              <p class="text-sm font-medium text-foreground">{{ $t('dashboard.recentActivity.alertTriggered') }}</p>
              <p class="text-xs text-muted-foreground">{{ $t('dashboard.recentActivity.timeAgo', { time: '15 min' }) }}</p>
            </div>
          </div>

          <div class="flex items-start space-x-3">
            <div class="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div class="flex-1">
              <p class="text-sm font-medium text-foreground">{{ $t('dashboard.recentActivity.dataSync') }}</p>
              <p class="text-xs text-muted-foreground">{{ $t('dashboard.recentActivity.timeAgo', { time: '1 h' }) }}</p>
            </div>
          </div>

          <div class="flex items-start space-x-3">
            <div class="w-2 h-2 bg-gray-500 rounded-full mt-2"></div>
            <div class="flex-1">
              <p class="text-sm font-medium text-foreground">{{ $t('dashboard.recentActivity.maintenanceCompleted') }}</p>
              <p class="text-xs text-muted-foreground">{{ $t('dashboard.recentActivity.timeAgo', { time: '3 h' }) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { Icon } from '@iconify/vue';

const { t } = useI18n();
</script> 