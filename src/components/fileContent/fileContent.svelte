<script lang="ts">
	import { initializeWebGL } from '$lib/webGL/test/test';
	import { onMount } from 'svelte';

	let clazz: string = '';
	export { clazz as class };

	let canvas: HTMLCanvasElement;

	onMount(() => {
		initializeWebGL(canvas);
	});
</script>

<div class="h-full w-full overflow-auto {clazz}">
	<canvas class="h-full w-full"  bind:this={canvas}>
		<slot />
	</canvas>
</div>
