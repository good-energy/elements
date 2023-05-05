// lang.ts
import type { Handle, RequestEvent } from '@sveltejs/kit';
import {
    init,
    addMessages,
    waitLocale,
    getLocaleFromAcceptLanguageHeader,
    getLocaleFromNavigator
} from 'svelte-intl-precompile';



const DEFAULT_LOCALE = 'en';

const getTexts = async (lang: string) => lang === "de" ? { hallo: "Welt" } : { hallo: "World" }

// add this hook to your hooks.server.ts sequence
// and update app.html to use `<html lang="%lang%">`
export const i18n: Handle = async ({ event, resolve }) => {
    const lang = (await loadLocale(event)).split("-")[0];
    const texts = await getTexts(lang)

    addMessages(lang, texts)
    return resolve(event, {
        transformPageChunk: ({ html }) => html.replace('%lang%', lang)
    });
};

export const i18n_client = async () => {
    const texts = await getTexts("en")
    //addMessages("en", texts)
};


// call this function with await in hooks.client.ts
export async function loadLocale(event: RequestEvent | undefined) {
    const locale = event ? getSSRLocale(event) : getClientLocale();
    init({ initialLocale: locale, fallbackLocale: DEFAULT_LOCALE });
    await waitLocale(locale);
    return locale;
}

function getSSRLocale(event: RequestEvent) {
    // prefer stored user locale, fall back to accept header and default
    return (
        event.locals?.user?.locale ||
        getLocaleFromAcceptLanguageHeader(event.request.headers.get('Accept-Language')) ||
        DEFAULT_LOCALE
    );
}

function getClientLocale() {
    // html lang attr is set by SSR hook, so we just reuse that
    // otherwise fall back to navigator or default
    return document?.documentElement.lang || getLocaleFromNavigator() || DEFAULT_LOCALE;
}

