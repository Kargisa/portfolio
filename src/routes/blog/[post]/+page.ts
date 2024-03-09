import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { slugFromPath } from "$lib/helpers/stringHelper";

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
        post.metadata.slug = slug;
    } 

    return {
        content: post.default,
        metadata: post.metadata,
    }
} 