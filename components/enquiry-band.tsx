import type { ReactNode } from 'react';
import { IconArrowRight } from './drawings/shared';
import { SiteLink } from './site-link';

type Children = { children: ReactNode };

function EnquiryBandRoot({ children }: Children) {
  return (
    <section className="mt-16 border-y border-accent bg-accent text-on-accent">
      <div className="wrap py-14 sm:py-16">
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">{children}</div>
      </div>
    </section>
  );
}

function Copy({ children }: Children) {
  return <div className="lg:col-span-8">{children}</div>;
}

function Eyebrow({ children }: Children) {
  return (
    <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-on-accent/80">{children}</p>
  );
}

function Heading({ children }: Children) {
  return (
    <h2 className="font-display-tight mt-2 text-[clamp(2.4rem,6vw,4.4rem)] font-bold uppercase text-on-accent">
      {children}
    </h2>
  );
}

function Note({ children }: Children) {
  return <p className="mt-3 max-w-xl text-sm leading-relaxed text-on-accent/90">{children}</p>;
}

function Action({ children, href = '/contact/' }: { children: ReactNode; href?: string }) {
  return (
    <div className="lg:col-span-4 lg:flex lg:justify-end">
      <SiteLink href={href} className="button button-on-accent">
        <span>{children}</span>
        <IconArrowRight />
      </SiteLink>
    </div>
  );
}

export const EnquiryBand = Object.assign(EnquiryBandRoot, {
  Copy,
  Eyebrow,
  Heading,
  Note,
  Action,
});
