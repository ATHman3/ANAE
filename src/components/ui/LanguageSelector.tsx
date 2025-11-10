"use client";

import { useParams, usePathname } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import { Globe } from "lucide-react";
import { useIsHomePage } from "@/lib/hooks/useIsHomePage";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Import des traductions de chaque langue
import arMessages from "../../../messages/ar.json";
import esMessages from "../../../messages/es.json";
import frMessages from "../../../messages/fr.json";
import enMessages from "../../../messages/en.json";

const languages = [
  { code: 'ar', name: arMessages.language.name, flag: arMessages.language.flag },
  { code: 'es', name: esMessages.language.name, flag: esMessages.language.flag },
  { code: 'fr', name: frMessages.language.name, flag: frMessages.language.flag },
  { code: 'en', name: enMessages.language.name, flag: enMessages.language.flag },
];

interface LanguageSelectorProps {
  scrolled?: boolean;
}

export default function LanguageSelector({ scrolled = false }: LanguageSelectorProps) {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const isHomePage = useIsHomePage();
  
  // Amélioration de la détection de la langue actuelle
  let currentLocale = params.locale as string;
  
  // Fallback pour la page 404 ou autres cas où params.locale pourrait être undefined
  if (!currentLocale) {
    // Essayer d'extraire la langue du pathname
    const pathSegments = pathname.split('/');
    const possibleLocale = pathSegments[1];
    if (languages.some(lang => lang.code === possibleLocale)) {
      currentLocale = possibleLocale;
    } else {
      // Fallback par défaut
      currentLocale = 'es';
    }
  }
  
  // Determine the correct color based on page and scroll state
  const shouldUseDarkText = !isHomePage || scrolled;

  const handleLanguageChange = (locale: string) => {
    // Don't do anything if clicking on the same language
    if (locale === currentLocale) {
      return;
    }

    // Extract the path without the locale
    const segments = pathname.split('/');
    const pathWithoutLocale = segments.slice(2).join('/');
    
    // Gestion spéciale pour la page 404
    if (pathname.includes('404') || pathname.includes('not-found')) {
      router.push('/', { locale });
    } else {
      // Simple: keep the same path structure (including blog slugs)
      // Since all article folders now have the same name in all languages,
      // we can just change the locale and keep the same slug
      router.push(`/${pathWithoutLocale}`, { locale });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger 
        className={`flex items-center space-x-2 rtl:space-x-reverse px-2 py-2 rounded-md transition-all duration-300 hover:scale-[1.03] focus:outline-none focus:transition-none  ${
          shouldUseDarkText 
            ? 'text-gray-800 hover:text-black' 
            : 'text-white hover:text-gray-200'
        }`}
        aria-label="Select language"
      >
        <Globe size={20} />
        
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="center" 
        sideOffset={8}
        className="w-44 bg-white border border-gray-100 shadow-lg rounded-lg z-[80] p-1 animate-in fade-in-0 slide-in-from-top-2 duration-150"
      >
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`flex items-center justify-between px-3 py-2.5 cursor-pointer transition-all duration-200 rounded-md group ${
              currentLocale === language.code 
                ? 'bg-gray-50 text-gray-900' 
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-base">{language.flag}</span>
              <span className="text-sm font-medium">
                {language.code === 'ar' ? ` ${language.name}` : language.name}
              </span>
            </div>
            
            {/* Active indicator - plus visible */}
            {currentLocale === language.code && (
              <div className="w-2 h-2 bg-green-500 rounded-full shadow-sm" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}