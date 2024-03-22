<script lang="ts">
	let clazz: string = '';
	export { clazz as class };

	export let hide: boolean;
</script>

{#if !hide}
	<div class="flex min-h-10 items-center border-b-2 {clazz}">
		<slot />
	</div>
{/if}
