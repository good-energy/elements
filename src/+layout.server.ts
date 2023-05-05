import { addMessages, init } from 'svelte-intl-precompile';
export const load = async ({ locals: { getSession } }) => {
    const en = {
        hello: "World"
    }
    addMessages('en', en);
    const result = init({
        initialLocale: 'en',
        fallbackLocale: 'en'
    });
    console.log(result)
    return {
        session: await getSession()
    };
};