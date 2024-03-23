import type { SvelteComponent } from 'svelte';
import type { Post } from './types/server';

export type MdsvexFile = {
	default: ConstructorOfATypedSvelteComponent;
	metadata: Post;
};

export type MdsvexResolver = () => Promise<MdsvexFile>;
