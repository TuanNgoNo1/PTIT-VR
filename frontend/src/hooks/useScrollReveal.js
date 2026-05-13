import { useEffect, useRef } from 'react';

/**
 * useScrollReveal - adds 'revealed' class to element when it enters viewport.
 * Usage: const ref = useScrollReveal(); <div ref={ref} className="scroll-reveal">...</div>
 *
 * @param {Object} options - Intersection Observer options
 * @returns {React.RefObject} ref to attach to target element
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: options.threshold ?? 0.1,
        rootMargin: options.rootMargin ?? '0px 0px -50px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin]);

  return ref;
}
