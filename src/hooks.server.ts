
import { i18n } from '$lib/i18n.ts';
import { supabase } from '$lib/index.js';
import type { Handle, } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

export const handle: Handle = sequence(i18n, supabase.hook)