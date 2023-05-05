<script lang="ts">
	export let key: string;
	export let tag: string = 'span';
	let _class: string;
	export { _class as class };
</script>

<svelte:element this={tag} class:_class id="i18n">
	{key}
</svelte:element>
