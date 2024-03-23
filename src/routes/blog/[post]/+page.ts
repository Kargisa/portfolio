import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { slugFromPath } from '$lib/helpers/stringHelper';
import type { MdsvexResolver } from '$lib/types';

export const load: PageLoad = async ({ params }) => {
	let slug = params.post;

	const modules = import.meta.glob(`/src/posts/**/*.md`);
	let match: { path?: string; resolver?: MdsvexResolver } = {};
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
		content: post.default,
		metadata: post.metadata
	};
};
