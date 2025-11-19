import { browser } from '$app/environment';
import { init, register, locale, waitLocale } from 'svelte-i18n';

const defaultLocale = 'en';

// Register all available languages
register('en', () => import('./locales/en.json'));
register('fr', () => import('./locales/fr.json'));
register('es', () => import('./locales/es.json'));
register('de', () => import('./locales/de.json'));
register('pt', () => import('./locales/pt.json'));
register('it', () => import('./locales/it.json'));

// Available languages configuration
export const availableLanguages = [
	{ code: 'en', name: 'English', flag: '🇬🇧' },
	{ code: 'fr', name: 'Français', flag: '🇫🇷' },
	{ code: 'es', name: 'Español', flag: '🇪🇸' },
	{ code: 'de', name: 'Deutsch', flag: '🇩🇪' },
	{ code: 'pt', name: 'Português', flag: '🇵🇹' },
	{ code: 'it', name: 'Italiano', flag: '🇮🇹' }
];

function getCookie(name: string): string | null {
	if (!browser) return null;
	const match = document.cookie
		.split('; ')
		.find((row) => row.startsWith(name + '='));
	return match ? decodeURIComponent(match.split('=')[1]) : null;
}

function getInitialLocale(): string {
	if (!browser) return defaultLocale;
	const cookieLocale = getCookie('preferred-language');
	const lsLocale = localStorage.getItem('preferred-language');
	const navLocale = window.navigator.language.split('-')[0];
	return cookieLocale || lsLocale || navLocale || defaultLocale;
}

init({
	fallbackLocale: defaultLocale,
	initialLocale: getInitialLocale(),
});

export { locale, waitLocale };

export function setLocale(newLocale: string) {
	locale.set(newLocale);
}

export function getCurrentLocale(): string {
	let currentLocale = defaultLocale;
	locale.subscribe(value => {
		if (value) currentLocale = value;
	})();
	return currentLocale;
}
