<script lang="ts">
    import { enhance } from '$app/forms'
    import { _ } from 'svelte-i18n'
    import type { ActionData } from './$types'
    import { onMount } from 'svelte'
    import { createBrowserClient } from '@supabase/ssr'
    import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY } from '$env/static/public'

    export let data: any
    export let form: ActionData

    const hasSession: boolean = data?.hasSession || false

    // If server didn't detect a session but the URL came from Supabase's verify
    // flow (it may add tokens in the URL), recreate a browser Supabase client
    // with detectSessionInUrl enabled to ensure the session is captured. If a
    // session appears we reload so the server load() can see it and enable the
    // reset form.
    onMount(async () => {
        if (hasSession) return

        try {
            const temp = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY, {
                global: { fetch },
                auth: { detectSessionInUrl: true, flowType: 'implicit' }
            })

            // initialize and let the client check the URL for session tokens
            const { data: sessionData } = await temp.auth.getSession()
            if (sessionData?.session) {
                // reload so server load() can read the session and enable the form
                location.reload()
            }
        } catch (e) {
            // ignore - we'll show the usual warning if no session is present
            console.debug('Auth reset: client-side session detection failed', e)
        }
    })
</script>

<!-- Use the same hero layout and colors as the main auth page so the reset UI fits the site -->
<div class="hero min-h-screen bg-gradient-to-br from-base-100 to-base-200 relative overflow-hidden">
    <div class="hero-content flex-col lg:flex-row-reverse max-w-6xl w-full">
        <!-- Left side: small welcome/info (keeps site look) -->
        <div class="text-center lg:text-left lg:w-1/2">
            <h1 class="text-4xl font-bold text-base-content mb-4">
                {$_('auth.reset_title') || $_('auth.welcome_title') || 'Reset password'}
            </h1>
            <p class="text-lg opacity-90 mb-6 max-w-lg">
                {$_('auth.reset_subtitle') || 'Set a secure new password for your account.'}
            </p>
        </div>

        <!-- Right side - reset card (matches main auth card) -->
        <div class="card w-full max-w-md bg-white shadow-2xl border border-gray-200 lg:w-1/2">
            <div class="card-body">
                <h2 class="card-title text-2xl font-bold text-center text-black mb-4">{$_('auth.reset') || 'Reset your password'}</h2>

                {#if !hasSession}
                    <div class="alert alert-warning mb-4">
                        <div>
                            <span>{$_('auth.reset_no_session') || 'Please open the password reset link you received in email. The link must create a session for you to set a new password.'}</span>
                        </div>
                    </div>
                {/if}

                {#if form?.error}
                    <div class="alert alert-error mb-4">{form.error}</div>
                {/if}

                <form method="POST" use:enhance class="space-y-4">
                    <div class="form-control">
                        <label class="label"><span class="label-text text-black">{$_('auth.new_password') || 'New password'}</span></label>
                        <input name="password" type="password" class="input input-bordered bg-white text-black" required />
                    </div>

                    <div class="form-control">
                        <label class="label"><span class="label-text text-black">{$_('auth.confirm_password') || 'Confirm password'}</span></label>
                        <input name="confirm" type="password" class="input input-bordered bg-white text-black" required />
                    </div>

                    <div class="form-control mt-4">
                        <button class="btn btn-lg bg-black text-white border-black hover:bg-gray-800 font-semibold w-full" type="submit" disabled={!hasSession}>
                            {$_('auth.set_new_password') || 'Set new password'}
                        </button>
                    </div>
                </form>

                <div class="text-center mt-4">
                    <a href="/auth" class="link text-black underline">{$_('auth.back_to_signin') || 'Back to sign in'}</a>
                </div>
            </div>
        </div>
    </div>
</div>
