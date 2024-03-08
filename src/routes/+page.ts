import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({data, url}) => {

    const slug = url.searchParams.get('post') ?? '';
    let match;

    if (slug) {
        const modules = import.meta.glob(`/src/posts/**/*.{md,svx,svelte.md}`);
        const [path, resolver] = Object.entries(modules).find(([path, resolver]) => slugFromPath(path) === slug) ?? [];
        match = { path, resolver: resolver};
    }

    const post = await match?.resolver?.() as any;

    return {
        file: post,
        ...data
    }
}

const slugFromPath = (path: string) =>
	path.match(/([\w-]+)\.(svelte\.md|md|svx)/i)?.[1] ?? null;