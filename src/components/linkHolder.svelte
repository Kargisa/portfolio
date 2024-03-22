<script lang="ts">
	let clazz: string = '';
	export { clazz as class };

	export let hide: boolean;
</script>

{#if !hide}
	<div class="flex items-center justify-center space-x-4 border-t-2 p-1 {clazz}">
		<a href="https:/github.com/Kargisa" target="_blank" title="Kargisa GitHub">GitHub</a>
		<a href="https://www.linkedin.com/in/wolf-luca/" target="_blank" title="Luca Wolf LinkedIn"
			>LinkedIn</a
		>
		<slot />
	</div>
{/if}
