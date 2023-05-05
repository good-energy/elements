<script lang="ts">
	import { browser } from '$app/environment';
	export let loginRoute: string = '/login';
	import { supabase } from '$lib';

	async function signout() {
		await supabase.client.auth.signOut();
		await fetch('/signout');
		window.location.href = loginRoute;
	}
</script>

<button class="btn btn-sm variant-filled-surface" on:click={signout}>sign out</button>
