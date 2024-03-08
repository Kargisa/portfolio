<script lang="ts">
	export let md: boolean = false;
</script>

<div class="flex justify-center pb-8">
	<!-- pb-8 is a cheap fix -->
	<article class="{md ? 'prose prose-xl' : ''} flex flex-col items-center">
		<slot />
	</article>
</div>
