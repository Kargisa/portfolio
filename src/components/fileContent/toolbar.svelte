<script lang="ts">
	import { goto } from '$app/navigation';
	import { Expand, ExternalLink, Shrink } from 'lucide-svelte';

	let clazz: string = '';
	export { clazz as class };
	export let fullscreen: boolean;
	export let openFile: string;

	const iconSize = 32;
	const buttonStyle: string = 'p-2';
</script>

<div class="flex h-full flex-col items-center justify-center {clazz}">
	<button class={buttonStyle} on:click={() => (fullscreen = !fullscreen)}>
		{#if fullscreen}
			<Shrink size={iconSize} />
		{:else}
			<Expand size={iconSize} />
		{/if}
	</button>
	<a href={`/blog/${openFile}`} target="_blank" title="new window" class={buttonStyle}>
		<ExternalLink size={iconSize} />
	</a>
</div>
