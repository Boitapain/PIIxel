import { json, error } from '@sveltejs/kit'
import type { RequestHandler } from '../$types'
import { updateUiLanguageProfile } from '$lib/server/db/repositories/profile'

export const POST: RequestHandler = async ({ request, locals: { supabase }, cookies }) => {
    // Use getUser() for security instead of getSession()
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        throw error(401, 'Unauthorized');
    }

    const { language } = await request.json();

    //console.log('[LOG] ApiLanguage - UpdateLanguage target : ' + language + '|pending');

    if (!language || language.length > 6) {
        throw error(400, 'Invalid language');
    }

    try {
        await updateUiLanguageProfile(user.id, language);
        // Keep SSR and client in sync via cookie
        cookies.set('preferred-language', language, {
            path: '/',
            maxAge: 60 * 60 * 24 * 365,
            sameSite: 'lax'
        });
    return json({ success: true });
    } catch (err) {
    //console.error('[LOG] ApiLanguage - UpdateLanguage error : ' + (err?.message || String(err)) + '|exception');
        throw error(500, 'Failed to update language preference');
    }
}