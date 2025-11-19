import { getUserProfile } from '$lib/server/db/repositories/profile';
import type { LayoutServerLoad } from './$types'


export const load: LayoutServerLoad = async ({ locals: { safeGetSession }, cookies }) => {
    //console.log('[LOG] LayoutServer - Load Called : start|ok');
    const { session } = await safeGetSession()
    //console.log('[LOG] LayoutServer - Session Exists : ' + (!!session?.user) + '|ok');
    
    let userProfile = null;
    let preferredLocale: string | null = null;
    
    if (session?.user) {
        try {
            //console.log('[LOG] LayoutServer - Fetch UserProfile userId : ' + session.user.id + '|pending');
            const profileResult = await getUserProfile(session.user.id);
            userProfile = profileResult[0];
            //console.log('[LOG] LayoutServer - Fetch UserProfile result : ' + JSON.stringify(userProfile) + '|ok');
            //console.log('[LOG] LayoutServer - Profile Language value : ' + (userProfile?.ui_language || 'none') + '|ok');
            preferredLocale = userProfile?.ui_language ?? null;
        } catch (error) {
            //console.error('[LOG] LayoutServer - Fetch UserProfile error : ' + (error?.message || String(error)) + '|exception');
        }
    } else {
    //console.log('[LOG] LayoutServer - Fetch UserProfile : skip_no_session|ok');
    }

    // Fallback to cookie if no profile language
    const cookieLocale = cookies.get('preferred-language') ?? null;
    if (!preferredLocale && cookieLocale) {
        preferredLocale = cookieLocale;
    }
    // Ensure we always have a locale
    if (!preferredLocale) preferredLocale = 'en';

    // Sync cookie for SSR and future requests
    if (cookieLocale !== preferredLocale) {
        cookies.set('preferred-language', preferredLocale, {
            path: '/',
            maxAge: 60 * 60 * 24 * 365,
            sameSite: 'lax'
        });
    }
    
    //console.log('[LOG] LayoutServer - Return Data userProfileExists : ' + (!!userProfile) + ' preferredLocale : ' + preferredLocale + '|ok');
    return {
        session,
        cookies: cookies.getAll(),
        userProfile,
        preferredLocale
    }
}