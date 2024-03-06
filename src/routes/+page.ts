import type { PageLoad } from "./$types";

export const load: PageLoad = async ({data, url, fetch}) => {

    const slug = url.searchParams.get('file') ?? '';
    let file;
    try {
        file = await import(`../posts/projects/${slug}.md`);
    }
    catch{
        try {
            file = await import(`../posts/blog/${slug}.md`);
        }
        catch{}
    }

    return {
        file: file,
        ...data
    }
}