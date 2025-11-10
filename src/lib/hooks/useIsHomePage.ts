"use client";

import { usePathname } from "next/navigation";

/**
 * Hook to determine if the current page is the home page
 * Works with localized routes (e.g., /, /es, /fr, /en, /ar)
 * 
 * @param is404 - Optional flag to indicate if we're on a 404 page
 * @returns boolean - true if on home page, false otherwise
 */
export function useIsHomePage(is404 = false): boolean {
  const pathname = usePathname();
  
  // If it's a 404 page, it's not a home page
  if (is404) {
    return false;
  }
  
  // Check if we're on the home page (root or with locale prefix)
  return pathname === '/' || !!pathname.match(/^\/[a-z]{2}$/);
}
