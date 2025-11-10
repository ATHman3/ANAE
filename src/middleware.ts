import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import {NextRequest} from 'next/server';

/**
 * Détecte la langue préférée depuis le header Accept-Language
 * Utilisé pour améliorer l'expérience Open Graph pour les utilisateurs
 */
function detectLocaleFromHeader(acceptLanguage: string | null): string {
  if (!acceptLanguage) {
    return routing.defaultLocale;
  }

  // Parser Accept-Language (ex: "fr-FR,fr;q=0.9,en;q=0.8,es;q=0.7")
  const languages = acceptLanguage
    .split(',')
    .map(lang => {
      const [code, q = 'q=1'] = lang.trim().split(';');
      const quality = parseFloat(q.replace('q=', '')) || 1;
      return { code: code.toLowerCase().split('-')[0], quality };
    })
    .sort((a, b) => b.quality - a.quality); // Trier par qualité décroissante

  // Mapper vers les locales supportées
  const localeMap: Record<string, string> = {
    'ar': 'ar',
    'fr': 'fr',
    'en': 'en',
    'es': 'es',
  };

  // Trouver la première langue correspondante
  for (const { code } of languages) {
    const mappedLocale = localeMap[code];
    if (mappedLocale && (routing.locales as readonly string[]).includes(mappedLocale)) {
      return mappedLocale;
    }
  }

  // Fallback vers la langue par défaut
  return routing.defaultLocale;
}

/**
 * Middleware personnalisé qui détecte la langue depuis Accept-Language
 * pour les URLs racine, tout en utilisant next-intl pour le reste
 */
const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Si c'est la racine (/) et qu'il n'y a pas de locale dans l'URL
  const pathname = request.nextUrl.pathname;
  if (pathname === '/') {
    const acceptLanguage = request.headers.get('accept-language');
    const detectedLocale = detectLocaleFromHeader(acceptLanguage);
    
    // Rediriger vers la langue détectée
    const url = request.nextUrl.clone();
    url.pathname = `/${detectedLocale}`;
    return Response.redirect(url);
  }

  // Pour toutes les autres routes, utiliser le middleware next-intl standard
  return intlMiddleware(request);
}
 
export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};