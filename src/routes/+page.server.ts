import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({cookies}) => {
    const extendInformation = cookies.get('extendInfo');
    const extendProjects = cookies.get('extendProjects');
    const extendBlog = cookies.get('extendBlog');

    return {
        cookies: {
            extendInformation: extendInformation === 'true',
            extendProjects: extendProjects === 'true',
            extendBlog: extendBlog === 'true'
        }
    }
}