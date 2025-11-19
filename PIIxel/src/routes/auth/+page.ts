import { redirect } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ parent }) => {
    const { session } = await parent()
    
    // If user is already authenticated, redirect to profile
    if (session) {
        throw redirect(303, '/profile')
    }
    
    return {}
}
