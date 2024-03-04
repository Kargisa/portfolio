<script lang="ts">
	export let label: string;
	export let selectedFile: string;
</script>

{#if label === selectedFile}
	<slot />
{/if}
