<script lang="ts">
	export let width: string = 'max-w-sm';
	let _class: string = '';
	export let registerRoute: string = '/register';
	export { _class as class };
	import { supabase } from '$lib';
	import SocialLogin from './SocialLogin/SocialLogin.svelte';
	export let successRoute: string = '/magiclink';

	import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	import { z } from 'zod';
	import ErrorMessage from './ErrorMessage.svelte';
	import { goto } from '$app/navigation';
	const schema = z.object({
		email: z.string().email('Bitte geben Sie eine gültige E-Mail an.')
	});
	let success: null | string = null;
	let error: null | string = null;
	const { form, errors, touched } = createForm({
		onSubmit: async (values) => {
			const result = await supabase.client.auth.signInWithOtp(values);
			if (result.error) {
				error = result.error.message;
			} else {
				goto(successRoute);
			}
		},
		extend: validator({ schema })
	});
</script>

<div class="{width} {_class}  mx-5 md:mx-auto">
	<SocialLogin />
	<div class=" card variant-surface shadow">
		<form class="body p-4 border-b-2 border-surface-400-500-token space-y-3" use:form>
			<div
				class="input-group input-group-divider grid-cols-[1fr_auto]"
				class:input-error={$errors.email}
			>
				<input type="text" name="email" placeholder="E-Mail" />
				<button class="btn rounded-none variant-filled-primary w-full flex gap-2"
					><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"
						><path
							fill="currentColor"
							d="m27.45 15.11l-22-11a1 1 0 0 0-1.08.12a1 1 0 0 0-.33 1L6.69 15H18v2H6.69L4 26.74A1 1 0 0 0 5 28a1 1 0 0 0 .45-.11l22-11a1 1 0 0 0 0-1.78Z"
						/></svg
					></button
				>
			</div>
			<ErrorMessage error={$errors.email} />
		</form>

		<div class="p-4">Neu hier? <a href={registerRoute}> Benutzerkonto anlegen</a></div>
	</div>

	{#if error}
		<aside class="alert variant-filled-error mt-3">
			<div class="alert-message">
				{@html error}
			</div>
		</aside>
	{/if}
</div>
