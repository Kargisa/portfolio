import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { slugFromPath } from '$lib/helpers/stringHelper';

export const load: PageLoad = async ({ data, url }) => {
	const slug = url.searchParams.get('post') ?? '';
	let match;

	const modules = import.meta.glob(`/src/posts/**/*.{md,svx,svelte.md}`);
	const [path, resolver] =
		Object.entries(modules).find(([path]) => slugFromPath(path) === slug) ??
		Object.entries(modules)[0];
	match = { path, resolver: resolver };

	const post = (await match?.resolver?.()) as { default: any; metadata: any };
	post.metadata.slug = slugFromPath(path);

	return {
		post: post,
		...data
	};
};
