import type { Metadata } from 'next';
import { SectionLineDivider } from '../../components/drawings/shared';
import { EnquiryBand } from '../../components/enquiry-band';
import { PageHead } from '../../components/page-head';
import { ProcessPreparation } from '../../components/page-sections';
import { ProcessStages } from '../../components/process-section';
import { stages } from '../../content/process';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Process',
  description:
    'How Plumb Line Architects runs a commission in six stages, from initial survey and brief through design development, tender, site supervision and first-year inspection.',
  alternates: { canonical: absoluteUrl('/process/') },
};

export default function ProcessPage() {
  return (
    <>
      <PageHead eyebrow="Sheet 03 — Process" title="Process: six stages, one line" meta="Stages 01–06">
        <p>
          Whether a house on a wooded bluff or the reuse of a century-old brick warehouse, every
          commission follows the same disciplined sequence. A principal stays on the drawings from
          first site walk through handover.
        </p>
      </PageHead>

      <ProcessStages stages={stages} />

      <SectionLineDivider code="A" label="Before we begin" dimension="CLIENT BRIEF" />

      <ProcessPreparation>
        <ProcessPreparation.Checklist eyebrow="Preparation" heading="What we need from you">
          <ProcessPreparation.Item term="01 · Site">
            Where the land or existing building sits, whether you already own or lease it, and any
            survey, plat or landmark status you have on hand.
          </ProcessPreparation.Item>
          <ProcessPreparation.Item term="02 · Brief">
            How the building will be used day to day, rough room count or floor area, and what
            matters most to keep if the project is an existing structure.
          </ProcessPreparation.Item>
          <ProcessPreparation.Item term="03 · Budget range">
            An honest upper and lower construction budget so we can test area, structural system
            and material quality before drawing a scheme that cannot be built.
          </ProcessPreparation.Item>
          <ProcessPreparation.Item term="04 · Timescale">
            When you hope to start design, apply for permits or move in—including any financing,
            grant or lease deadlines the schedule must respect.
          </ProcessPreparation.Item>
        </ProcessPreparation.Checklist>

        <ProcessPreparation.Fees eyebrow="Appointment" heading="Fees and appointment">
          <p>
            We do not publish standard rates or quote fees on this site because every building site,
            jurisdiction and structural condition differs.
          </p>
          <p>
            After an initial conversation and a visit to the site, we write a clear proposal setting
            out the scope of each stage and our fee—either as a fixed fee for a well-defined scope
            or as an agreed percentage of construction cost.
          </p>
          <p>
            Nothing is agreed until both sides sign a written AIA appointment. Writing to us opens a
            discussion; it does not appoint the studio or commit either side.
          </p>
        </ProcessPreparation.Fees>
      </ProcessPreparation>

      <EnquiryBand>
        <EnquiryBand.Copy>
          <EnquiryBand.Eyebrow>First step</EnquiryBand.Eyebrow>
          <EnquiryBand.Heading>Ready to talk through a site or brief?</EnquiryBand.Heading>
          <EnquiryBand.Note>
            Send us an outline of what you are planning. A principal reads every enquiry and
            responds within five working days.
          </EnquiryBand.Note>
        </EnquiryBand.Copy>
        <EnquiryBand.Action>Start a project enquiry</EnquiryBand.Action>
      </EnquiryBand>
    </>
  );
}
