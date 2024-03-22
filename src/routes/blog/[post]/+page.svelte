<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex w-screen justify-center p-10">
	<article class="prose prose-lg flex h-full flex-col items-center">
		{#if data.content}
			<svelte:component this={data.content} />
		{/if}
	</article>
</div>
