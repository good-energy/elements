import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';
import precompileIntl from "svelte-intl-precompile/sveltekit-plugin";
/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		preprocess({
			postcss: true
		})
	],

	kit: {

		adapter: adapter()
	},
	vite: {
		target: '#svelte',
		plugins: [
			precompileIntl('locales') // if your translations are defined in /locales/[lang].json
		]
	}
};

export default config;
