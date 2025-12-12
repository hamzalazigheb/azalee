'use client';
import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function ScrollRestoration() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isRestoringRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    // Create a unique key for this page (pathname + search params)
    const pageKey = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    
    // Save scroll position on scroll (throttled)
    const handleScroll = () => {
      if (isRestoringRef.current) return; // Don't save while restoring
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        if (typeof window !== 'undefined' && !isRestoringRef.current) {
          sessionStorage.setItem(`scrollPos_${pageKey}`, window.scrollY.toString());
        }
      }, 100);
    };

    // Save scroll position before navigation
    const saveCurrentPosition = () => {
      if (typeof window !== 'undefined' && !isRestoringRef.current) {
        sessionStorage.setItem(`scrollPos_${pageKey}`, window.scrollY.toString());
      }
    };

    // Save position on link click
    const handleLinkClick = (e) => {
      const target = e.target.closest('a');
      if (target && target.href) {
        try {
          const url = new URL(target.href, window.location.origin);
          const currentUrl = new URL(window.location.href);
          
          // Save position if navigating to a different page
          if (url.pathname !== currentUrl.pathname || url.search !== currentUrl.search) {
            saveCurrentPosition();
          }
        } catch (err) {
          // Invalid URL, ignore
        }
      }
    };

    // Restore scroll position
    const restoreScrollPosition = () => {
      if (typeof window === 'undefined') return;
      
      isRestoringRef.current = true;
      
      // Check for hash in URL first
      if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          setTimeout(() => {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            isRestoringRef.current = false;
          }, 200);
          return;
        }
      }
      
      // Otherwise restore saved position
      const savedPosition = sessionStorage.getItem(`scrollPos_${pageKey}`);
      if (savedPosition) {
        const position = parseInt(savedPosition, 10);
        if (!isNaN(position) && position > 0) {
          // Wait for page to be fully rendered
          setTimeout(() => {
            window.scrollTo({
              top: position,
              behavior: 'auto' // Instant for restoration
            });
            isRestoringRef.current = false;
          }, 100);
        } else {
          isRestoringRef.current = false;
        }
      } else {
        isRestoringRef.current = false;
      }
    };

    // Handle browser back/forward buttons
    const handlePopState = () => {
      setTimeout(() => {
        restoreScrollPosition();
      }, 50);
    };

    // Attach event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('popstate', handlePopState);
    document.addEventListener('click', handleLinkClick, true);
    window.addEventListener('beforeunload', saveCurrentPosition);

    // Restore position on mount/route change
    restoreScrollPosition();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleLinkClick, true);
      window.removeEventListener('beforeunload', saveCurrentPosition);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [pathname, searchParams]);

  return null;
}

