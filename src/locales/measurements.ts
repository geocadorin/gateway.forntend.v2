import type { MessageContext } from 'vue-i18n';

// Fatores de Conversão
const METER_TO_FEET = 3.28084;
const KG_TO_POUND = 2.20462;
const LITER_TO_GALLON = 0.264172;
const KPA_TO_PSI = 0.145038;

const getNumericValue = (value: unknown): number | null => {
    const num = parseFloat(String(value));
    return isNaN(num) ? null : num;
};

export const measurementFunctions = {
    en: {
        length: (ctx: MessageContext): string => {
            const value = getNumericValue(ctx.named('value'));
            if (value === null) return "N/A";
            return `${(value * METER_TO_FEET).toFixed(2)} ft`;
        },
        mass: (ctx: MessageContext): string => {
            const value = getNumericValue(ctx.named('value'));
            if (value === null) return "N/A";
            return `${(value * KG_TO_POUND).toFixed(2)} lb`;
        },
        volume: (ctx: MessageContext): string => {
            const value = getNumericValue(ctx.named('value'));
            if (value === null) return "N/A";
            return `${(value * LITER_TO_GALLON).toFixed(2)} gal`;
        },
        temperature: (ctx: MessageContext): string => {
            const value = getNumericValue(ctx.named('value'));
            if (value === null) return "N/A";
            return `${((value * 9 / 5) + 32).toFixed(1)} °F`;
        },
        pressure: (ctx: MessageContext): string => {
            const value = getNumericValue(ctx.named('value'));
            if (value === null) return "N/A";
            return `${(value * KPA_TO_PSI).toFixed(2)} psi`;
        },
    },
    pt: {
        length: (ctx: MessageContext): string => {
            const value = getNumericValue(ctx.named('value'));
            return value === null ? 'N/D' : `${value.toFixed(2)} m`;
        },
        mass: (ctx: MessageContext): string => {
            const value = getNumericValue(ctx.named('value'));
            return value === null ? 'N/D' : `${value.toFixed(2)} kg`;
        },
        volume: (ctx: MessageContext): string => {
            const value = getNumericValue(ctx.named('value'));
            return value === null ? 'N/D' : `${value.toFixed(2)} L`;
        },
        temperature: (ctx: MessageContext): string => {
            const value = getNumericValue(ctx.named('value'));
            return value === null ? 'N/D' : `${value.toFixed(1)} °C`;
        },
        pressure: (ctx: MessageContext): string => {
            const value = getNumericValue(ctx.named('value'));
            return value === null ? 'N/D' : `${value.toFixed(2)} kPa`;
        },
    },
    es: {
        length: (ctx: MessageContext): string => {
            const value = getNumericValue(ctx.named('value'));
            return value === null ? 'N/D' : `${value.toFixed(2)} m`;
        },
        mass: (ctx: MessageContext): string => {
            const value = getNumericValue(ctx.named('value'));
            return value === null ? 'N/D' : `${value.toFixed(2)} kg`;
        },
        volume: (ctx: MessageContext): string => {
            const value = getNumericValue(ctx.named('value'));
            return value === null ? 'N/D' : `${value.toFixed(2)} L`;
        },
        temperature: (ctx: MessageContext): string => {
            const value = getNumericValue(ctx.named('value'));
            return value === null ? 'N/D' : `${value.toFixed(1)} °C`;
        },
        pressure: (ctx: MessageContext): string => {
            const value = getNumericValue(ctx.named('value'));
            return value === null ? 'N/D' : `${value.toFixed(2)} kPa`;
        },
    }
};
