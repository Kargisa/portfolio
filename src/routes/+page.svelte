<script lang="ts">
	import { ChevronRight, ChevronDown, ScrollText } from 'lucide-svelte';
	import Cv from '../components/about/cv.svelte';

	let extendAboutMe: boolean = false;
	let extendProjects: boolean = false;
</script>

<div class="h-screen w-screen flex-col overflow-hidden">
	<div class="flex h-5 w-full border-b-2">
		<!-- PUT TOOLBAR HERE -->
	</div>
	<div class="flex h-full">
		<div class="h-full w-64 space-y-2 border-r-2 p-2">
			<!-- PUT FILE EXPLORER HERE -->
			<div>EXPLORER</div>

			<div>
				<button
					class="flex items-center"
					on:click={() => {
						extendAboutMe = !extendAboutMe;
					}}
				>
					{#if extendAboutMe}
						<ChevronDown class="size-5" />
					{:else}
						<ChevronRight class="size-5" />
					{/if}
					About Me
				</button>
				{#if extendAboutMe}
					<div class=" pl-6">
						<button class="flex w-full items-center space-x-3">
							<ScrollText class="size-5" />
							<p>cv.pdf</p>
						</button>
					</div>
				{/if}
			</div>
			<div>
				<button
					class="flex items-center"
					on:click={() => {
						extendProjects = !extendProjects;
					}}
				>
					{#if extendProjects}
						<ChevronDown class="size-5" />
					{:else}
						<ChevronRight class="size-5" />
					{/if}
					Projects
				</button>
			</div>
		</div>
		<div class="flex w-full flex-col justify-center p-2">
			<div class="flex flex-col items-center">
				<h1 class="text-4xl font-bold">Luca Wolf</h1>
				<p>Kargisa</p>
			</div>
			<div class="h-full">
				<!-- PUT FILE CONTENT HERE -->
				<Cv />
			</div>
		</div>
	</div>
</div>
