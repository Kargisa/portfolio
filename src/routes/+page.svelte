<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import QuickAccess from '../components/quickAccess.svelte';
	import type { PageData } from './$types';
	import Explorer from './../components/explorer/explorer.svelte';
	import Folder from './../components/explorer/folder.svelte';
	import FileContent from './../components/fileContent/fileContent.svelte';
	import FileContentItem from './../components/fileContent/fileContentItem.svelte';
	import { toTitleCase } from './../lib/helpers/stringHelper';

	export let data: PageData;

	$: selectedFile = $page.url.searchParams.get('post')?.toLowerCase() ?? '';

	let openFiles: { slug: string; title: string }[] = [];

	const addQuickAccessFile = (label: string, name: string) => {
		openFiles.push({ slug: label, title: name });
		openFiles = [...openFiles];
	};

	const removeQuickAccessFile = (label: string) => {
		openFiles = openFiles.filter((f) => f.slug !== label);
		goto(`?post=${openFiles.at(-1)?.slug ?? 'aboutme'}`);
	};
</script>

<div class="flex h-screen w-screen flex-col overflow-hidden">
	<div class="flex items-center justify-center space-x-4 border-b-2">
		<button class="flex items-center">
			<p>GitHub</p>
		</button>
		<button class="flex items-center">
			<p>LinkedIn</p>
		</button>
	</div>
	<div class="flex h-screen">
		<div class="h-full min-w-64 resize border-r-2 p-2">
			<Explorer>
				<!-- PUT FILE EXPLORER HERE -->
				{#each data.categories as category}
					<Folder
						name={toTitleCase(category.title)}
						extend={false}
						cookie="extend{toTitleCase(category.title)}"
						recursiveCategories={category.categories}
						recursivePosts={category.posts}
						bind:selectedFile
						on:filedbclick={(event) => addQuickAccessFile(event.detail.label, event.detail.name)}
					>
					</Folder>
				{/each}
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
						href="?post={file.slug}"
						on:remove={() => {
							removeQuickAccessFile(file.slug);
						}}
					/>
				{/each}
			</div>
			<FileContent>
				<!-- CURRNET FILE HERE-->
				{#if data.file}
					<FileContentItem md={true}>
						<svelte:component this={data.file.default} />
					</FileContentItem>
				{/if}
			</FileContent>
		</div>
	</div>
</div>
