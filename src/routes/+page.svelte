<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import type { Post } from '$lib/types/server';
	import { Fingerprint, Orbit, ScrollText } from 'lucide-svelte';
	import QuickAccess from '../components/quickAccess.svelte';
	import { existingFiles } from '../lib/types/explorer';
	import type { PageData, PageServerData } from './$types';
	import Explorer from './../components/explorer/explorer.svelte';
	import File from './../components/explorer/file.svelte';
	import Folder from './../components/explorer/folder.svelte';
	import FileContent from './../components/fileContent/fileContent.svelte';
	import FileContentItem from './../components/fileContent/fileContentItem.svelte';

	export let data: PageData;

	let extendInformation = data.cookies.extendInformation;
	let extendProjects = data.cookies.extendProjects;
	let extendBlog = data.cookies.extendBlog;

	$: selectedFile = $page.url.searchParams.get('file')?.toLowerCase() ?? '';

	const getBlogSlugs = (): string[] => {
		const posts: Post[] = data.projectPosts;
		const slugs: string[] = posts.map((p) => p.slug);

		return slugs;
	};

	let openFiles: { slug: string; title: string }[] = [];

	const addQuickAccessFile = (label: string, name: string) => {
		openFiles.push({ slug: label, title: name });
		openFiles = [...openFiles];
	};

	const removeQuickAccessFile = (label: string) => {
		openFiles = openFiles.filter((f) => f.slug !== label);
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
		<div class="h-full min-w-64 resize border-r-2 p-2">
			<Explorer>
				<!-- PUT FILE EXPLORER HERE -->
				<File
					label={existingFiles.aboutMe}
					bind:selectedFile
					name="About Me"
					href="?file={existingFiles.aboutMe}"
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
						href="?file={existingFiles.cv}"
						on:dblclick={() => {
							addQuickAccessFile(existingFiles.cv, 'curriculum_vitae.pdf');
						}}
					>
						<ScrollText class="size-5" />
					</File>
				</Folder>
				<Folder name="Projects" bind:extend={extendProjects} cookie="extendProjects">
					{#each data.projectPosts as post}
						<File
							href={`?file=${post.slug}`}
							label={post.slug}
							name={post.title}
							bind:selectedFile
							on:dblclick={() => addQuickAccessFile(post.slug, post.title)}
						>
							<Orbit class="size-5" />
						</File>
					{/each}
				</Folder>

				<Folder name="Blog" bind:extend={extendBlog} cookie="extendBlog">
					{#each data.blogPosts as post}
						<File
							href={`?file=${post.slug}`}
							label={post.slug}
							name={post.title}
							bind:selectedFile
							on:dblclick={() => addQuickAccessFile(post.slug, post.title)}
						>
							<Orbit class="size-5" />
						</File>
					{/each}
				</Folder>
			</Explorer>
		</div>
		<div class="flex w-full flex-col justify-center">
			<div class="flex min-h-10 items-center border-b-2">
				<!-- PUT FILE QUICK ACCESS HERE -->
				{#each openFiles as file}
					<QuickAccess
						label={file.slug}
						bind:selectedFile
						name={file.title}
						href="?file={file.slug}"
						on:remove={() => {
							removeQuickAccessFile(file.slug);
						}}
					/>
				{/each}
			</div>
			<FileContent>
				<!-- PUT FILES HERE load on query param change-->
				{#if data.file}
					<FileContentItem md={true}>
						<svelte:component this={data.file.default} />
						<Button href={`/blog/${selectedFile}`}>See All</Button>
					</FileContentItem>
				{/if}
			</FileContent>
		</div>
	</div>
</div>
