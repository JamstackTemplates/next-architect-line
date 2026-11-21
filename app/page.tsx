import type { Metadata } from 'next';
import { SectionLineDivider } from '../components/drawings/shared';
import {
  Hero,
  ProcessStrip,
  RecognitionSection,
  SelectedWork,
  StatementBand,
  StudioVisit,
} from '../components/home-sections';
import { awards, getRecentAwards } from '../content/awards';
import { business } from '../content/business';
import { stages } from '../content/process';
import { getBuiltProjectCount, getFeaturedProjects, projects } from '../content/projects';
import { absoluteUrl } from '../lib/paths';
import { businessStructuredData, jsonLd } from '../lib/structured-data';

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl('/') },
};

export default function HomePage() {
  const featured = getFeaturedProjects();
  const builtCount = getBuiltProjectCount();
  const recentAwards = getRecentAwards(3);

  return (
    <>
      <Hero>
        <Hero.Header>
          <Hero.HeadingColumn>
            <Hero.Eyebrow>Sheet 01 — Chicago &amp; Great Lakes</Hero.Eyebrow>
            <Hero.Heading>Buildings drawn to a true vertical.</Hero.Heading>
          </Hero.HeadingColumn>

          <Hero.Aside>
            <Hero.Introduction>
              We design houses, civic rooms and second lives for old industrial buildings, in
              concrete, brick, timber and light, from a studio in the Monadnock.
            </Hero.Introduction>
            <Hero.Actions>
              <Hero.PrimaryAction>Start a project enquiry</Hero.PrimaryAction>
              <Hero.SecondaryAction>See the work</Hero.SecondaryAction>
            </Hero.Actions>
          </Hero.Aside>
        </Hero.Header>

        <Hero.Plate caption="Pl. 01 — Lakeshore House, south elevation, 1:100" />
      </Hero>

      <SelectedWork projects={featured}>
        <SelectedWork.Heading eyebrow="Index 01–04 · Monograph Plates">
          Selected work
        </SelectedWork.Heading>
        <SelectedWork.MoreLink>View all {projects.length} plates</SelectedWork.MoreLink>
      </SelectedWork>

      <SectionLineDivider code="A" label="Practice datum" dimension={`EST. ${business.founded}`} />

      <StatementBand founded={business.founded} builtCount={builtCount} awardCount={awards.length}>
        <StatementBand.Eyebrow>On the practice</StatementBand.Eyebrow>
        <StatementBand.Quote>
          We remove until the building stands on its own: one material, one idea, one true line.
        </StatementBand.Quote>
      </StatementBand>

      <SectionLineDivider code="B" label="Commission line" dimension="SIX STAGES" />

      <ProcessStrip stages={stages}>
        <ProcessStrip.Heading eyebrow="How a commission runs">
          Six stages, one line
        </ProcessStrip.Heading>
        <ProcessStrip.Link>Read the full process</ProcessStrip.Link>
      </ProcessStrip>

      <SectionLineDivider code="C" label="Honours register" dimension="2017–2025" />

      <RecognitionSection awards={recentAwards}>
        <RecognitionSection.Heading eyebrow="Recent recognition">
          Awards register
        </RecognitionSection.Heading>
        <RecognitionSection.Link>All {awards.length} awards</RecognitionSection.Link>
      </RecognitionSection>

      <SectionLineDivider code="D" label="Chicago studio" dimension="53 W JACKSON BLVD" />

      <StudioVisit>
        <StudioVisit.Heading eyebrow="Monadnock Building · Suite 1110">
          Visit the studio
        </StudioVisit.Heading>
        <StudioVisit.Details />
        <StudioVisit.Action>Start a project enquiry</StudioVisit.Action>
      </StudioVisit>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(businessStructuredData()) }}
      />
    </>
  );
}
