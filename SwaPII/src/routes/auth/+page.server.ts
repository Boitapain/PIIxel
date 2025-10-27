import { redirect, fail, error } from '@sveltejs/kit'
import { PUBLIC_SUPABASE_EDGE_CREATE_PROFILE } from '$env/static/public'
import * as publicEnv from '$env/dynamic/public'

import type { Actions } from './$types'
import { getUserProfile } from '$lib/server/db/repositories/profile'

export const actions: Actions = {
    signup: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData()
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        const { error } = await supabase.auth.signUp({ email, password })
        if (error) {
            console.error(error)
            return fail(400, {
                error: error.message || 'Failed to create account',
                email
            })
        } else {
            redirect(303, '/')
        }
    },
    login: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData()
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) {
            //console.error('[LOG] AuthLogin - SignIn error : ' + (error?.message || String(error)) + '|exception')
            return fail(400, {
                error: error.message || 'Failed to sign in',
                email
            })
        }

        // Get authenticated user data securely
        const { data: userData, error: userError } = await supabase.auth.getUser()
        if (userError || !userData.user) {
            //console.error('[LOG] AuthLogin - GetUser error : ' + (userError?.message || String(userError)) + '|exception')
            return fail(400, {
                error: 'Failed to retrieve user data',
                email
            })
        }

        // Récupère le JWT de la session
        const access_token = data.session?.access_token
        if (!access_token) {
            //console.error('[LOG] AuthLogin - AccessToken missing : ' + String(access_token) + '|error')
            return fail(400, {
                error: 'Authentication token missing',
                email
            })
        }
        // Check if profile already exists to avoid overwriting ui_language on every login
        let profileExists = false;
        try {
            const existing = await getUserProfile(userData.user.id);
            profileExists = Array.isArray(existing) ? existing.length > 0 : !!existing;
            //console.log('[LOG] AuthLogin - Profile Exists value : ' + profileExists + '|ok');
        } catch (e) {
            //console.warn('[LOG] AuthLogin - Check ProfileExists error : ' + (e?.message || String(e)) + '|exception');
        }

        if (!profileExists) {
            //console.log('[LOG] AuthLogin - Create Profile : start|pending');
            const response = await fetch(
                PUBLIC_SUPABASE_EDGE_CREATE_PROFILE,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${access_token}`
                    },
                    body: JSON.stringify({
                        email,
                        user_id: userData.user.id
                    })
                }
            )

            if (!response.ok) {
                //console.error('[LOG] AuthLogin - Create Profile error : ' + (await response.text()) + '|exception')
                return fail(400, {
                    error: 'Failed to create user profile',
                    email
                })
            }
        } else {
            //console.log('[LOG] AuthLogin - Create Profile : skip_exists|ok');
        }

        // Load user profile after successful login and profile creation
        try {
            //console.log('[LOG] AuthLogin - Fetch UserProfile userId : ' + userData.user.id + '|pending');
            const profileResult = await getUserProfile(userData.user.id);
            const userProfile = profileResult[0]
            //console.log('[LOG] AuthLogin - Fetch UserProfile result : ' + JSON.stringify(userProfile) + '|ok');
            
            if (userProfile?.ui_language) {
                //console.log('[LOG] AuthLogin - User PreferredLanguage value : ' + userProfile.ui_language + '|ok')
            } else {
                //console.log('[LOG] AuthLogin - User PreferredLanguage value : none|ok')
            }
        } catch (profileError) {
            //console.error('[LOG] AuthLogin - Fetch UserProfile error : ' + (profileError?.message || String(profileError)) + '|exception')
            // Don't fail the login if profile loading fails
        }

        //console.log('[LOG] AuthLogin - Redirect To path : /profile|ok');
        // Use throw redirect to ensure proper invalidation
        throw redirect(303, '/profile')
    },
    forgot: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData()
        const email = formData.get('email') as string

        if (!email) {
            return fail(400, { error: 'Email is required' })
        }

        // compute redirectTo for the reset link so it lands on the auth route
        // prefer an explicit PUBLIC_BASE_URL env var, otherwise derive from request headers
    const dyn = publicEnv as unknown as Record<string, string | undefined>
        let redirectTo: string | undefined = dyn.PUBLIC_BASE_URL
            ? `${dyn.PUBLIC_BASE_URL!.replace(/\/$/, '')}/auth/reset`
            : undefined

        if (!redirectTo) {
            const host = request.headers.get('host')
            const forwardedProto = request.headers.get('x-forwarded-proto')
            const proto = forwardedProto || 'http'
            if (host) {
                redirectTo = `${proto}://${host}/auth/reset`
            }
        }

    // Debug: log the redirect URL we computed so we can verify what will be embedded in the email
    console.log('[LOG] AuthForgot - computed redirectTo ->', redirectTo)

    // Use Supabase reset password email flow with redirect
    const { data, error: resetError } = await supabase.auth.resetPasswordForEmail(email, redirectTo ? { redirectTo } : undefined)
        if (resetError) {
            console.error('[LOG] AuthForgot - resetPasswordForEmail error :', resetError)
            return fail(400, {
                error: resetError.message || 'Failed to send password reset email',
                email
            })
        }

        // Return success message to show on the page. In development include the redirectTo for debugging.
        const responseBody: any = {
            success: true,
            message: 'If that email exists in our system, a reset link has been sent.' ,
            email
        }
        if (process.env.NODE_ENV === 'development') responseBody.debugRedirectTo = redirectTo
        return responseBody
    },
}