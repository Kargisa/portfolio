import type { Category, Post } from "$lib/types/server";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({url, cookies, fetch}) => {
    const promis = fetch('api/posts');

    const extendInformation = cookies.get('extendInfo');
    const extendProjects = cookies.get('extendProjects');
    const extendBlog = cookies.get('extendBlog');

    
    const response = await promis;
    const categories: Category[] = await response.json();
    
    return {
        categories: categories,
        cookies: {
            extendInformation: extendInformation === 'true',
            extendProjects: extendProjects === 'true',
            extendBlog: extendBlog === 'true'
        }
    }
}