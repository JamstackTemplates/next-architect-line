import type { Metadata } from 'next';
import { SitePlanMotif } from '../../components/drawings/motifs';
import { EnquiryBand } from '../../components/enquiry-band';
import { PageHead } from '../../components/page-head';
import { WorkPortfolio } from '../../components/work-portfolio';
import { getProjectsInPlateOrder } from '../../content/projects';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Selected architectural plates by Plumb Line Architects: houses, civic rooms, workplaces and adaptive reuse projects across Chicago and the Great Lakes.',
  alternates: { canonical: absoluteUrl('/work/') },
};

export default function WorkPage() {
  const ordered = getProjectsInPlateOrder();

  return (
    <>
      <PageHead
        eyebrow="Sheet 02 — Work"
        title="Work"
        meta={`${String(ordered.length).padStart(2, '0')} plates on record`}
        motif={<SitePlanMotif />}
      >
        <p>
          Completed buildings, work on site and commissions currently in design. Each plate pairs
          the governing drawing with structural and material notes.
        </p>
      </PageHead>

      <WorkPortfolio projects={ordered} />

      <EnquiryBand>
        <EnquiryBand.Copy>
          <EnquiryBand.Eyebrow>New commissions</EnquiryBand.Eyebrow>
          <EnquiryBand.Heading>Have a site, a brief or an old building?</EnquiryBand.Heading>
          <EnquiryBand.Note>
            Write to the principals with the location, building type and rough scope. Every enquiry
            is read in studio and answered within five working days.
          </EnquiryBand.Note>
        </EnquiryBand.Copy>
        <EnquiryBand.Action>Start a project enquiry</EnquiryBand.Action>
      </EnquiryBand>
    </>
  );
}
