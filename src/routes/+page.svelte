<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Toolbar from '../components/fileContent/toolbar.svelte';
	import type { PageData } from './$types';
	import Explorer from './../components/explorer/explorer.svelte';
	import Folder from './../components/explorer/folder.svelte';
	import FileContent from './../components/fileContent/fileContent.svelte';
	import FileContentItem from './../components/fileContent/fileContentItem.svelte';
	import QuickAccess from '../components/quckAccess/quickAccess.svelte';
	import QuickAccessHolder from '../components/quckAccess/quickAccessHolder.svelte';
	import { toTitleCase } from './../lib/helpers/stringHelper';
	import LinkHolder from '../components/linkHolder.svelte';

	export let data: PageData;

	let fullscreen: boolean = false;

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
		const fileToRemove = openFiles.find((f) => f.slug === label);
		if (!fileToRemove) return;

		const removeIndex = openFiles.findIndex((f) => f.slug === fileToRemove.slug);
		let go: string = selectedFile;

		if (fileToRemove.slug !== selectedFile) {
			openFiles = openFiles.filter((f) => f.slug !== fileToRemove.slug);
		} else if (openFiles.length === 2) {
			go = openFiles[0].slug ? openFiles[0].slug : go;
			openFiles = openFiles.filter((f) => f.slug !== fileToRemove.slug);
			if (!openFiles[0]) changedefaultFile(fileToRemove.slug, fileToRemove.title);
		} else {
			openFiles = openFiles.filter((f) => f.slug !== fileToRemove.slug);
			go = openFiles[removeIndex - 1].slug;
		}

		goto(`?post=${go}`);
	};
</script>

<div class="flex h-screen w-screen flex-col overflow-hidden">
	<div class="flex h-screen">
		<Explorer class="h-full min-w-64 resize border-r-2 pt-2" hide={fullscreen}>
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
		<div class="flex w-full flex-col justify-center">
			<QuickAccessHolder hide={fullscreen}>
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
			</QuickAccessHolder>
			<div class="flex grow overflow-auto">
				<FileContent class="grow">
					<!-- CURRENT FILE HERE-->
					{#if data.post}
						<FileContentItem md={true}>
							<svelte:component this={data.post.default} />
						</FileContentItem>
					{/if}
				</FileContent>
				<Toolbar openFile={selectedFile} bind:fullscreen />
			</div>
			<LinkHolder hide={fullscreen} />
		</div>
	</div>
</div>
