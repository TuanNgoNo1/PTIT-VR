import { useEffect, useRef, useState } from 'react';

/**
 * useCountUp - animated number counter that starts when element enters viewport.
 *
 * @param {number} target - target number to count up to
 * @param {number} duration - animation duration in ms (default 2000)
 * @returns {[number, React.RefObject]} current value and ref to attach
 */
export function useCountUp(target, duration = 2000) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const startTime = performance.now();

            const animate = (currentTime) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // ease-out cubic
              const eased = 1 - Math.pow(1 - progress, 3);
              setValue(Math.floor(eased * target));

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setValue(target);
              }
            };

            requestAnimationFrame(animate);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return [value, ref];
}
