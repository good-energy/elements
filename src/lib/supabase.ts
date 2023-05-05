import {
    env
} from '$env/dynamic/public';
import { createClient } from '@supabase/supabase-js'

import { createSupabaseServerClient, createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
import type { RequestEvent } from '@sveltejs/kit';
const client = createClient(env.PUBLIC_SUPABASE_URL, env.PUBLIC_SUPABASE_ANON_KEY, {
    auth: {
        storageKey: "session"
    }
})
export const supabase = {
    client,
    serverClient: (event: RequestEvent) => createSupabaseServerClient({
        supabaseUrl: env.PUBLIC_SUPABASE_URL,
        supabaseKey: env.PUBLIC_SUPABASE_ANON_KEY,
        event
    }),
    loadClient: (event) => createSupabaseLoadClient({
        supabaseUrl: env.PUBLIC_SUPABASE_URL,
        supabaseKey: env.PUBLIC_SUPABASE_ANON_KEY,
        event: { fetch },
        serverSession: event.data.session
    }),
    hook: async ({ event, resolve }) => {
        if (event.url.pathname === "/signout") {
            return new Response("ok", {
                status: 200,
                headers: {
                    "Set-Cookie": "sb-auth-token=deleted; Path=/; Max-Age=0;"
                }
            })
        }
        event.locals.supabase = supabase.serverClient(event);
        event.locals.getSession = async () => {
            const {
                data: { session }
            } = await event.locals.supabase.auth.getSession();
            return session;
        };
        return resolve(event, {
            filterSerializedResponseHeaders(name) {
                return name === 'content-range';
            }
        });
    }
}