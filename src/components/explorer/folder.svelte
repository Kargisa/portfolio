<script lang="ts">
	import { writeCookie } from '$lib/helpers/cookieHelper';
	import { toTitleCase } from '$lib/helpers/stringHelper';
	import type { Category, Post } from '$lib/types/server';
	import { ChevronDown, ChevronRight, Orbit } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import File from './file.svelte';

	export let extend: boolean;
	export let name: string;
	export let cookie: string;
	export let recursiveCategories: Category[] = [];
	export let recursivePosts: Post[] = [];
	/** defines the selected file for sub files and folders and if this folder is selected */
	export let selectedFile: string = 'null';

	const dispatcher = createEventDispatcher();
</script>

<div class="flex flex-col justify-center space-y-1">
	<button
		class="flex w-full items-center space-x-2"
		on:click={() => {
			extend = !extend;
			writeCookie(cookie, extend.toString(), 365, '/');
		}}
	>
		{#if extend}
			<ChevronDown class="size-5" />
		{:else}
			<ChevronRight class="size-5" />
		{/if}
		<p>{name}</p>
	</button>
	{#if extend}
		<div class="flex flex-col space-y-1 pl-4">
			<slot />
			{#each recursivePosts as post}
				<File
					href={`?post=${post.slug}`}
					label={post.slug}
					name={post.title}
					bind:selectedFile
					on:dblclick={() => {
						dispatcher('filedbclick', { label: post.slug, name: post.title });
					}}
				>
					<Orbit class="size-5" />
				</File>
			{/each}
			{#each recursiveCategories as category}
				<svelte:self
					extend={false}
					name={toTitleCase(category.title)}
					cookie={`extend${toTitleCase(category.title)}`}
					recursiveCategories={category.categories}
					recursivePosts={category.posts}
					bind:selectedFile
					on:filedbclick={(event) => dispatcher('filedbclick', { ...event.detail })}
				/>
			{/each}
		</div>
	{/if}
</div>
