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
	class="flex w-full items-center space-x-3 {selectedFile === label ? 'bg-slate-300' : ''}"
	on:click={click}
	on:dblclick={dblclick}
>
	<slot />
	<p>{name}</p>
</a>
