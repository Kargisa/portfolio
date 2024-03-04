<script lang="ts">
	import { goto } from '$app/navigation';
	import FileContentItem from './../components/fileContent/fileContentItem.svelte';
	import FileContent from './../components/fileContent/fileContent.svelte';
	import { page } from '$app/stores';
	import { Fingerprint, Orbit, ScrollText, Sun } from 'lucide-svelte';
	import AboutMe from '../components/aboutMe.svelte';
	import Cv from '../components/information/cv.svelte';
	import QuickAccess from '../components/quickAccess.svelte';
	import { existingFiles } from '../lib/types/explorer';
	import Explorer from './../components/explorer/explorer.svelte';
	import File from './../components/explorer/file.svelte';
	import Folder from './../components/explorer/folder.svelte';
	import { onMount } from 'svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	let extendInformation = data.cookies.extendInformation;
	let extendProjects = data.cookies.extendProjects;
	let extendBlog = data.cookies.extendBlog;

	$: selectedFile = $page.url.searchParams.get('file')?.toLowerCase() ?? '';

	onMount(() => {
		if (selectedFile === '') {
			goto(`?file=${existingFiles.aboutMe}`);
		}
	});

	let openFiles: { label: string; name: string }[] = [];

	const addQuickAccessFile = (label: string, name: string) => {
		openFiles.push({ label, name });
		openFiles = [...openFiles];
	};

	const removeQuickAccessFile = (label: string) => {
		openFiles = openFiles.filter((f) => f.label !== label);
	};
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
		<div class="h-full min-w-64 resize space-y-2 border-r-2 p-2">
			<Explorer>
				<!-- PUT FILE EXPLORER HERE -->
				<File
					label={existingFiles.aboutMe}
					bind:selectedFile
					name="About Me"
					path="?file={existingFiles.aboutMe}"
					on:dblclick={() => {
						addQuickAccessFile(existingFiles.aboutMe, 'About Me');
					}}
				>
					<Fingerprint class="size-5" />
				</File>
				<Folder bind:extend={extendInformation} name="Information" cookie="extendInfo">
					<File
						label={existingFiles.cv}
						bind:selectedFile
						name="curriculum_vitae.pdf"
						path="?file={existingFiles.cv}"
						on:dblclick={() => {
							addQuickAccessFile(existingFiles.cv, 'curriculum_vitae.pdf');
						}}
					>
						<ScrollText class="size-5" />
					</File>
				</Folder>
				<Folder name="Projects" bind:extend={extendProjects} cookie="extendProjects">
					<File
						label={existingFiles.pathtracer}
						bind:selectedFile
						name="Path_Tracer.pdf"
						path="?file={existingFiles.pathtracer}"
						on:dblclick={() => {
							addQuickAccessFile(existingFiles.pathtracer, 'Path_Tracer.pdf');
						}}
					>
						<Sun class="size-5" />
					</File>
					<File
						label={existingFiles.newtons}
						bind:selectedFile
						name="Physics_Engine.pdf"
						path="?file={existingFiles.newtons}"
						on:dblclick={() => {
							addQuickAccessFile(existingFiles.newtons, 'Physics_Engine.pdf');
						}}
					>
						<Orbit class="size-5" />
					</File>
				</Folder>

				<Folder name="Blog" bind:extend={extendBlog} cookie="extendBlog"></Folder>
			</Explorer>
		</div>
		<div class="flex w-full flex-col justify-center">
			<div class="flex min-h-10 items-center border-b-2">
				<!-- PUT FILE QUICK ACCESS HERE -->
				{#each openFiles as file}
					<QuickAccess
						label={file.label}
						bind:selectedFile
						name={file.name}
						path="?file={file.label}"
						on:remove={() => {
							removeQuickAccessFile(file.label);
						}}
					/>
				{/each}
			</div>
			<FileContent>
				<!-- PUT FILES HERE -->
				<FileContentItem label={existingFiles.cv} bind:selectedFile><Cv /></FileContentItem>
				<FileContentItem label={existingFiles.aboutMe} bind:selectedFile
					><AboutMe /></FileContentItem
				>
			</FileContent>
		</div>
	</div>
</div>
