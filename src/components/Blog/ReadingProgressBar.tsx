"use client";

import { useState, useLayoutEffect } from 'react';

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);
  const [topPosition, setTopPosition] = useState(96); // Start with TopBar visible (navbar at top-10)

  useLayoutEffect(() => {
    let isScrolled = false;
    let rafId: number | null = null;
    let transitionTimeoutId: number | null = null;
    
    const updateTopPosition = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newIsScrolled = scrollTop > 10;
      const scrollStateChanged = newIsScrolled !== isScrolled;
      isScrolled = newIsScrolled;
      
      // Find the navigation element
      const nav = document.querySelector('nav');
      if (nav) {
        // Calculate position based on scroll state
        const navRect = nav.getBoundingClientRect();
        const calculatedPosition = Math.max(0, navRect.bottom);
        setTopPosition(calculatedPosition);
        
        // If scroll state changed, schedule one additional update after transition
        if (scrollStateChanged && transitionTimeoutId === null) {
          transitionTimeoutId = window.setTimeout(() => {
            const nav = document.querySelector('nav');
            if (nav) {
              const navRect = nav.getBoundingClientRect();
              setTopPosition(Math.max(0, navRect.bottom));
            }
            transitionTimeoutId = null;
          }, 350); // After CSS transition (300ms + buffer)
        }
      } else {
        // Fallback: estimate based on scroll state
        setTopPosition(newIsScrolled ? 56 : 96);
      }
    };

    const updateProgress = () => {
      // Calculate scroll progress
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      
      // Calculate total scrollable distance
      const scrollableDistance = documentHeight - windowHeight;
      
      // Calculate progress percentage
      const scrollProgress = scrollableDistance > 0 
        ? (scrollTop / scrollableDistance) * 100 
        : 0;
      
      setProgress(Math.min(100, Math.max(0, scrollProgress)));
    };

    const handleScroll = () => {
      // Cancel any pending animation frame
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      
      // Use requestAnimationFrame for smooth updates
      rafId = requestAnimationFrame(() => {
        updateTopPosition();
        updateProgress();
        rafId = null;
      });
    };

    const handleResize = () => {
      updateTopPosition();
      updateProgress();
    };

    // Update positions on mount, scroll, and resize
    updateTopPosition();
    updateProgress();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    // Use MutationObserver to watch for navbar changes (class transitions)
    const observer = new MutationObserver(() => {
      // Update immediately when class changes
      updateTopPosition();
    });

    const nav = document.querySelector('nav');
    if (nav) {
      observer.observe(nav, {
        attributes: true,
        attributeFilter: ['class'],
      });
    }

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      if (transitionTimeoutId !== null) {
        clearTimeout(transitionTimeoutId);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  return (
    <div 
      className="fixed left-0 right-0 z-[75] h-1 bg-transparent"
      style={{ top: `${topPosition}px`, position: 'fixed' }}
      aria-hidden="true"
    >
      <div
        className="h-full w-full bg-primary transition-transform duration-100 ease-out will-change-transform origin-left rtl:origin-right"
        style={{ 
          transform: `scaleX(${progress / 100})`
        }}
      />
    </div>
  );
}

