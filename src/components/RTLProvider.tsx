"use client";

import { useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';

interface RTLProviderProps {
  children: React.ReactNode;
}

export default function RTLProvider({ children }: RTLProviderProps) {
  const pathname = usePathname();

  // Use useLayoutEffect to run synchronously before paint
  // This ensures the direction is set before the browser renders
  useLayoutEffect(() => {
    // Extract locale from pathname (e.g., /ar/..., /es/..., /fr/..., /en/...)
    const localeMatch = pathname.match(/^\/(ar|es|fr|en)(\/|$)/);
    const locale = localeMatch ? localeMatch[1] : 'es'; // Default to Spanish
    
    // Determine if the locale is RTL (Arabic)
    const isRTL = locale === 'ar';
    
    // Update the document direction and language
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = locale;
  }, [pathname]);

  return <>{children}</>;
}
