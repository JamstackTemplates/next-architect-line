'use client';

import { DarkModeToggle } from 'jamstacks';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { business } from '../content/business';
import { isContactRoute, route } from '../lib/paths';
import { PlumbBob } from './drawings/shared';
import { SiteLink } from './site-link';

const NAV_ITEMS = [
  { href: '/work/', label: 'Work', match: 'section' as const },
  { href: '/process/', label: 'Process', match: 'page' as const },
  { href: '/studio/', label: 'Studio', match: 'page' as const },
  { href: '/contact/', label: 'Contact', match: 'page' as const },
];

export function SiteHeader() {
  const pathname = usePathname();
  const current = route(pathname || '/');
  const onContact = isContactRoute(current);
  const menuRef = useRef<HTMLUListElement>(null);

  const [fallbackOpen, setFallbackOpen] = useState(false);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    const nativePopover = typeof HTMLElement !== 'undefined' && Object.hasOwn(HTMLElement.prototype, 'popover');
    const mq = window.matchMedia('(min-width: 768px)');
    const syncPopover = () => {
      if (mq.matches) {
        menu.removeAttribute('popover');
        setFallbackOpen(false);
      } else if (nativePopover) {
        menu.setAttribute('popover', 'auto');
      } else {
        menu.removeAttribute('popover');
      }
    };
    syncPopover();
    mq.addEventListener('change', syncPopover);
    return () => mq.removeEventListener('change', syncPopover);
  }, []);

  const toggleFallback = () => {
    if (typeof HTMLElement !== 'undefined' && !Object.hasOwn(HTMLElement.prototype, 'popover')) {
      setFallbackOpen((open) => !open);
    }
  };

  const closeMenu = () => {
    setFallbackOpen(false);
    const menu = menuRef.current;
    if (menu && menu.hasAttribute('popover') && typeof menu.hidePopover === 'function') {
      try {
        menu.hidePopover();
      } catch {
        // Already closed
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/95 backdrop-blur-xs">
      <div className="wrap flex min-h-15 items-center justify-between gap-3 py-2">
        {/* Wordmark with brass plumb-bob mark */}
        <SiteLink
          href="/"
          className="group inline-flex shrink-0 items-center gap-2.5 text-ink no-underline hover:no-underline"
        >
          <PlumbBob className="h-7 w-3.5 shrink-0" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-[1.45rem] font-bold tracking-[0.04em] text-ink">
              {business.wordmarkPrimary}
            </span>
            <span className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-muted">
              {business.wordmarkSecondary}
            </span>
          </span>
        </SiteLink>

        {/* Single semantic navigation landmark across narrow and wide layouts */}
        <div className="flex items-center gap-3 md:gap-5">
          <nav aria-label="Primary" className="relative flex items-center">
            <button
              type="button"
              popoverTarget="site-menu"
              popoverTargetAction="toggle"
              aria-controls="site-menu"
              onClick={toggleFallback}
              className="inline-flex min-h-10 items-center gap-2 border border-line bg-surface px-3 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink hover:border-drawing md:hidden"
            >
              <svg viewBox="0 0 16 12" className="h-3 w-4" fill="none" aria-hidden="true">
                <line x1="0" y1="2" x2="16" y2="2" className="draft-cut" />
                <line x1="0" y1="6" x2="16" y2="6" className="draft-cut" />
                <line x1="0" y1="10" x2="16" y2="10" className="draft-cut" />
              </svg>
              <span>Menu</span>
            </button>

            <ul
              id="site-menu"
              ref={menuRef}
              popover="auto"
              data-fallback-open={fallbackOpen ? 'true' : undefined}
              className={`m-0 list-none border border-line bg-surface p-4 text-ink max-md:fixed max-md:inset-auto max-md:top-16 max-md:right-4 max-md:w-56 max-md:space-y-1 md:static md:flex md:items-center md:gap-6 md:border-0 md:bg-transparent md:p-0 ${fallbackOpen ? 'max-md:block' : ''}`}
            >
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <SiteLink
                    href={item.href}
                    markCurrent={item.match}
                    onClick={closeMenu}
                    className="block py-2 font-mono text-[0.74rem] uppercase tracking-[0.14em] text-ink no-underline hover:text-accent-ink hover:underline md:py-1"
                  >
                    {item.label}
                  </SiteLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Persistent Enquire link on every page except Contact */}
          {!onContact ? (
            <SiteLink
              href="/contact/"
              className="site-header__actions hidden font-mono text-[0.72rem] uppercase tracking-[0.15em] text-accent-ink underline decoration-accent underline-offset-4 hover:text-ink sm:inline-block"
            >
              Enquire
            </SiteLink>
          ) : null}

          <div className="site-header__actions flex items-center">
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
