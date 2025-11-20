<script>
    import { _ } from "svelte-i18n";
</script>

<!-- Hero Section -->
<div class="hero min-h-screen bg-base-100 relative overflow-hidden">
    <!-- Kingdom Hearts-inspired background elements -->
    <div class="absolute inset-0 opacity-25">
        <!-- Geometric symbols only with random positions, spread far apart -->
        <div class="absolute top-4 left-4 text-4xl animate-pulse" style="color:var(--kh-purple);animation-delay: 0.8s;">▣</div>
        <div class="absolute top-1/3 right-4 text-3xl animate-pulse" style="color:var(--kh-silver);animation-delay: 1.5s;">■</div>
        <div class="absolute top-2/8 left-2/7 text-3xl animate-pulse" style="color:var(--kh-rose);animation-delay: 1.5s;">□</div>
        <div class="absolute bottom-4 left-1/3 text-5xl animate-pulse" style="color:var(--kh-gold);animation-delay: 2.2s;">◻</div>
        <div class="absolute top-3/4 left-2 text-3xl animate-pulse" style="color:var(--kh-rose);animation-delay: 0.3s;">□</div>
        <div class="absolute top-16 right-1/9 text-6xl animate-pulse" style="color:var(--kh-cyan);animation-delay: 1.8s;">▪</div>
        <div class="absolute bottom-1/4 right-1/2 text-2xl animate-pulse" style="color:var(--kh-emerald);animation-delay: 1.2s;">▣</div>
        <div class="absolute top-1/2 left-1/12 text-3xl animate-pulse" style="color:var(--kh-cyan);animation-delay: 2.5s;">◻</div>
        <div class="absolute top-2 right-1/6 text-2xl animate-pulse" style="color:var(--kh-rose);animation-delay: 1.7s;">■</div>
        <div class="absolute bottom-16 left-1/12 text-4xl animate-pulse" style="color:var(--kh-gold);animation-delay: 0.6s;">▣</div>
        <div class="absolute top-1/6 left-2/3 text-xl animate-pulse" style="color:var(--kh-purple);animation-delay: 2.8s;">□</div>
        <div class="absolute bottom-1/3 right-1/12 text-3xl animate-pulse" style="color:var(--kh-emerald);animation-delay: 1.3s;">◻</div>
        <div class="absolute top-5/6 left-3/4 text-2xl animate-pulse" style="color:var(--kh-silver);animation-delay: 0.9s;">□</div>
        <div class="absolute bottom-8 right-1/6 text-4xl animate-pulse" style="color:var(--kh-emerald);animation-delay: 2.1s;">▪</div>
        <div class="absolute top-2/5 right-3/4 text-5xl animate-pulse" style="color:var(--kh-silver);animation-delay: 1.6s;">■</div>
    </div>
    
    <div class="hero-content text-center text-base-content relative z-10">
        <div class="max-w-md">
            <h1 class="mb-5 text-5xl font-bold text-base-content">{$_('home.title')}</h1>
            <p class="mb-5 text-xl opacity-90">
                {$_('home.subtitle')} <b class="underline decoration-[var(--kh-cyan)]">{$_('home.advanced_pii')}</b>
                {$_('common.and')} <i class="text-[var(--kh-emerald)]">{$_('home.anonymization')}</i>.
            </p>
            <div class="flex gap-4 justify-center">
                <button class="btn btn-lg">{$_('home.get_started')}</button>
                <button class="btn btn-outline btn-lg">{$_('home.learn_more')}</button>
            </div>
        </div>
    </div>
</div>

<!-- Features Section -->
<div class="py-20 bg-base-100 relative">
    <!-- Decorative elements -->
    <div class="absolute inset-0 opacity-20">
        <!-- Geometric symbols with random positions, spread far apart -->
        <div class="absolute top-2 left-2 text-4xl animate-pulse" style="color:var(--kh-rose);animation-delay: 1.0s;">■</div>
        <div class="absolute bottom-2 right-2 text-5xl animate-pulse" style="color:var(--kh-gold);animation-delay: 1.8s;">▣</div>
        <div class="absolute top-3/4 left-1/12 text-3xl animate-pulse" style="color:var(--kh-emerald);animation-delay: 0.5s;">◻</div>
        <div class="absolute bottom-1/4 right-1/12 text-6xl animate-pulse" style="color:var(--kh-silver);animation-delay: 2.1s;">□</div>
        <div class="absolute top-1/3 right-5/8 text-2xl animate-pulse" style="color:var(--kh-cyan);animation-delay: 1.4s;">▪</div>
        <div class="absolute top-6 left-5/9 text-3xl animate-pulse" style="color:var(--kh-purple);animation-delay: 2.3s;">▣</div>
        <div class="absolute bottom-6 left-2/9 text-4xl animate-pulse" style="color:var(--kh-purple);animation-delay: 0.8s;">□</div>
        <div class="absolute top-1/2 right-3/4 text-2xl animate-pulse" style="color:var(--kh-rose);animation-delay: 1.6s;">□</div>
        <div class="absolute bottom-1/3 left-3/4 text-3xl animate-pulse" style="color:var(--kh-cyan);animation-delay: 0.3s;">■</div>
        <div class="absolute top-5/6 right-5/11 text-xl animate-pulse" style="color:var(--kh-gold);animation-delay: 2.5s;">▣</div>
    </div>
    
    <div class="container mx-auto px-4 relative z-10">
        <h2 class="text-4xl font-bold text-center mb-16 text-base-content">{$_('home.why_choose_title')}</h2>

        <div class="grid md:grid-cols-3 gap-8">
            <!-- Feature 1 -->
            <div class="card bg-white text-black shadow-xl hover:shadow-2xl transition-all duration-300 border border-black/20 hover:border-black/40">
                <div class="card-body text-center">
                    <div class="mx-auto mb-4">
                        <div
                            class="w-16 h-16 bg-black rounded-full flex items-center justify-center shadow-lg"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-8 w-8 text-[var(--kh-emerald)]"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                />
                            </svg>
                        </div>
                    </div>
                    <h3 class="card-title justify-center text-black">{$_('home.feature_secure_title')}</h3>
                    <p class="text-black/70">
                        {$_('home.feature_secure_desc')}
                    </p>
                </div>
            </div>

            <!-- Feature 2 -->
            <div class="card bg-white text-black shadow-xl hover:shadow-2xl transition-all duration-300 border border-black/20 hover:border-black/40">
                <div class="card-body text-center">
                    <div class="mx-auto mb-4">
                        <div
                            class="w-16 h-16 bg-black rounded-full flex items-center justify-center shadow-lg"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-8 w-8 text-[var(--kh-amber)]"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                        </div>
                    </div>
                    <h3 class="card-title justify-center text-black">{$_('home.feature_fast_title')}</h3>
                    <p class="text-black/70">
                        {$_('home.feature_fast_desc')}
                    </p>
                </div>
            </div>

            <!-- Feature 3 -->
            <div class="card bg-white text-black shadow-xl hover:shadow-2xl transition-all duration-300 border border-black/20 hover:border-black/40">
                <div class="card-body text-center">
                    <div class="mx-auto mb-4">
                        <div
                            class="w-16 h-16 bg-black rounded-full flex items-center justify-center shadow-lg"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-8 w-8 text-[var(--kh-rose)]"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                />
                            </svg>
                        </div>
                    </div>
                    <h3 class="card-title justify-center text-black">{$_('home.feature_integration_title')}</h3>
                    <p class="text-black/70">
                        {$_('home.feature_integration_desc')}
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- CTA Section -->
<div class="py-20 bg-base-100 text-base-content relative overflow-hidden">
    <!-- Background decorative elements -->
    <div class="absolute inset-0 opacity-20">
        <!-- Geometric symbols with random positions, spread far apart -->
        <div class="absolute top-4 right-1/4 text-4xl animate-pulse" style="color:var(--kh-purple);animation-delay: 0.7s;">□</div>
        <div class="absolute bottom-4 right-3 text-5xl animate-pulse" style="color:var(--kh-silver);animation-delay: 1.4s;">■</div>
        <div class="absolute top-1/8 left-1/12 text-6xl animate-pulse" style="color:var(--kh-gold);animation-delay: 2.0s;">▣</div>
        <div class="absolute bottom-1/6 right-1/12 text-3xl animate-pulse" style="color:var(--kh-emerald);animation-delay: 0.9s;">◻</div>
        <div class="absolute top-5/6 left-1/6 text-2xl animate-pulse" style="color:var(--kh-rose);animation-delay: 1.7s;">▪</div>
        <div class="absolute top-1/3 left-1/6 text-4xl animate-pulse" style="color:var(--kh-cyan);animation-delay: 1.1s;">▣</div>
        <div class="absolute bottom-8 left-1/2 text-3xl animate-pulse" style="color:var(--kh-emerald);animation-delay: 2.4s;">□</div>
        <div class="absolute top-1/2 right-3/4 text-2xl animate-pulse" style="color:var(--kh-purple);animation-delay: 0.5s;">□</div>
        <div class="absolute bottom-1/3 left-3/4 text-4xl animate-pulse" style="color:var(--kh-rose);animation-delay: 1.8s;">■</div>
        <div class="absolute top-9/15 right-1/2 text-xl animate-pulse" style="color:var(--kh-cyan);animation-delay: 2.7s;">▣</div>
    </div>
    
    <div class="container mx-auto px-4 text-center relative z-10">
        <h2 class="text-4xl font-bold mb-8 drop-shadow-lg">{$_('home.cta_title')}</h2>
        <p class="text-xl mb-8 max-w-2xl mx-auto opacity-90 drop-shadow">
            {$_('home.cta_subtitle')}
        </p>
        <div class="flex gap-4 justify-center">
            <a href="/register" class="btn btn-tertiary btn-lg">{$_('home.start_trial')}</a>
            <a href="/demo" class="btn btn-outline btn-lg">{$_('home.request_demo')}</a>
        </div>
    </div>
</div>
