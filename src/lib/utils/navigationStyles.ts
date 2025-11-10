/**
 * Utility functions for Navigation component styling
 */

interface ColorClassesOptions {
  is404: boolean;
  isHomePage: boolean;
  scrolled: boolean;
}

/**
 * Get navigation background classes based on current state
 */
export function getNavBackgroundClasses({ is404, isHomePage, scrolled }: ColorClassesOptions): string {
  if (is404) {
    return scrolled 
      ? 'top-0 bg-white backdrop-blur-md shadow-lg' 
      : 'top-10 bg-white backdrop-blur-md shadow-lg';
  }
  
  if (isHomePage) {
    return scrolled 
      ? 'top-0 bg-white backdrop-blur-md shadow-lg' 
      : 'top-10 bg-transparent backdrop-blur-sm';
  }
  
  return scrolled 
    ? 'top-0 bg-white backdrop-blur-md shadow-lg' 
    : 'top-10 bg-white backdrop-blur-md shadow-lg';
}

/**
 * Get text color classes for navigation elements
 */
export function getNavTextClasses({ is404, isHomePage, scrolled }: ColorClassesOptions): string {
  if (is404) {
    return 'text-black';
  }
  
  if (isHomePage) {
    return scrolled ? 'text-black' : 'text-white';
  }
  
  return 'text-black';
}

/**
 * Get text color classes with hover states
 */
export function getNavLinkClasses({ is404, isHomePage, scrolled }: ColorClassesOptions): string {
  if (is404) {
    return 'text-gray-800 hover:text-black';
  }
  
  if (isHomePage) {
    return scrolled 
      ? 'text-gray-800 hover:text-black' 
      : 'text-white hover:text-gray-200';
  }
  
  return 'text-gray-800 hover:text-black';
}

/**
 * Get mobile menu background classes
 */
export function getMobileMenuClasses({ is404, isHomePage, scrolled }: ColorClassesOptions): string {
  if (is404) {
    return 'bg-white/95 border-t border-gray-200';
  }
  
  if (isHomePage) {
    return scrolled 
      ? 'bg-white/95 border-t border-gray-200' 
      : 'bg-white/10';
  }
  
  return 'bg-white/95 border-t border-gray-200';
}

/**
 * Get mobile menu item classes
 */
export function getMobileMenuItemClasses({ is404, isHomePage, scrolled }: ColorClassesOptions): string {
  if (is404) {
    return 'text-gray-800 hover:text-black hover:bg-gray-50';
  }
  
  if (isHomePage) {
    return scrolled 
      ? 'text-gray-800 hover:text-black hover:bg-gray-50' 
      : 'text-white hover:text-gray-200 hover:bg-white/10';
  }
  
  return 'text-gray-800 hover:text-black hover:bg-gray-50';
}

/**
 * Get hamburger button classes
 */
export function getHamburgerButtonClasses({ is404, isHomePage, scrolled }: ColorClassesOptions): string {
  if (is404) {
    return 'text-black hover:bg-gray-100';
  }
  
  if (isHomePage) {
    return scrolled 
      ? 'text-black hover:bg-gray-100' 
      : 'text-white hover:bg-white/10';
  }
  
  return 'text-black hover:bg-gray-100';
}
