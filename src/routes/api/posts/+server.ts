import type { Category as Category, Post } from '$lib/types/server'
import { json } from '@sveltejs/kit'

async function getPosts() {
	let cats: Category[] = []

	const paths = import.meta.glob('/src/posts/**/*.md', { eager: true })

	
	for (const path in paths) {
		const file = paths[path]
		
		const splitPath = path.split('/');
		const slug = splitPath.at(-1)?.replace('.md', '');
		const categories = splitPath.slice(3, -1).map(s => s.split('-').slice(1).join('-'));
		
		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Post, 'slug'>
			const post = { ...metadata, slug } satisfies Post
			post.categories = categories;
			
			post.published && addCategoryToCats(categories, post, cats);
		}
	}

	// cats = cats.sort((first, second) =>
    // new Date(second.date).getTime() - new Date(first.date).getTime()
	// )

	return cats
}

export async function GET() {
	const posts = await getPosts()
	return json(posts)
}

const addCategoryToCats = (categories: string[], post: Post, cats: Category[]) => {
	let i = categories.length;
	for (const category of categories) {
		i--;
		const cat = cats.find((cat) => cat.title === category);
		if (cat){
			if (i <= 0){
				cat.posts.push(post);
				cat.posts = cat.posts.sort((first, second) =>
					new Date(second.date).getTime() - new Date(first.date).getTime()
				)	
				return;
			}
			cats = cat.categories;
		}
		else{
			const newCat = { title: category, posts: [], categories: [] } as Category;
			cats.push(newCat);
			if (i <= 0) {
				newCat.posts.push(post);
				newCat.posts = newCat.posts.sort((first, second) =>
					new Date(second.date).getTime() - new Date(first.date).getTime()
				)
				return;
			}
		}
	}
}
