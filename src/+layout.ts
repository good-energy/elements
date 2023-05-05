import { supabase as sb } from "$lib/index.ts";
import type { LoadEvent } from "@sveltejs/kit";

export const load = async (event: LoadEvent) => {
    event.depends('supabase:auth');
    const supabase = sb.loadClient(event)
    const {
        data: { session }
    } = await supabase.auth.getSession();
    return { supabase, session };
};

