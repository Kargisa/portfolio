<script lang="ts">
	import { goto } from '$app/navigation';
	import { createEventDispatcher } from 'svelte';

	export let label: string;
	export let selectedFile: string;
	export let name: string;
	export let href: string;

	const dispatch = createEventDispatcher();

	const click = () => {
		dispatch('click');
	};

	const dblclick = () => {
		dispatch('dblclick');
	};
</script>

<a
	{href}
	class="flex h-8 w-full items-center space-x-3 pl-4 {selectedFile === label
		? 'bg-blue-200'
		: 'hover:bg-blue-50'}"
	on:click={click}
	on:dblclick={dblclick}
>
	<div class="h-full {selectedFile === label ? 'border-l-2' : ''}" />

	<slot />
	<p>{name}</p>
</a>
