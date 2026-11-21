import type { Metadata } from 'next';
import { AwardsRegister } from '../../components/awards-register';
import { IconCompass, SectionLineDivider } from '../../components/drawings/shared';
import { PageHead } from '../../components/page-head';
import {
  PeopleRoster,
  PrinciplesBand,
  PublicationsList,
  StudioLocation,
} from '../../components/page-sections';
import { awards, getAwardsNewestFirst } from '../../content/awards';
import { business } from '../../content/business';
import { people, principles, publications } from '../../content/studio';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Studio',
  description:
    'Plumb Line Architects is a seven-person Chicago architecture studio founded in 2011 by Mara Lindqvist AIA and Tomasz Okafor AIA. Principles, people, awards register and Monadnock address.',
  alternates: { canonical: absoluteUrl('/studio/') },
};

export default function StudioPage() {
  const allAwards = getAwardsNewestFirst();

  return (
    <>
      <PageHead
        eyebrow="Sheet 04 — Studio"
        title="Studio"
        meta={`Founded ${business.founded} · ${people.length} people`}
      >
        <p>
          Founded in Chicago in {business.founded} by Mara Lindqvist AIA and Tomasz Okafor AIA,
          Plumb Line Architects is a seven-person practice working across the Great Lakes from the
          eleventh floor of the Monadnock Building.
        </p>
      </PageHead>

      <PrinciplesBand
        eyebrow="Practice"
        heading="Three principles"
        statement={
          <p>
            We prefer loadbearing masonry, cast-in-place concrete, regional limestone, oiled oak and
            blackened steel—materials whose joints are legible and whose surfaces improve with
            weather. Keeping the studio small means the people who draw the first section are the
            same people walking the site during construction.
          </p>
        }
        principles={principles}
      />

      <SectionLineDivider code="A" label="Studio roster" dimension={`${people.length} ARCHITECTS & STAFF`} />

      <PeopleRoster
        eyebrow="People"
        heading="The studio"
        note="Every commission is led directly by one of the two founding principals alongside a dedicated project architect."
        people={people}
      />

      <SectionLineDivider code="B" label="Honours register" dimension={`${awards.length} AWARDS`} />

      <section id="awards" className="wrap scroll-mt-24 py-14 lg:py-16" aria-labelledby="awards-heading">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow inline-flex items-center gap-2">
              <IconCompass />
              <span>Recognition · 2017–2025</span>
            </p>
            <h2
              id="awards-heading"
              className="font-display-tight mt-2 text-[clamp(2.2rem,4.5vw,3.5rem)] font-bold uppercase text-ink"
            >
              Awards register
            </h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
            {allAwards.length} entries · newest first
          </p>
        </div>

        <AwardsRegister items={allAwards} grouped />
      </section>

      <SectionLineDivider code="C" label="Bibliography" dimension="PUBLICATIONS & EXHIBITIONS" />

      <PublicationsList
        eyebrow="Print & Exhibition"
        heading="Publications"
        publications={publications}
      />

      <SectionLineDivider code="D" label="Studio location" dimension="53 W JACKSON BLVD" />

      <StudioLocation
        eyebrow="Monadnock Building"
        heading="Find the studio"
        note="Our drawing room and model shop occupy Suite 1110 in the south half of the Monadnock Building in the Chicago Loop. Please write or telephone ahead—studio visits are by appointment."
        actionLabel="Start a project enquiry"
      />
    </>
  );
}
