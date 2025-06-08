import { type I18nOptions } from 'vue-i18n'
import messages from './index'

const datetimeFormats: I18nOptions['datetimeFormats'] = {
    'en': {
        short: { year: 'numeric', month: 'short', day: 'numeric' },
        long: { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long', hour: 'numeric', minute: 'numeric' },
        numeric: { year: 'numeric', month: '2-digit', day: '2-digit' }
    },
    'pt': {
        short: { year: 'numeric', month: 'short', day: 'numeric' },
        long: { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long', hour: 'numeric', minute: 'numeric' },
        numeric: { year: 'numeric', month: '2-digit', day: '2-digit' }
    },
    'es': {
        short: { year: 'numeric', month: 'short', day: 'numeric' },
        long: { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long', hour: 'numeric', minute: 'numeric' },
        numeric: { year: 'numeric', month: '2-digit', day: '2-digit' }
    }
}

const numberFormats: I18nOptions['numberFormats'] = {
    'en': {
        currency: { style: 'currency', currency: 'USD' },
        percent: { style: 'percent', minimumFractionDigits: 0 }
    },
    'pt': {
        currency: { style: 'currency', currency: 'BRL' },
        percent: { style: 'percent', minimumFractionDigits: 0 }
    },
    'es': {
        currency: { style: 'currency', currency: 'EUR' }, // Usando EUR para o exemplo espanhol
        percent: { style: 'percent', minimumFractionDigits: 0 }
    }
}

const availableLocales = Object.keys(messages); // ['en', 'es', 'pt']

function getInitialLocale(): string {
    // 1. Prioridade: verificar se o usuário já salvou uma preferência
    const savedLocale = localStorage.getItem('user-locale');
    if (savedLocale && availableLocales.includes(savedLocale)) {
        return savedLocale;
    }

    // 2. Segunda opção: usar o idioma do navegador
    const browserLocale = navigator.language.split('-')[0]; // Pega 'pt' de 'pt-BR'
    if (availableLocales.includes(browserLocale)) {
        return browserLocale;
    }

    // 3. Última opção: usar o idioma padrão
    return 'pt';
}

const i18nOptions: I18nOptions = {
    legacy: false,
    locale: getInitialLocale(),
    fallbackLocale: 'en',
    messages,
    datetimeFormats,
    numberFormats
};

export { i18nOptions }

