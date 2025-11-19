import type { Actions } from './$types'
import { error } from '@sveltejs/kit'
import { updateUiLanguageProfile } from '$lib/server/db/repositories/profile'

export const actions: Actions = {
    
    updateLanguage: async ({ request, locals: { supabase } }) => {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError || !session?.user) {
            throw error(401, 'Unauthorized');
        }

        const formData = await request.formData();
        const language = formData.get('language') as string;

        console.log('Updating language to:', language);

        if (!language || language.length > 6) {
            throw error(400, 'Invalid language');
        }

        try {
            await updateUiLanguageProfile(session.user.id, language);
        } catch (err) {
            console.error('Failed to update language:', err);
            throw error(500, 'Failed to update language preference');
        }
    }
}

