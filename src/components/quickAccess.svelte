<script lang="ts">
	import { X } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let name: string;
	export let label: string;
	export let selectedFile: string;
	export let href: string;
	export let removable: boolean = true;

	const click = () => {
		dispatch('click');
	};
</script>

<div>
	<a
		{href}
		class="flex min-w-36 items-center justify-start p-2 {selectedFile === label
			? 'bg-red-600'
			: ''} border-r-2"
		on:click={click}
	>
		<p class="w-full pr-2 text-left">{name}</p>
		{#if removable}
			<button
				class="rounded-md hover:bg-slate-200"
				on:click|stopPropagation={(event) => {
					event.preventDefault();
					dispatch('remove');
				}}
			>
				<X class="size-5" />
			</button>
		{/if}
	</a>
</div>
