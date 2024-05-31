import type { Category, Post } from '$lib/types/server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, cookies, fetch }) => {
	const response = await fetch('api/posts');

	const categories: Category[] = await response.json();

	return {
		categories: categories
	};
};
