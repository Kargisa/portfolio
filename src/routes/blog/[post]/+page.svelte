<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex w-screen justify-center p-10">
	<article class="prose flex flex-col items-center">
		<svelte:component this={data.content} />
	</article>
</div>
