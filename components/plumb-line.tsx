'use client';

import { useEffect, useRef } from 'react';
import { PlumbBob } from './drawings/shared';

export const PLUMB_TARGET_EVENT = 'plumb-line:target';

/**
 * Global signature element: a hairline running down the left datum of every page
 * with a brass plumb bob that gently sways as the page scrolls and settles to vertical.
 * On the Work index, hovering or focusing a project plate drops the bob to align with that plate's title.
 * Decorative (aria-hidden), static under prefers-reduced-motion and without JS.
 */
export function PlumbLine() {
  const bobRef = useRef<HTMLDivElement>(null);
  const pinnedTargetY = useRef<number | null>(null);

  useEffect(() => {
    const bob = bobRef.current;
    if (!bob) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) return;

    let lastScrollY = window.scrollY;
    let settleTimer: ReturnType<typeof setTimeout> | undefined;
    let rafId = 0;

    const updateFromScroll = () => {
      if (motionQuery.matches) {
        bob.style.setProperty('--plumb-sway', '0deg');
        return;
      }

      const currentY = window.scrollY;
      const delta = currentY - lastScrollY;
      lastScrollY = currentY;

      const docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, currentY / docHeight));

      // When a Work plate is hovered/focused, align bob to its title viewport Y; otherwise ride softly with scroll
      const defaultY = 82 + progress * Math.min(window.innerHeight - 160, 520);
      const targetY = pinnedTargetY.current !== null ? pinnedTargetY.current : defaultY;
      const clampedY = Math.max(64, Math.min(window.innerHeight - 54, targetY));

      const swayDeg = Math.max(-7, Math.min(7, delta * 0.16));
      bob.style.setProperty('--plumb-y', `${Math.round(clampedY)}px`);
      bob.style.setProperty('--plumb-sway', `${swayDeg.toFixed(2)}deg`);

      clearTimeout(settleTimer);
      settleTimer = setTimeout(() => {
        bob.style.setProperty('--plumb-sway', '0deg');
      }, 140);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateFromScroll);
    };

    const onTarget = (event: Event) => {
      if (motionQuery.matches) return;
      const detail = (event as CustomEvent<{ y: number | null }>).detail;
      pinnedTargetY.current = detail?.y ?? null;
      const targetY =
        pinnedTargetY.current !== null
          ? Math.max(64, Math.min(window.innerHeight - 54, pinnedTargetY.current))
          : 82 +
            Math.min(1, Math.max(0, window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight))) *
              Math.min(window.innerHeight - 160, 520);
      bob.style.setProperty('--plumb-y', `${Math.round(targetY)}px`);
      bob.style.setProperty('--plumb-sway', detail?.y !== null ? '2.2deg' : '0deg');
      clearTimeout(settleTimer);
      settleTimer = setTimeout(() => {
        bob.style.setProperty('--plumb-sway', '0deg');
      }, 220);
    };

    const onMotionChange = () => {
      if (motionQuery.matches) {
        bob.style.removeProperty('--plumb-y');
        bob.style.setProperty('--plumb-sway', '0deg');
      }
    };

    updateFromScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener(PLUMB_TARGET_EVENT, onTarget as EventListener);
    motionQuery.addEventListener('change', onMotionChange);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(settleTimer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener(PLUMB_TARGET_EVENT, onTarget as EventListener);
      motionQuery.removeEventListener('change', onMotionChange);
    };
  }, []);

  return (
    <div className="plumb-datum" aria-hidden="true">
      <div className="plumb-datum__line" />
      <div ref={bobRef} className="plumb-datum__bob">
        <PlumbBob className="h-8 w-4" showCord={false} />
      </div>
    </div>
  );
}
