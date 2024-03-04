import type { Post } from "$lib/types/server";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({cookies, fetch}) => {
    const promise = fetch('api/posts');

    const extendInformation = cookies.get('extendInfo');
    const extendProjects = cookies.get('extendProjects');
    const extendBlog = cookies.get('extendBlog');

    const response = await promise;
    const posts: Post[] = await response.json();

    return {
        posts: posts,
        cookies: {
            extendInformation: extendInformation === 'true',
            extendProjects: extendProjects === 'true',
            extendBlog: extendBlog === 'true'
        }
    }
}