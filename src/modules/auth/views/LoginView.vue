<template>
  <!-- 
  Chaves de tradução sugeridas para o vue-i18n:
  
  login: {
    title: "Bem-vindo de volta",
    subtitle: "Acesse sua conta para continuar",
    usernameLabel: "Nome de usuário",
    usernamePlaceholder: "Digite seu nome de usuário",
    passwordLabel: "Senha",
    passwordPlaceholder: "Digite sua senha",
    forgotPassword: "Esqueceu a senha?",
    button: "Entrar",
    loadingButton: "Entrando...",
    error: "Erro ao fazer login. Verifique suas credenciais.",
    securityNote: "Protegido por criptografia de ponta a ponta"
  }
  -->
  <div class="min-h-screen flex">
    <!-- Left Side - Hero Section -->
    <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-onboard-dark-blue">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-20">
        <div class="absolute inset-0 bg-gradient-radial from-white/30 via-transparent to-transparent"></div>
        <div class="absolute inset-0 pattern-dots pattern-white pattern-bg-transparent pattern-size-4 pattern-opacity-10"></div>
      </div>
      
      <!-- Content -->
      <div class="relative z-10 flex flex-col justify-center items-start p-12 text-white">
        <div class="mb-8">
          <div class="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span class="text-sm font-medium">Sistema Online</span>
          </div>
        </div>
        
        <h1 class="text-5xl font-bold leading-tight mb-6">
          Monitoramento
          <br />
          <span class="text-green-300">Inteligente</span>
        </h1>
        
        <p class="text-xl text-white/80 mb-8 max-w-md leading-relaxed">
          A evolução na conexão via satélite. 🛰
        </p>
        
        <!-- Features List -->
        <div class="space-y-4">
          <div class="flex items-center space-x-3">
            <div class="flex-shrink-0 w-8 h-8 bg-green-400/20 rounded-lg flex items-center justify-center">
              <Icon icon="mdi:chart-line" class="w-4 h-4 text-green-300" />
            </div>
            <span class="text-white/90">Telemetria em tempo real</span>
          </div>
          <div class="flex items-center space-x-3">
            <div class="flex-shrink-0 w-8 h-8 bg-green-400/20 rounded-lg flex items-center justify-center">
              <Icon icon="mdi:shield-check" class="w-4 h-4 text-green-300" />
            </div>
            <span class="text-white/90">Segurança e confiabilidade</span>
          </div>
          <div class="flex items-center space-x-3">
            <div class="flex-shrink-0 w-8 h-8 bg-green-400/20 rounded-lg flex items-center justify-center">
              <Icon icon="mdi:cog" class="w-4 h-4 text-green-300" />
            </div>
            <span class="text-white/90">Manutenção preditiva</span>
          </div>
        </div>
      </div>
      
      <!-- Floating Elements -->
      <div class="absolute top-20 right-20 w-32 h-32 bg-white/5 rounded-full backdrop-blur-sm animate-pulse"></div>
      <div class="absolute bottom-32 right-32 w-16 h-16 bg-green-400/20 rounded-full animate-bounce" style="animation-delay: 1s"></div>
    </div>

    <!-- Right Side - Login Form -->
    <div class="flex-1 flex items-center justify-center p-8 bg-gray-100">
      <div class="w-full max-w-md space-y-8 bg-white shadow-lg rounded-lg p-6">
        <!-- Logo -->
        <div class="text-center">
          <img class="mx-auto h-20 w-auto mb-4" src="@/assets/images/LogoExtend.png" alt="OnBoard Logo" />
        </div>

        <!-- Error Message -->
        <Transition name="slide-down" mode="out-in">
          <div v-if="errorMessage" class="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-xl flex items-center space-x-3" role="alert">
            <div class="flex-shrink-0 w-8 h-8 bg-destructive/20 rounded-lg flex items-center justify-center">
              <Icon icon="mdi:alert-circle" class="h-4 w-4" />
            </div>
            <span class="text-sm font-medium">{{ errorMessage }}</span>
          </div>
        </Transition>

        <!-- Login Form -->
        <form class="space-y-6" @submit.prevent="handleLogin">
          <!-- Username Field -->
          <div class="space-y-2">
            <label for="username" class="text-sm font-semibold text-foreground">
              {{ $t('login.usernameLabel') }}
            </label>
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 flex items-center pl-4">
                <Icon icon="mdi:account" class="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              </div>
              <input 
                id="username" 
                v-model="username" 
                name="username" 
                type="text" 
                autocomplete="username" 
                required
                class="block w-full rounded-xl border border-border bg-card py-3.5 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:border-ring transition-all duration-200 hover:border-primary/50"
                :placeholder="$t('login.usernamePlaceholder')"
              >
            </div>
          </div>

          <!-- Password Field -->
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <label for="password" class="text-sm font-semibold text-foreground">
                {{ $t('login.passwordLabel') }}
              </label>
              <button type="button" class="text-sm text-primary hover:text-primary/80 font-medium focus:outline-none focus:ring-2 focus:ring-ring rounded-md px-1 transition-colors">
                {{ $t('login.forgotPassword') }}
              </button>
            </div>
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 flex items-center pl-4">
                <Icon icon="mdi:lock" class="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              </div>
              <input 
                id="password" 
                v-model="password" 
                name="password" 
                :type="passwordFieldType" 
                autocomplete="current-password" 
                required
                class="block w-full rounded-xl border border-border bg-card py-3.5 pl-12 pr-12 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:border-ring transition-all duration-200 hover:border-primary/50"
                :placeholder="$t('login.passwordPlaceholder')"
              >
              <button 
                type="button" 
                @click.prevent="togglePasswordVisibility" 
                class="absolute inset-y-0 right-0 flex items-center pr-4 text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring rounded-md transition-colors"
              >
                <Icon :icon="showPassword ? 'mdi:eye-off' : 'mdi:eye'" class="h-5 w-5" />
              </button>
            </div>
          </div>

          <!-- Login Button -->
          <button 
            type="submit" 
            :disabled="isLoading || !isFormValid"
            class="group relative w-full flex justify-center items-center py-3.5 px-6 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-primary-foreground font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transform hover:-translate-y-0.5 disabled:transform-none"
          >
            <Transition name="spin" mode="out-in">
              <Icon v-if="isLoading" icon="mdi:loading" class="h-5 w-5 animate-spin mr-2" />
              <Icon v-else icon="mdi:login" class="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform" />
            </Transition>
            {{ isLoading ? $t('login.loadingButton') : $t('login.button') }}
          </button>

          <!-- Additional Info -->
          <div class="text-center">
            <p class="text-xs text-muted-foreground">
              {{ $t('login.securityNote') }}
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useUIStore } from '../../../store/ui.store';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { authService } from '../../../core/services';
import { Icon } from '@iconify/vue';
import { useToast } from 'vue-toastification';

// State
const username = ref('');
const password = ref('');
const errorMessage = ref<string | null>(null);
const showPassword = ref(false);

// Composables
const uiStore = useUIStore();
const router = useRouter();
const { t } = useI18n();
const toast = useToast(); 

// Computed properties
const isLoading = computed(() => uiStore.isLoading);
const passwordFieldType = computed(() => (showPassword.value ? 'text' : 'password'));

// Validation
const isEmailValid = computed(() => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(username.value);
});

const isPasswordValid = computed(() => password.value.length > 4);

const isFormValid = computed(() => isEmailValid.value && isPasswordValid.value);

// Methods
function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}

async function handleLogin() {
  if (isLoading.value) return;

  uiStore.setLoading(true);
  errorMessage.value = null;

  try {
    await authService.login({
      email: username.value,
      password: password.value
    });
    
    toast.success(t('login.successMessage'));
    const redirectPath = router.currentRoute.value.query.redirect as string || '/dashboard';
    router.push(redirectPath);

  } catch (error: any) {
    console.error("Login failed:", error);
    errorMessage.value = error.response?.data?.message || error.message || t('login.error');
    toast.error(errorMessage.value);
    password.value = '';
  } finally {
    uiStore.setLoading(false);
  }
}
</script>

<style scoped>
/* Transições suaves */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.spin-enter-active,
.spin-leave-active {
  transition: all 0.2s ease;
}

.spin-enter-from,
.spin-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

/* Animações personalizadas */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

/* Custom utilities para cores da OnBoard */
.bg-onboard-green {
  background-color: hsl(var(--onboard-green));
}

.bg-onboard-dark-blue {
  background-color: hsl(var(--onboard-dark-blue));
}

.text-onboard-green {
  color: hsl(var(--onboard-green));
}

.text-onboard-dark-blue {
  color: hsl(var(--onboard-dark-blue));
}

/* Background patterns customizados */
.bg-gradient-radial {
  background: radial-gradient(circle at 50% 120%, rgba(255, 255, 255, 0.3), transparent);
}

.pattern-dots {
  background-image: radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.1) 1px, transparent 0);
  background-size: 20px 20px;
}

/* Focus states aprimorados */
input:focus {
  box-shadow: 0 0 0 3px hsl(var(--ring) / 0.1);
}

button:focus {
  box-shadow: 0 0 0 3px hsl(var(--ring) / 0.1);
}
</style>