import { supabase as sb } from '$lib';

export const load = async (event) => {
    event.depends('supabase:auth');
    const supabase = sb.loadClient(event)

    const {
        data: { session }
    } = await supabase.auth.getSession();

    return { supabase, session };
};