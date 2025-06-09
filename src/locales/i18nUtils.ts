import { type I18nOptions } from 'vue-i18n'
import staticMessages from './index'
import { measurementFunctions } from './measurements'

const datetimeFormats: I18nOptions['datetimeFormats'] = {
    'en': {
        short: { year: 'numeric', month: 'short', day: 'numeric' },
        long: { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long', hour: 'numeric', minute: 'numeric' },
        numeric: { year: 'numeric', month: '2-digit', day: '2-digit' }
    },
    'pt': {
        short: { year: 'numeric', month: 'short', day: 'numeric' },
        long: { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long', hour: 'numeric', minute: 'numeric' },
        numeric: { day: '2-digit', month: '2-digit', year: 'numeric' } // Corrigido para o padrão brasileiro
    },
    'es': {
        short: { year: 'numeric', month: 'short', day: 'numeric' },
        long: { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long', hour: 'numeric', minute: 'numeric' },
        numeric: { day: '2-digit', month: '2-digit', year: 'numeric' } // Corrigido para o padrão espanhol
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
        currency: { style: 'currency', currency: 'EUR' },
        percent: { style: 'percent', minimumFractionDigits: 0 }
    }
}

// --- Lógica de Seleção de Idioma (seu código original, perfeito) ---
const availableLocales = Object.keys(staticMessages); // ['en', 'es', 'pt']

function getInitialLocale(): string {
    const savedLocale = localStorage.getItem('user-locale');
    if (savedLocale && availableLocales.includes(savedLocale)) {
        return savedLocale;
    }

    const browserLocale = navigator.language.split('-')[0];
    if (availableLocales.includes(browserLocale)) {
        return browserLocale;
    }

    return 'pt'; // Fallback para português
}


const finalMessages = {
    en: {
        ...staticMessages.en, // Inclui todo o conteúdo de en.json
        measurements: measurementFunctions.en // Adiciona a chave 'measurements' com as funções
    },
    pt: {
        ...staticMessages.pt,
        measurements: measurementFunctions.pt
    },
    es: {
        ...staticMessages.es,
        measurements: measurementFunctions.es
    }
}


const i18nOptions: I18nOptions = {
    legacy: false,
    locale: getInitialLocale(),
    fallbackLocale: 'pt',
    messages: finalMessages,
    datetimeFormats,
    numberFormats,
};

export { i18nOptions }

