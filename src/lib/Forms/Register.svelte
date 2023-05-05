<script lang="ts">
	import { supabase } from '$lib';
	import { goto } from '$app/navigation';
	export let width: string = 'max-w-sm';
	let _class = '';
	export { _class as class };
	export let loginRoute: string = '/login';
	export let successRoute: string = '/registered';
	import SocialLogin from './SocialLogin/SocialLogin.svelte';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	import { z } from 'zod';
	import ErrorMessage from './ErrorMessage.svelte';
	let error: string | null;
	const schema = z.object({
		email: z.string().email('Bitte geben Sie eine gültige E-Mail an.'),
		password: z
			.string()
			.min(8, 'Das Passwort muss mindestnes 8 Zeichen lang sein.')
			.regex(/([!@#$&*])/, 'Passwort muss mindestens ein sonderzeichen enthalten!')
			.regex(/([A-Z])/, 'Passwort muss mindestens einen Großbuchstaben enthalten!')
			.regex(/([0-9])/, 'Passwort muss mindestens eine Zahl enthalten!')
	});

	const { form, errors, warnings } = createForm({
		onSubmit: async (values) => {
			error = null;
			const result = await supabase.client.auth.signUp(values);

			if (result.error) {
				if (result.error.message.includes('User already registered')) {
					error = 'Die angebene E-Mailaddresse wird bereits verwendet.';
				}
			} else {
				goto(successRoute);
			}
		},
		extend: validator({ schema })
	});
</script>

<div class="{width} {_class} mx-5 md:mx-auto">
	<SocialLogin />
	<form class=" card variant-surface shadow" use:form>
		<div class="p-4 space-y-3 border-b-2 border-surface-400-500-token">
			<input
				class="input"
				class:input-error={$errors.email}
				type="text"
				name="email"
				placeholder="E-Mail"
			/>
			<ErrorMessage error={$errors.email} />
			<input
				class="input"
				type="password"
				name="password"
				placeholder="Password"
				class:input-error={$errors.password}
			/>
			<ErrorMessage error={$errors.password} warning={$warnings.password} />
			<button class="btn variant-filled-primary w-full">Registrieren</button>
		</div>
		<div class="p-4">Bereits registriert? <a href={loginRoute}>Hier anmelden</a></div>
	</form>

	{#if error}
		<aside class="alert variant-filled-error mt-3">
			<div class="alert-message">
				<p>{error}</p>
			</div>
		</aside>
	{/if}
</div>
