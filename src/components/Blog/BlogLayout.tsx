/**
 * Layout wrapper for MDX blog posts with Tailwind Typography
 * Use this in article pages for automatic prose styling
 */

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface BlogLayoutProps {
  children: ReactNode;
  isRTL?: boolean;
}

export function BlogLayout({ children, isRTL = false }: BlogLayoutProps) {
  return (
    <div
      className={cn(
        // Base prose styling
        'prose prose-lg dark:prose-invert max-w-none',
        // Headings
        'prose-headings:scroll-mt-20 prose-headings:font-semibold',
        'prose-h1:text-4xl prose-h1:tracking-tight',
        'prose-h2:text-3xl prose-h2:border-b prose-h2:border-border prose-h2:pb-2',
        'prose-h3:text-2xl',
        // Links
        'prose-a:text-primary prose-a:no-underline hover:prose-a:underline',
        'prose-a:font-medium',
        // Code
        'prose-code:text-sm prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded',
        'prose-code:before:content-none prose-code:after:content-none',
        'prose-pre:bg-muted prose-pre:border prose-pre:border-border',
        // Blockquotes
        'prose-blockquote:border-l-4 prose-blockquote:border-primary',
        'prose-blockquote:bg-muted/50 prose-blockquote:py-2 prose-blockquote:px-4',
        'prose-blockquote:not-italic',
        // Tables
        'prose-table:border prose-table:border-border',
        'prose-th:bg-muted prose-th:border prose-th:border-border',
        'prose-td:border prose-td:border-border',
        // Images
        'prose-img:rounded-lg prose-img:shadow-md',
        // Lists (RTL support)
        isRTL && 'prose-ul:list-[disc] prose-ol:list-decimal',
        isRTL && '[direction:rtl]'
      )}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {children}
    </div>
  );
}
