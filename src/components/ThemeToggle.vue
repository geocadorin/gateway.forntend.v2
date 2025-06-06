<template>
  <button
    @click="toggleTheme"
    class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10"
    :title="getThemeDisplayName()"
  >
    <span class="text-lg">{{ getThemeIcon() }}</span>
  </button>
</template>

<script setup lang="ts">
import { useTheme } from '../composables/useTheme';

const { toggleTheme, getThemeIcon, getThemeDisplayName } = useTheme();
</script> 