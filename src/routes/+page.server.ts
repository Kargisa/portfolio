import type { Post } from "$lib/types/server";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({url, cookies, fetch}) => {
    const blogPromis = fetch('api/posts/blog');
    const projectPromis = fetch('api/posts/projects');

    const extendInformation = cookies.get('extendInfo');
    const extendProjects = cookies.get('extendProjects');
    const extendBlog = cookies.get('extendBlog');

    const blogResponse = await blogPromis;
    const blogPosts: Post[] = await blogResponse.json();
    
    const projectResponse = await projectPromis;
    const projectPosts: Post[] = await projectResponse.json();
    
    return {
        blogPosts: blogPosts,
        projectPosts: projectPosts,
        cookies: {
            extendInformation: extendInformation === 'true',
            extendProjects: extendProjects === 'true',
            extendBlog: extendBlog === 'true'
        }
    }
}