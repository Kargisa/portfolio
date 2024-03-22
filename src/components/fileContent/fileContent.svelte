<script lang="ts">
	let clazz: string = '';
	export { clazz as class };
</script>

<div class="h-full w-full overflow-auto {clazz}">
	<slot />
</div>
