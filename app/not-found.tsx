import { OutOfPlumb } from '../components/drawings/motifs';
import { IconArrowRight } from '../components/drawings/shared';
import { SiteLink } from '../components/site-link';

export default function NotFound() {
  return (
    <section data-out-of-plumb="true" className="wrap py-14 lg:py-20">
      <div className="grid grid-cols-1 items-center gap-10 border border-line bg-surface p-6 sm:p-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <OutOfPlumb />
        </div>

        <div className="lg:col-span-6">
          <p className="eyebrow">Sheet 404 — 3° out of true</p>
          <h1 className="font-display-tight mt-3 text-[clamp(3.2rem,8vw,6rem)] font-bold uppercase text-ink">
            Out of plumb.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
            This page isn’t on the drawings. It may have been renumbered or never built.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <SiteLink href="/work/" className="button">
              <span>See the work</span>
              <IconArrowRight />
            </SiteLink>
            <SiteLink href="/" className="button button-quiet">
              Return home
            </SiteLink>
          </div>
        </div>
      </div>
    </section>
  );
}
