<script lang="ts">
	export let md: boolean = false;
</script>

<div class="flex justify-center">
	<article class='{md ? 'prose' : ''} flex  flex-col items-center'>
		<slot />
	</article>
</div>
