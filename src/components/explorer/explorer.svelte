<script lang="ts">
	let clazz: string = '';
	export { clazz as class };
	export let hide: boolean;
</script>

{#if !hide}
	<div class={clazz}>
		<p class="-mt-2 flex h-10 items-center pl-8 text-sm">EXPLORER</p>
		<div class="flex flex-col space-y-2">
			<slot />
		</div>
	</div>
{/if}
