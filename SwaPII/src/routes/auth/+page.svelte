<script lang="ts">
    import { enhance } from '$app/forms'
    import { _ } from 'svelte-i18n'
    import type { ActionData } from './$types'

    export let form: ActionData

    // bind the email input so we can reuse it for the "forgot password" form
    let email: string = form?.email || ''
</script>

<!-- Auth Section -->
<div class="hero min-h-screen bg-gradient-to-br from-base-100 to-base-200 relative overflow-hidden">
    <div class="hero-content flex-col lg:flex-row-reverse max-w-6xl w-full">
        <!-- Left side - Welcome content -->
        <div class="text-center lg:text-left lg:w-1/2">
            <h1 class="text-5xl font-bold text-base-content mb-4">
                {$_('auth.welcome_title')} <span style="color:var(--kh-cyan)">{$_('home.title')}</span>
            </h1>
            <p class="text-xl opacity-90 mb-6 max-w-lg">
                {$_('auth.welcome_subtitle')} <span style="color:var(--kh-cyan)" class="font-semibold">{$_('auth.secure_data_sharing')}</span> {$_('auth.privacy_protection')}
            </p>
            
            <!-- Features highlight -->
            <div class="space-y-4 text-left">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                        <svg class="w-4 h-4" style="color:var(--kh-emerald)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <span class="text-base-content">{$_('auth.advanced_pii_detection')}</span>
                </div>
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                        <svg class="w-4 h-4" style="color:var(--kh-crimson)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                        </svg>
                    </div>
                    <span class="text-base-content">{$_('auth.enterprise_security')}</span>
                </div>
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                        <svg class="w-4 h-4" style="color:var(--kh-amber)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                    </div>
                    <span class="text-base-content">{$_('auth.lightning_fast')}</span>
                </div>
            </div>
        </div>

        <!-- Right side - Auth form -->
        <div class="card w-full max-w-md bg-white shadow-2xl border border-gray-200 lg:w-1/2">
            <div class="card-body">
                <h2 class="card-title text-2xl font-bold text-center text-black mb-6">
                    {$_('auth.get_started')}
                </h2>

                <!-- Error message display -->
                {#if form?.error}
                    <div class="alert alert-error mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{form.error}</span>
                    </div>
                {/if}
                {#if form?.success}
                    <div class="alert alert-success mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4"></path>
                        </svg>
                        <span>{form.message || 'Password reset email sent'}</span>
                    </div>
                {/if}
                
                <form method="POST" action="?/login" class="space-y-4" use:enhance>
                    <div class="form-control">
                        <label class="label" for="email">
                            <span class="label-text text-black font-medium">{$_('auth.email')}</span>
                        </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                bind:value={email}
                                class="input input-bordered bg-white text-black border-gray-300 focus:border-black focus:outline-none w-full"
                                placeholder="{$_('auth.email_placeholder')}"
                                required
                            />
                    </div>

                    <div class="form-control">
                        <label class="label" for="password">
                            <span class="label-text text-black font-medium">{$_('auth.password')}</span>
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            class="input input-bordered bg-white text-black border-gray-300 focus:border-black focus:outline-none w-full"
                            placeholder="{$_('auth.password_placeholder')}"
                            required
                        />
                    </div>

                    <div class="form-control mt-6">
                        <div class="flex gap-3">
                            <button type="submit" class="btn btn-lg bg-black text-white border-black hover:bg-gray-800 font-semibold flex-1">
                                {$_('auth.sign_in')}
                            </button>
                            <button
                                type="submit"
                                formaction="?/signup"
                                class="btn btn-outline btn-lg border-black text-black hover:bg-black hover:text-white flex-1"
                            >
                                {$_('auth.create_account')}
                            </button>
                        </div>
                    </div>
                </form>

                <!-- Forgot password form: posts only the email to the "forgot" action -->
                <form method="POST" action="?/forgot" class="mt-2 text-center" use:enhance>
                    <input type="hidden" name="email" value={email} />
                    <button type="submit" class="link text-sm text-black underline">{$_('auth.forgot_password') || 'Forgot your password? Resend'}</button>
                </form>

                <div class="text-center mt-4">
                    <p class="text-sm text-gray-600">
                        {$_('auth.terms_agreement')} 
                        <a href="/terms" class="link text-black underline">{$_('auth.terms_service')}</a> {$_('auth.and')} 
                        <a href="/privacy" class="link text-black underline">{$_('auth.privacy_policy')}</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
