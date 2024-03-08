import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({url, params }) => {
    const slug = params.post;

    const modules = import.meta.glob(`/src/posts/**/*.md`);
    let match;
    for (const [path, resolver] of Object.entries(modules)) {
		if (slugFromPath(path) === slug) {
			match = { path, resolver: resolver};
			break;
		}
	}

    let post: {default: any, metadata: any} = {default: null, metadata: null};;
    if (match){
        post = await match?.resolver?.() as any;
    } 

    return {
        content: post.default,
        metadata: post.metadata,
    }
} 

const slugFromPath = (path: string) =>
	path.match(/([\w-]+)\.(svelte\.md|md|svx)/i)?.[1] ?? null;