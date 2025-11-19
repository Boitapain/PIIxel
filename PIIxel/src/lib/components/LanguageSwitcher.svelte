<script>
// @ts-nocheck
    import { setLocale, locale, availableLanguages } from '$lib/i18n';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';

    let currentLocale = $state('en');
    
    //console.log('[LOG] LanguageSwitcher - Init Component : start|ok');
    
    // Always sync currentLocale with the actual locale store
    $effect(() => { 
        //console.log('[LOG] LanguageSwitcher - Effect LocaleSubscribe : trigger|ok');
        const unsubscribe = locale.subscribe(value => {
            //console.log('[LOG] LanguageSwitcher - Locale Changed new : ' + value + '|ok');
            if (value) {
                currentLocale = value;
                //console.log('[LOG] LanguageSwitcher - State currentLocale : ' + currentLocale + '|ok');
            }
        });
        return unsubscribe;
    });
    
    // Handle profile language updates
    $effect(() => {
        //console.log('[LOG] LanguageSwitcher - Effect ProfileLanguage : trigger|ok');
        //console.log('[LOG] LanguageSwitcher - Context SessionExists : ' + (!!$page.data.session) + '|ok');
        //console.log('[LOG] LanguageSwitcher - Context UserProfile : ' + JSON.stringify($page.data.userProfile) + '|ok');
        
        const profileLanguage = $page.data.userProfile?.ui_language;
        
        if (profileLanguage) {
            //console.log('[LOG] LanguageSwitcher - Detect ProfileLanguage : ' + profileLanguage + '|ok');
            if (profileLanguage !== currentLocale) {
                //console.log('[LOG] LanguageSwitcher - Apply LocaleFromProfile target : ' + profileLanguage + '|pending');
                setLocale(profileLanguage);
                //console.log('[LOG] LanguageSwitcher - Apply LocaleFromProfile target : ' + profileLanguage + '|ok');
            } else {
                //console.log('[LOG] LanguageSwitcher - Apply LocaleFromProfile : no-op|ok');
            }
        } else {
            // Log: profile has no language
            //console.log('[LOG] LanguageSwitcher - Detect ProfileLanguage : none|skip');
        }
    });
    
    onMount(() => {
        //console.log('[LOG] LanguageSwitcher - Lifecycle OnMount : start|ok');
        //console.log('[LOG] LanguageSwitcher - Context SessionUserExists : ' + (!!$page.data.session?.user) + '|ok');
        //console.log('[LOG] LanguageSwitcher - Context UserProfileAtMount : ' + JSON.stringify($page.data.userProfile) + '|ok');
        
        // If no user session, try localStorage
        if (!$page.data.session?.user && typeof window !== 'undefined') {
            const savedLanguage = localStorage.getItem('preferred-language');
            //console.log('[LOG] LanguageSwitcher - Storage LocalPreferredLanguage : ' + savedLanguage + '|ok');
            if (savedLanguage && savedLanguage !== currentLocale) {
                //console.log('[LOG] LanguageSwitcher - Apply LocaleFromLocalStorage target : ' + savedLanguage + '|pending');
                setLocale(savedLanguage);
                //console.log('[LOG] LanguageSwitcher - Apply LocaleFromLocalStorage target : ' + savedLanguage + '|ok');
            }
        } else {
            //console.log('[LOG] LanguageSwitcher - Storage LocalPreferredLanguage : skip_session_present|ok');
        }
    });

    async function handleLanguageChange(event) {
        const newLocale = event.target.value;
        
        //console.log('[LOG] LanguageSwitcher - UI ChangeLanguage target : ' + newLocale + '|pending');
        setLocale(newLocale);
        currentLocale = newLocale;
        //console.log('[LOG] LanguageSwitcher - UI ChangeLanguage target : ' + newLocale + '|ok');
        
        if ($page.data.session?.user) {
            try {
                const response = await fetch('/api/language', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ language: newLocale })
                });
                
                if (response.ok) {
                    localStorage.setItem('preferred-language', newLocale);
                    //console.log('[LOG] LanguageSwitcher - API UpdateLanguage target : ' + newLocale + '|ok');
                } else {
                    //console.error('[LOG] LanguageSwitcher - API UpdateLanguage target : ' + newLocale + '|error');
                }
            } catch (error) {
                //console.error('[LOG] LanguageSwitcher - API UpdateLanguage error : ' + (error?.message || String(error)) + '|exception');
            }
        } else {
            if (typeof window !== 'undefined') {
                localStorage.setItem('preferred-language', newLocale);
                //console.log('[LOG] LanguageSwitcher - Storage LocalPreferredLanguage : ' + newLocale + '|ok');
            }
        }
    }
</script>

<select 
    class="select select-bordered select-sm" 
    value={currentLocale}
    onchange={handleLanguageChange}
    aria-label="Select language"
>
    {#each availableLanguages as lang (lang.code)}
        <option value={lang.code}>
            {lang.flag} {lang.name}
        </option>
    {/each}
</select>

<style>
    .select {
        min-width: 140px;
    }
</style>