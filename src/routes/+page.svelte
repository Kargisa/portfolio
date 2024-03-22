<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import Explorer from './../components/explorer/explorer.svelte';
	import Folder from './../components/explorer/folder.svelte';
	import FileContent from './../components/fileContent/fileContent.svelte';
	import FileContentItem from './../components/fileContent/fileContentItem.svelte';
	import QuickAccess from './../components/quickAccess.svelte';
	import { toTitleCase } from './../lib/helpers/stringHelper';

	export let data: PageData;

	$: selectedFile = data.post.metadata.slug;

	let openFiles: { slug: string; title: string }[] = [
		{
			slug: data.post.metadata.slug,
			title: data.post.metadata.title
		}
	];

	const addQuickAccessFile = (label: string, name: string) => {
		if (openFiles.findIndex((f) => f.slug === label) === 0) {
			openFiles.splice(1, 0, { slug: label, title: name });
			openFiles[0] = { slug: '', title: '' };
			return;
		}
		if (openFiles.filter((f) => f.slug)) return;

		openFiles.push({ slug: label, title: name });
		openFiles = [...openFiles];
	};

	const changedefaultFile = (label: string, name: string) => {
		if (openFiles.findIndex((f) => f.slug === label) === 0) return;
		if (openFiles.some((f) => f.slug === label)) return;
		openFiles[0] = { slug: label, title: name };
	};

	const removeQuickAccessFile = (label: string) => {
		const fileToremove = openFiles.find((f) => f.slug === label);
		if (!fileToremove) return;

		const removeIndex = openFiles.findIndex((f) => f.slug === label);
		let nextIndex = removeIndex <= 1 ? removeIndex : removeIndex - 1;
		openFiles = openFiles.filter((f) => f.slug !== label);
		const slug = openFiles.at(nextIndex)?.slug;
		if (slug) {
			goto(`?post=${slug}`);
			return;
		}

		changedefaultFile(fileToremove.slug, fileToremove.title);
		goto(`?post=${fileToremove.slug}`);
	};
</script>

<div class="flex h-screen w-screen flex-col overflow-hidden">
	<div class="flex h-screen">
		<div class="h-full min-w-64 resize border-r-2 pt-2">
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
						on:fileclick={(event) => {
							changedefaultFile(event.detail.label, event.detail.name);
						}}
					></Folder>
				{/each}
			</Explorer>
		</div>
		<div class="flex w-full flex-col justify-center">
			<div class="flex min-h-10 items-center border-b-2">
				<!-- PUT FILE QUICK ACCESS HERE -->
				{#each openFiles as file, i}
					{#if file.slug}
						<QuickAccess
							label={file.slug}
							bind:selectedFile
							name={file.title}
							href="?post={file.slug}"
							on:remove={() => {
								removeQuickAccessFile(file.slug);
							}}
							removable={i !== 0}
						/>
					{/if}
				{/each}
			</div>
			<FileContent>
				<!-- CURRNET FILE HERE-->
				{#if data.post}
					<FileContentItem md={true}>
						<svelte:component this={data.post.default} />
					</FileContentItem>
				{/if}
			</FileContent>
			<div class="flex items-center justify-center space-x-4 border-t-2 p-1">
				<button class="flex items-center">
					<a href="https:/github.com/Kargisa" target="_blank" title="Kargisa GitHub">GitHub</a>
				</button>
				<button class="flex items-center">
					<a
						href="https://www.linkedin.com/in/wolf-luca/"
						target="_blank"
						title="Luca Wolf LinkedIn">LinkedIn</a
					>
				</button>
			</div>
		</div>
	</div>
</div>
