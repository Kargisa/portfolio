import type { Category, Post } from "$lib/types/server";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({url, cookies, fetch}) => {
    const promis = fetch('api/posts');
    
    const response = await promis;
    const categories: Category[] = await response.json();
    
    return {
        categories: categories,
    }
}