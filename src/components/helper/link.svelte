<script lang="ts">
	export let href: string;
	export let newTab: boolean = false;
</script>

<a {href} class="text-blue-500" target={newTab ? '_blank' : ''}>
	<slot />
</a>
