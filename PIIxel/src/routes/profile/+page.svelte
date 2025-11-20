<script>
    import { _ } from 'svelte-i18n';

    let { data } = $props();

    // Derive user info from data
    let session = $derived(data.session);
    let user = $derived(session?.user);
    // userProfile is an array, so get the first item
    let userProfile = $derived(data.userProfile?.[0]);

    // Local state
    const isEditing = $state(false);

    // Editable preferences (init safely for runes)
    let uiLanguage = $state('en');
    let _initialized = $state(false);
    $effect(() => {
        if (!_initialized && userProfile) {
            uiLanguage = userProfile.ui_language ?? 'en';
            _initialized = true;
        }
    });

    const availableLanguages = [
        { code: 'en', label: 'English' },
        { code: 'fr', label: 'Français' },
        { code: 'es', label: 'Español' },
        { code: 'de', label: 'Deutsch' },
        { code: 'it', label: 'Italiano' },
        { code: 'pt', label: 'Português' }
    ];

    const initial = $derived(user?.email?.[0]?.toUpperCase?.() ?? 'U');
</script>

<!-- Hero/Header Section with KH-inspired decorations -->
<div class="bg-base-100 relative overflow-hidden">
    <div class="absolute inset-0 opacity-20 pointer-events-none">
        <div class="absolute top-4 left-4 text-4xl animate-pulse" style="color:var(--kh-purple);animation-delay: 0.8s;">▣</div>
        <div class="absolute top-1/3 right-4 text-3xl animate-pulse" style="color:var(--kh-silver);animation-delay: 1.5s;">■</div>
        <div class="absolute bottom-4 left-1/3 text-5xl animate-pulse" style="color:var(--kh-gold);animation-delay: 2.2s;">◻</div>
        <div class="absolute top-16 right-1/9 text-6xl animate-pulse" style="color:var(--kh-cyan);animation-delay: 1.8s;">▪</div>
        <div class="absolute bottom-1/4 right-1/2 text-2xl animate-pulse" style="color:var(--kh-emerald);animation-delay: 1.2s;">▣</div>
        <div class="absolute top-1/6 left-2/3 text-xl animate-pulse" style="color:var(--kh-purple);animation-delay: 2.8s;">□</div>
    </div>

    <div class="container mx-auto px-4 py-10 relative z-10">
        <h1 class="text-4xl font-bold text-base-content">{$_('profile.title') || 'Your profile'}</h1>
        <p class="opacity-80 mt-2">{$_('profile.subtitle') || 'Manage your account and preferences'}</p>
    </div>
</div>

<!-- Content -->
<div class="container mx-auto px-4 pb-16 relative">
    <div class="grid lg:grid-cols-2 gap-6">
        <!-- User card -->
        <div>
            <div class="card bg-white text-black shadow-xl border-2 border-[var(--kh-cyan)] transition-all">
                <div class="card-body">
                    <div class="flex items-center gap-4">
                        <div class="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center text-xl">
                            {initial}
                        </div>
                        <div class="truncate">
                            <div class="font-semibold text-black">{user?.email}</div>
                            {#if userProfile?.role}
                                <div class="mt-1">
                                    <span class="badge badge-outline">{userProfile.role}</span>
                                </div>
                            {/if}
                        </div>
                    </div>

                    <div class="divider my-3"></div>

                    <ul class="text-sm space-y-2">
                        {#if userProfile?.created_at}
                            <li class="flex items-center justify-between">
                                <span class="opacity-70">{$_('profile.created') || 'Created'}</span>
                                <span class="font-medium">{new Date(userProfile.created_at).toLocaleDateString()}</span>
                            </li>
                        {/if}
                        {#if user?.id}
                            <li class="flex items-center justify-between">
                                <span class="opacity-70">ID</span>
                                <span class="font-mono text-xs opacity-80 truncate" title={user.id}>{user.id}</span>
                            </li>
                        {/if}
                    </ul>
                </div>
            </div>

            <!-- Session / Logout -->
            <div class="card bg-white text-black shadow-xl border-2 border-[var(--kh-amber)] mt-6">
                <div class="card-body">
                    <h3 class="card-title text-black">{$_('profile.session') || 'Session'}</h3>
                    <p class="opacity-70">{$_('profile.logout_hint') || 'End your current session securely.'}</p>
                    <form method="POST" action="?/logout" class="mt-3">
                        <button type="submit" class="btn">{$_('profile.logout') || 'Logout'}</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>