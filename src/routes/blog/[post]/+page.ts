import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
    let data = {default: null, metadata: null};
    try{
        data = await import(`../../../posts/blog/${params.post}.md`);
    }
    catch{
        try{
            data = await import(`../../../posts/projects/${params.post}.md`);
        }
        catch{}
    }

    try{
        return {
            content: data.default,
            meta: data.metadata
        }
    }
    catch{
        error(404, `No Post ${params.post} Found`)
    }
} 