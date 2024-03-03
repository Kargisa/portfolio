<script lang="ts">
	import { X } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let name: string;
	export let label: string;
	export let selectedFile: string;

	const click = () => {
		selectedFile = label;
		dispatch('click');
	};
</script>

<button
	class="flex min-w-36 items-center justify-start p-2 {selectedFile === label ? 'bg-red-600' : ''} border-r-2"
	on:click={click}
>
	<p class="w-full pr-2 text-left">{name}</p>
	<button class="rounded-md hover:bg-slate-200" on:click|stopPropagation={() => dispatch('remove')}>
		<X class="size-5" />
	</button>
</button>
