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
    securityNote: "Protegido por criptografia de ponta a ponta",
    rememberMe: "Lembrar de mim",
    socialLogin: "Ou entre com",
    noAccount: "Não tem uma conta?",
    signUp: "Cadastre-se",
    welcomeBack: "Que bom te ver novamente!",
    secureAccess: "Acesso seguro e confiável"
  }
  -->
  <div class="min-h-screen flex relative overflow-hidden">
    <!-- Background com gradiente animado -->
    <div class="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div class="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5 animate-gradient-x"></div>
    </div>

    <!-- Left Side - Hero Section Melhorada -->
    <div class="hidden lg:flex lg:w-1/2 relative z-10">
      <!-- Background com overlay melhorado -->
      <div class="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-onboard-dark-blue">
        <!-- Padrões geométricos animados -->
        <div class="absolute inset-0 opacity-10">
          <div class="absolute top-20 left-20 w-32 h-32 bg-white rounded-full animate-pulse"></div>
          <div class="absolute top-40 right-32 w-24 h-24 bg-green-300 rounded-full animate-bounce" style="animation-delay: 0.5s"></div>
          <div class="absolute bottom-32 left-32 w-20 h-20 bg-blue-300 rounded-full animate-pulse" style="animation-delay: 1s"></div>
          <div class="absolute bottom-20 right-20 w-16 h-16 bg-purple-300 rounded-full animate-bounce" style="animation-delay: 1.5s"></div>
        </div>
        
        <!-- Grid pattern sutil -->
        <div class="absolute inset-0 opacity-5">
          <div class="grid grid-cols-12 gap-4 h-full">
            <div v-for="i in 12" :key="i" class="border-r border-white/20"></div>
          </div>
        </div>
      </div>
      
      <!-- Content melhorado -->
      <div class="relative z-20 flex flex-col justify-center items-start p-12 text-white">
        <!-- Status badge melhorado -->
        <div class="mb-8 transform hover:scale-105 transition-transform duration-300">
          <div class="inline-flex items-center space-x-3 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg">
            <div class="relative">
              <div class="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <div class="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-75"></div>
            </div>
            <span class="text-sm font-semibold tracking-wide">Sistema Online</span>
            <div class="w-2 h-2 bg-white/40 rounded-full"></div>
          </div>
        </div>
        
        <!-- Título principal melhorado -->
        <div class="mb-8">
          <h1 class="text-6xl font-bold leading-tight mb-4 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
            Monitoramento
            <br />
            <span class="text-green-300 animate-pulse">Inteligente</span>
          </h1>
          <p class="text-xl text-white/90 max-w-md leading-relaxed font-light">
            A evolução na conexão via satélite com tecnologia de ponta.
          </p>
        </div>
        
        <!-- Features List melhorada -->
        <div class="space-y-6 mb-8">
          <div class="flex items-center space-x-4 group cursor-pointer">
            <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm border border-white/10">
              <Icon icon="mdi:chart-line" class="w-6 h-6 text-green-300" />
            </div>
            <div>
              <span class="text-white font-medium text-lg">Telemetria em tempo real</span>
              <p class="text-white/70 text-sm">Monitoramento contínuo e preciso</p>
            </div>
          </div>
          
          <div class="flex items-center space-x-4 group cursor-pointer">
            <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm border border-white/10">
              <Icon icon="mdi:shield-check" class="w-6 h-6 text-blue-300" />
            </div>
            <div>
              <span class="text-white font-medium text-lg">Segurança avançada</span>
              <p class="text-white/70 text-sm">Proteção de dados garantida</p>
            </div>
          </div>
          
          <div class="flex items-center space-x-4 group cursor-pointer">
            <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm border border-white/10">
              <Icon icon="mdi:cog" class="w-6 h-6 text-purple-300" />
            </div>
            <div>
              <span class="text-white font-medium text-lg">Manutenção preditiva</span>
              <p class="text-white/70 text-sm">Antecipação de problemas</p>
            </div>
          </div>
        </div>

        <!-- Estatísticas -->
        <div class="grid grid-cols-3 gap-6 w-full max-w-md">
          <div class="text-center">
            <div class="text-2xl font-bold text-green-300">99.9%</div>
            <div class="text-xs text-white/70">Uptime</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-blue-300">24/7</div>
            <div class="text-xs text-white/70">Suporte</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-purple-300">1000+</div>
            <div class="text-xs text-white/70">Clientes</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Side - Login Form Melhorado -->
    <div class="flex-1 flex items-center justify-center p-8 relative z-10">
      <div class="w-full max-w-md">
        <!-- Card principal com glassmorphism -->
        <div class="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-white/20 relative overflow-hidden">
          <!-- Efeito de brilho sutil -->
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 animate-shimmer"></div>
          
          <!-- Logo e cabeçalho -->
          <div class="text-center mb-8">
            <div class="mb-6 transform hover:scale-105 transition-transform duration-300">
              <img class="mx-auto h-16 w-auto" src="@/assets/images/LogoExtend.png" alt="OnBoard Logo" />
            </div>
          </div>

          <!-- Error Message melhorada -->
          <Transition name="slide-down" mode="out-in">
            <div v-if="errorMessage" class="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl flex items-center space-x-3 shadow-sm" role="alert">
              <div class="flex-shrink-0 w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <Icon icon="mdi:alert-circle" class="h-4 w-4 text-red-600" />
              </div>
              <span class="text-sm font-medium">{{ errorMessage }}</span>
            </div>
          </Transition>

          <!-- Login Form melhorado -->
          <form class="space-y-6" @submit.prevent="handleLogin">
            <!-- Username Field melhorado -->
            <div class="space-y-2">
              <label for="username" class="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                <Icon icon="mdi:account" class="w-4 h-4 text-gray-500" />
                <span>{{ $t('login.usernameLabel') }}</span>
              </label>
              <div class="relative group">
                <input 
                  id="username" 
                  v-model="username" 
                  name="username" 
                  type="text" 
                  autocomplete="username" 
                  required
                  class="block w-full rounded-2xl border-2 border-gray-200 bg-gray-50/50 py-4 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 hover:border-gray-300 hover:bg-white focus:bg-white group-hover:shadow-md"
                  :placeholder="$t('login.usernamePlaceholder')"
                >
                <div class="absolute inset-y-0 right-0 flex items-center pr-4">
                  <Icon v-if="username" icon="mdi:check-circle" class="h-5 w-5 text-green-500" />
                </div>
              </div>
            </div>

            <!-- Password Field melhorado -->
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <label for="password" class="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                  <Icon icon="mdi:lock" class="w-4 h-4 text-gray-500" />
                  <span>{{ $t('login.passwordLabel') }}</span>
                </label>
                <button type="button" class="text-sm text-primary hover:text-primary/80 font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg px-2 py-1 transition-colors">
                  {{ $t('login.forgotPassword') }}
                </button>
              </div>
              <div class="relative group">
                <input 
                  id="password" 
                  v-model="password" 
                  name="password" 
                  :type="passwordFieldType" 
                  autocomplete="current-password" 
                  required
                  class="block w-full rounded-2xl border-2 border-gray-200 bg-gray-50/50 py-4 px-4 pr-12 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 hover:border-gray-300 hover:bg-white focus:bg-white group-hover:shadow-md"
                  :placeholder="$t('login.passwordPlaceholder')"
                >
                <button 
                  type="button" 
                  @click.prevent="togglePasswordVisibility" 
                  class="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg transition-colors"
                >
                  <Icon :icon="showPassword ? 'mdi:eye-off' : 'mdi:eye'" class="h-5 w-5" />
                </button>
              </div>
            </div>

            <!-- Login Button melhorado -->
            <button 
              type="submit" 
              :disabled="isLoading || !isFormValid"
              class="group relative w-full flex justify-center items-center py-4 px-6 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary disabled:from-green-200 disabled:to-green-300 text-white font-semibold rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 disabled:cursor-not-allowed shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 transform hover:-translate-y-1 disabled:transform-none disabled:shadow-none"
            >
              <Transition name="spin" mode="out-in">
                <Icon v-if="isLoading" icon="mdi:loading" class="h-5 w-5 animate-spin mr-2" />
                <Icon v-else icon="mdi:login" class="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform" />
              </Transition>
              {{ isLoading ? $t('login.loadingButton') : $t('login.button') }}
            </button>

            <!-- Security note melhorada -->
            <div class="text-center pt-4">
              <div class="inline-flex items-center space-x-2 text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-full">
                <Icon icon="mdi:shield-check" class="w-4 h-4 text-green-500" />
                <span>{{ $t('login.securityNote') }}</span>
              </div>
            </div>
          </form>
        </div>

        <!-- Mobile hero content -->
        <div class="lg:hidden mt-8 text-center">
          <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ $t('login.secureAccess') }}</h3>
          <p class="text-gray-600 text-sm">Tecnologia de ponta para monitoramento via satélite</p>
        </div>
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
const rememberMe = ref(false);
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

// Validation melhorada
const isEmailValid = computed(() => {
  if (!username.value) return false;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(username.value) || username.value.length > 3;
});

const isPasswordValid = computed(() => password.value.length >= 6);

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
      password: password.value,
      //rememberMe: rememberMe.value
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
/* Animações personalizadas */
@keyframes gradient-x {
  0%, 100% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(100%);
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%) skewX(-12deg);
  }
  100% {
    transform: translateX(200%) skewX(-12deg);
  }
}

.animate-gradient-x {
  animation: gradient-x 15s ease infinite;
}

.animate-shimmer {
  animation: shimmer 3s ease-in-out infinite;
}

/* Transições suaves melhoradas */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
}

.spin-enter-active,
.spin-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.spin-enter-from,
.spin-leave-to {
  opacity: 0;
  transform: scale(0.8) rotate(180deg);
}

/* Hover effects melhorados */
input:hover {
  transform: translateY(-1px);
}

input:focus {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 0 0 3px hsl(var(--ring) / 0.1);
}

button:focus {
  box-shadow: 0 0 0 3px hsl(var(--ring) / 0.1);
}

/* Glassmorphism effect */
.backdrop-blur-xl {
  backdrop-filter: blur(20px);
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

/* Responsive improvements */
@media (max-width: 1024px) {
  .min-h-screen {
    min-height: 100vh;
    padding: 1rem;
  }
}

/* Loading state improvements */
.group:disabled .group-hover\:translate-x-1 {
  transform: translateX(0);
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .animate-pulse,
  .animate-bounce,
  .animate-gradient-x,
  .animate-shimmer {
    animation: none;
  }
  
  .transition-all,
  .transition-colors,
  .transition-transform {
    transition: none;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .bg-white\/80 {
    background-color: rgba(31, 41, 55, 0.8);
  }
  
  .text-gray-900 {
    color: rgb(243, 244, 246);
  }
  
  .text-gray-600 {
    color: rgb(156, 163, 175);
  }
  
  .border-gray-200 {
    border-color: rgb(75, 85, 99);
  }
}
</style>

