<script lang="ts">
	import { writeCookie } from '$lib/helpers/cookieHelper';
	import { ChevronDown, ChevronRight } from 'lucide-svelte';
	import { onMount } from 'svelte';

	export let extend: boolean;
	export let name: string;
	export let cookie: string;
</script>

<div class="flex flex-col justify-center space-y-1">
	<button
		class="flex w-full items-center space-x-2"
		on:click={() => {
			extend = !extend;
			writeCookie(cookie, extend.toString(), 365, '/');
		}}
	>
		{#if extend}
			<ChevronDown class="size-5" />
		{:else}
			<ChevronRight class="size-5" />
		{/if}
		<p>{name}</p>
	</button>
	{#if extend}
		<div class="flex flex-col space-y-1 pl-6">
			<slot />
		</div>
	{/if}
</div>
