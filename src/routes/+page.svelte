<script lang="ts">
	import { ChevronRight, ChevronDown, ScrollText, Fingerprint, X } from 'lucide-svelte';
	import Cv from '../components/information/cv.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { existingFiles } from '../lib/types/explorer';
	import { goto } from '$app/navigation';
	import { readCookie, writeCookie } from '../lib/helpers/cookieHelper';
	import AboutMe from '../components/aboutMe.svelte';
	import QuickAccess from '../components/quickAccess.svelte';

	let extendAboutMe: boolean = false;
	let extendProjects: boolean = false;
	let extendBlog: boolean = false;

	onMount(() => {
		extendAboutMe = readCookie('extendAboutMe') === 'true';
		extendProjects = readCookie('extendProjects') === 'true';
		extendBlog = readCookie('extendBlog') === 'true';
	});

	$: selectedFile = $page.url.searchParams.get('file')?.toLowerCase() ?? '';
</script>

<div class="h-screen w-screen flex-col overflow-hidden">
	<div class="flex w-full items-center justify-center space-x-4 border-b-2 px-2">
		<!-- PUT TOOLBAR HERE -->
		<button class="flex items-center">
			<p>GitHub</p>
		</button>
		<button class="flex items-center">
			<p>LinkedIn</p>
		</button>
	</div>
	<div class="flex h-full">
		<div class="h-full w-64 resize space-y-2 border-r-2 p-2">
			<!-- PUT FILE EXPLORER HERE -->
			<p class="pl-5 text-sm">EXPLORER</p>
			<button
				class="flex items-center space-x-2"
				on:click={() => {
					goto('?file=aboutme');
				}}
			>
				<Fingerprint class="size-5" />
				<p>About Me</p>
			</button>

			<div>
				<button
					class="flex w-full items-center space-x-2"
					on:click={() => {
						extendAboutMe = !extendAboutMe;
						writeCookie('extendAboutMe', 365, extendAboutMe, '/');
					}}
				>
					{#if extendAboutMe}
						<ChevronDown class="size-5" />
					{:else}
						<ChevronRight class="size-5" />
					{/if}
					<p>Information</p>
				</button>
				{#if extendAboutMe}
					<div class=" pl-6">
						<button
							class="flex w-full items-center space-x-3"
							on:click={() => {
								goto('?file=cv');
							}}
						>
							<ScrollText class="size-5" />
							<p>curriculum_vitae.pdf</p>
						</button>
					</div>
				{/if}
			</div>
			<div>
				<button
					class="flex w-full items-center space-x-2"
					on:click={() => {
						extendProjects = !extendProjects;
						writeCookie('extendProjects', 365, extendProjects, '/');
					}}
				>
					{#if extendProjects}
						<ChevronDown class="size-5" />
					{:else}
						<ChevronRight class="size-5" />
					{/if}
					<p>Projects</p>
				</button>
			</div>
			<div>
				<button
					class="flex w-full items-center space-x-2"
					on:click={() => {
						extendBlog = !extendBlog;
						writeCookie('extendBlog', 365, extendBlog, '/');
					}}
				>
					{#if extendBlog}
						<ChevronDown class="size-5" />
					{:else}
						<ChevronRight class="size-5" />
					{/if}
					<p>Blog</p>
				</button>
			</div>
		</div>
		<div class="flex w-full flex-col justify-center p-2">
			<div class="-mx-2 -mt-2 flex items-center border-b-2">
				<!-- PUT FILE QUICK ACCESS HERE -->
				<QuickAccess
					label={existingFiles.aboutMe}
					bind:selectedFile
					name="About Me"
					on:click={() => goto(`?file=${existingFiles.aboutMe}`)}
				/>
				<QuickAccess
					label={existingFiles.cv}
					bind:selectedFile
					name="cv.pdf"
					on:click={() => goto(`?file=${existingFiles.cv}`)}
				/>
			</div>
			<div class="h-full">
				<!-- PUT FILES HERE -->
				{#if selectedFile === existingFiles.cv}
					<Cv />
				{:else if selectedFile === existingFiles.aboutMe}
					<AboutMe />
				{/if}
			</div>
		</div>
	</div>
</div>
