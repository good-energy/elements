<script lang="ts">
	export let error: null | [string] = null;
	export let warning: null | [string] = null;
</script>

{#if error}
	<small class="text-error-500">{error[0]}</small>
{:else if warning}
	<small class="text-warning-500">{warning[0]}</small>
{/if}
