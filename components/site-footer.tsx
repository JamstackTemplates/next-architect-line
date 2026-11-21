import { business } from '../content/business';
import { formatPlateNumber, projects } from '../content/projects';
import { ScaleBar } from './drawings/shared';
import { SiteLink } from './site-link';

export function SiteFooter() {
  const totalSheets = formatPlateNumber(projects.length);

  return (
    <footer className="mt-20 border-t border-line bg-surface text-ink">
      <div className="wrap py-8">
        {/* Drawing-sheet title block in hairline boxes */}
        <div className="border border-line">
          {/* Upper title-block row: studio, address, contact, hours */}
          <div className="grid grid-cols-1 divide-y divide-line md:grid-cols-12 md:divide-x md:divide-y-0">
            <div className="p-4 md:col-span-3">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">Practice</p>
              <p className="mt-1 font-display text-2xl font-bold tracking-[0.03em] text-ink">
                {business.name}
              </p>
              <p className="mt-1 text-xs text-muted">{business.serviceArea}</p>
            </div>

            <div className="p-4 md:col-span-3">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">Studio Address</p>
              <address className="mt-1 not-italic text-sm leading-relaxed text-ink">
                {business.address.suite}, {business.address.building}
                <br />
                {business.address.street}
                <br />
                {business.address.city}, {business.address.region} {business.address.postalCode}
              </address>
            </div>

            <div className="p-4 md:col-span-3">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">Enquiries</p>
              <p className="mt-1 text-sm">
                <a className="text-link wrap-anywhere" href={`mailto:${business.email}`}>
                  {business.email}
                </a>
              </p>
              {business.phone ? (
                <p className="mt-1 font-mono text-xs text-ink">
                  <a className="no-underline hover:underline" href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}>
                    {business.phoneDisplay}
                  </a>
                </p>
              ) : null}
            </div>

            <div className="p-4 md:col-span-3">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">Studio Hours</p>
              <p className="mt-1 text-sm text-ink">{business.hoursSummary}</p>
              <p className="mt-1 font-mono text-[0.66rem] uppercase tracking-[0.12em] text-muted">
                {business.hoursNote}
              </p>
            </div>
          </div>

          {/* Lower title-block row: sheet index, nav, copyright, scale bar */}
          <div className="grid grid-cols-1 divide-y divide-line border-t border-line md:grid-cols-12 md:divide-x md:divide-y-0">
            <div className="flex items-center justify-between gap-2 px-4 py-3 md:col-span-2">
              <div>
                <span className="block font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted">
                  Monograph Set
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink">
                  Sheet 00 of {totalSheets}
                </span>
              </div>
            </div>

            <nav
              aria-label="Footer"
              className="flex flex-wrap items-center gap-x-5 gap-y-2 px-4 py-3 font-mono text-[0.7rem] uppercase tracking-[0.14em] md:col-span-4"
            >
              <SiteLink href="/" className="text-ink no-underline hover:text-accent-ink hover:underline">
                Home
              </SiteLink>
              <SiteLink href="/work/" className="text-ink no-underline hover:text-accent-ink hover:underline">
                Work
              </SiteLink>
              <SiteLink href="/process/" className="text-ink no-underline hover:text-accent-ink hover:underline">
                Process
              </SiteLink>
              <SiteLink href="/studio/" className="text-ink no-underline hover:text-accent-ink hover:underline">
                Studio
              </SiteLink>
              <SiteLink href="/contact/" className="text-ink no-underline hover:text-accent-ink hover:underline">
                Contact
              </SiteLink>
            </nav>

            <div className="flex items-center px-4 py-3 font-mono text-[0.66rem] uppercase tracking-[0.12em] text-muted md:col-span-3">
              © {business.founded}–2026 {business.name}
            </div>

            <div className="flex items-center justify-start px-4 py-3 md:col-span-3 md:justify-end">
              <ScaleBar scale="1:100" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
