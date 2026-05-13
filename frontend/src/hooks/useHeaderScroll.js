import { useEffect, useState } from 'react';

/**
 * useHeaderScroll - returns true when window has scrolled past threshold.
 * Used to toggle header background/shadow.
 *
 * @param {number} threshold - scroll distance in px (default 50)
 * @returns {boolean} isScrolled
 */
export function useHeaderScroll(threshold = 50) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > threshold);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isScrolled;
}
