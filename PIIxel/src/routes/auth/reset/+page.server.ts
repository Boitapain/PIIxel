import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
    // Check whether the recovery link created a session for this user
    try {
        const { data: userData, error } = await locals.supabase.auth.getUser()
        const hasSession = !!(userData && userData.user)
        return { hasSession }
    } catch (e) {
        return { hasSession: false }
    }
}

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const form = await request.formData()
        const password = String(form.get('password') || '')
        const confirm = String(form.get('confirm') || '')

        if (!password || !confirm) {
            return fail(400, { error: 'Please provide and confirm your new password' })
        }
        if (password !== confirm) {
            return fail(400, { error: 'Passwords do not match' })
        }

        // Ensure there's a recovery/session present
        const { data: userData, error: userError } = await locals.supabase.auth.getUser()
        if (userError || !userData?.user) {
            return fail(400, { error: 'Password reset session missing. Use the link from your email.' })
        }

        // Update password server-side using the server-side Supabase client
        const { data, error } = await locals.supabase.auth.updateUser({ password })
        if (error) {
            console.error('[AuthReset] updateUser error:', error)
            return fail(400, { error: error.message || 'Failed to set new password' })
        }

        // On success redirect to auth with a success query so the sign-in page can show a message
        throw redirect(303, '/auth?reset=success')
    },
}
