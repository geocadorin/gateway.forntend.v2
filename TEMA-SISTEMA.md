# 🌓 Sistema de Temas Dark/Light - Tailwind CSS v4

## ✅ Configuração Implementada

### 1. **Tailwind CSS v4.1.8**
- Versão mais recente instalada corretamente
- Plugin `@tailwindcss/vite` configurado
- Import atualizado para a sintaxe v4: `@import "tailwindcss"`

### 2. **Sistema de Cores com Variáveis CSS**
Todas as cores são baseadas em variáveis CSS HSL para fácil personalização:

```css
/* Tema Light (padrão) */
:root {
  --background: 0 0% 100%; /* Branco */
  --foreground: 224 71% 4%; /* Azul escuro OnBoard */
  --primary: 140 75% 44%; /* Verde OnBoard */
  /* ... outras variáveis */
}

/* Tema Dark */
.dark {
  --background: 240 10% 3.9%; /* Fundo escuro suave */
  --foreground: 0 0% 98%; /* Texto claro */
  /* ... outras variáveis */
}
```

### 3. **Store Pinia para Gerenciamento**
- Estado global do tema atual
- Persistência no localStorage
- Detecção automática da preferência do sistema

### 4. **Composable para Facilitar Uso**
```typescript
import { useTheme } from '@/composables/useTheme'

const {
  currentTheme,
  isDark,
  isLight,
  toggleTheme,
  setTheme,
  getThemeIcon,
  getThemeDisplayName
} = useTheme()
```

## 🚀 Como Usar

### Alternando Temas Programaticamente
```vue
<script setup>
import { useTheme } from '@/composables/useTheme'

const { setTheme, toggleTheme } = useTheme()

// Definir tema específico
setTheme('dark')
setTheme('light')

// Alternar entre temas
toggleTheme()
</script>
```

### Componente Alternador de Tema
```vue
<template>
  <ThemeToggle />
</template>

<script setup>
import ThemeToggle from '@/components/ThemeToggle.vue'
</script>
```

### Classes Tailwind para Temas
Use as classes customizadas que se adaptam automaticamente:

```vue
<template>
  <!-- Fundo e texto se adaptam ao tema -->
  <div class="bg-background text-foreground">
    
    <!-- Card com cores do tema -->
    <div class="bg-card text-card-foreground border border-border">
      <h2 class="text-primary">Título Verde OnBoard</h2>
      <p class="text-muted-foreground">Texto secundário</p>
    </div>
    
    <!-- Botões com cores temáticas -->
    <button class="bg-primary text-primary-foreground hover:bg-primary/90">
      Botão Primário
    </button>
    
    <button class="bg-secondary text-secondary-foreground hover:bg-secondary/80">
      Botão Secundário
    </button>
    
  </div>
</template>
```

## 🎨 Paleta de Cores

### Cores da Marca OnBoard
- **Verde Principal**: `hsl(140, 75%, 44%)` - #2ECC71
- **Azul Escuro**: `hsl(224, 71%, 4%)` - #0B1426

### Sistema de Cores Semânticas
- `background` / `foreground` - Fundo e texto principal
- `card` / `card-foreground` - Cards e containers
- `primary` / `primary-foreground` - Ação principal (verde OnBoard)
- `secondary` / `secondary-foreground` - Ações secundárias
- `muted` / `muted-foreground` - Elementos menos importantes
- `accent` / `accent-foreground` - Destaques
- `destructive` / `destructive-foreground` - Ações destrutivas/erros
- `border` - Bordas
- `input` - Campos de entrada
- `ring` - Foco/outline

## 🔧 Funcionalidades Implementadas

### ✅ Detecção Automática
- Detecta preferência do sistema (`prefers-color-scheme`)
- Aplica tema salvo no localStorage
- Fallback para tema light

### ✅ Persistência
- Salva preferência no localStorage
- Mantém tema entre sessões

### ✅ Aplicação Dinâmica
- Adiciona/remove classe `dark` no `<html>`
- Transições suaves entre temas
- Sem flash de conteúdo incorreto

### ✅ TypeScript
- Tipos seguros para temas
- IntelliSense completo
- Validação em tempo de compilação

## 🚀 Teste o Sistema

Execute o projeto e:
1. Clique no botão alternador (☀️/🌙) no header
2. Veja as cores mudarem instantaneamente
3. Recarregue a página - o tema será mantido
4. Teste com diferentes preferências do sistema

```bash
npm run dev
```

O sistema está 100% funcional e pronto para produção! 🎉 