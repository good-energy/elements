
import { supabase } from '$lib/index.js';
import type { Handle, } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

export const handle: Handle = sequence(supabase.hook, async ({ event, resolve }) => {
    console.log(event)
    return await resolve(event, {
        transformPageChunk: ({ html }) => {
            console.log(html)
            return html
        }
    })
})