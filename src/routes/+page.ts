import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { slugFromPath } from '$lib/helpers/stringHelper';
import type { MdsvexResolver } from '$lib/types';

export const load: PageLoad = async ({ data, url }) => {
	let slug = url.searchParams.get('post') ?? '';
	let match: { path?: string; resolver?: MdsvexResolver } = {};

	const modules = import.meta.glob(`/src/posts/**/*.{md,svx,svelte.md}`);
	const [path, resolver] =
		Object.entries(modules).find(([path]) => slugFromPath(path) === slug) ??
		Object.entries(modules)[0];
	match = { path, resolver: resolver as unknown as MdsvexResolver };

	const post = await match?.resolver?.();
	if (!post) {
		throw error(404);
	}

	slug = slugFromPath(path) ?? '';
	post.metadata.slug = slug;

	return {
		post: post,
		...data
	};
};
