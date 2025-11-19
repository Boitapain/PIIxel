import { getUserProfile } from '$lib/server/db/repositories/profile.js';
import { redirect, type Actions } from '@sveltejs/kit';

export const load = async ({ locals: { safeGetSession } }) => {
    const { session, user } = await safeGetSession();

    if (!session || !user) {
        throw redirect(303, '/auth');
    }

    // Fetch the user profile (array)
    const userProfile = await getUserProfile(user.id);

    return {
        session,
        user,
        userProfile
    };
};

export const actions: Actions = {
    logout: async ({ locals: { supabase } }) => {
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.error(error)
            // Even if logout fails, redirect to auth page
        }
        return redirect(303, '/auth')
    },
}