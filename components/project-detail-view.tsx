import type { Award } from '../content/awards';
import { business } from '../content/business';
import {
  CLIENT_TYPE_LABELS,
  DRAWING_METADATA,
  PROJECT_STATUS_LABELS,
  PROJECT_TYPE_LABELS,
  formatPlateNumber,
  type Project,
} from '../content/projects';
import { AwardsRegister } from './awards-register';
import { ProjectDrawing } from './drawings/project-plates';
import {
  IconArrowLeft,
  IconArrowRight,
  ScaleBar,
  SectionLineDivider,
  TitleBlock,
} from './drawings/shared';
import { EnquiryBand } from './enquiry-band';
import { SiteLink } from './site-link';

export function ProjectDetailView({
  project,
  projectAwards,
  neighbors,
}: {
  project: Project;
  projectAwards: readonly Award[];
  neighbors: { prev: Project; next: Project } | null;
}) {
  const plateNum = formatPlateNumber(project.plate);
  const meta = DRAWING_METADATA[project.drawing];
  const showStamp = project.status !== 'completed';

  return (
    <>
      {/* Plate Head */}
      <header className="border-b border-line">
        <div className="wrap py-10 lg:py-14">
          <div className="mb-5">
            <SiteLink
              href="/work/"
              className="inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-muted no-underline hover:text-ink hover:underline"
            >
              <IconArrowLeft />
              <span>All plates</span>
            </SiteLink>
          </div>

          <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-12">
            <div className="lg:col-span-2">
              <span className="block font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted">
                Plate No.
              </span>
              <span className="font-display-tight block text-[clamp(4.5rem,9vw,7.5rem)] font-bold text-brass">
                {plateNum}
              </span>
            </div>

            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-3">
                <p className="eyebrow">
                  {project.location} · {project.year}
                </p>
                {showStamp ? (
                  <span
                    data-status-stamp={project.status}
                    className="border border-accent px-2 py-0.5 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-accent-ink"
                  >
                    {PROJECT_STATUS_LABELS[project.status].toUpperCase()}
                  </span>
                ) : null}
              </div>
              <h1 className="font-display-tight mt-2 text-[clamp(3rem,7.5vw,5.8rem)] font-bold uppercase text-ink">
                {project.title}
              </h1>
            </div>

            <div className="lg:col-span-3 lg:text-right">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">
                {meta.view}
              </p>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-ink">
                Scale {meta.scale}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Large architectural plate drawing in hairline frame with scale bar & title block */}
      <section className="wrap py-10 lg:py-12" aria-label={`${project.title} technical drawing`}>
        <figure className="border border-line bg-surface">
          <div className="flex items-center justify-between border-b border-line px-4 py-2.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">
            <span>
              Pl. {plateNum} · {meta.view}
            </span>
            <ScaleBar scale={meta.scale} className="hidden sm:inline-flex" />
          </div>

          <div className="p-4 sm:p-8 lg:p-10">
            <ProjectDrawing drawing={project.drawing} title={project.title} />
          </div>

          <TitleBlock
            studio={business.name}
            project={project.title}
            plate={`Pl. ${plateNum}`}
            scale={meta.scale}
            date={String(project.year)}
            view={meta.view}
            status={showStamp ? PROJECT_STATUS_LABELS[project.status] : undefined}
          />
        </figure>
      </section>

      {/* Drawing schedule table + narrative column */}
      <section className="wrap py-8 lg:py-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Technical drawing schedule table */}
          <div className="lg:col-span-5">
            <p className="eyebrow mb-4">Drawing schedule</p>
            <div
              className="spec-table-wrap"
              tabIndex={0}
              role="region"
              aria-labelledby="project-schedule-caption"
            >
              <table className="spec-table">
                <caption id="project-schedule-caption" className="visually-hidden">
                  Technical specification schedule for {project.title}
                </caption>
                <tbody>
                  <tr>
                    <th scope="row">Type</th>
                    <td>{PROJECT_TYPE_LABELS[project.type]}</td>
                  </tr>
                  <tr>
                    <th scope="row">Status</th>
                    <td>
                      {PROJECT_STATUS_LABELS[project.status]} ({project.year})
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Gross internal area</th>
                    <td>{project.areaSqFt.toLocaleString('en-US')} sq ft</td>
                  </tr>
                  <tr>
                    <th scope="row">Client</th>
                    <td>{CLIENT_TYPE_LABELS[project.client]}</td>
                  </tr>
                  <tr>
                    <th scope="row">Structure</th>
                    <td>{project.structure}</td>
                  </tr>
                  <tr>
                    <th scope="row">Principal materials</th>
                    <td>{project.materials.join(', ')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Project narrative */}
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="eyebrow mb-4">Project notes</p>
            <p className="text-lg leading-relaxed font-semibold text-ink">{project.summary}</p>
            <div className="mt-6 space-y-5 text-[0.98rem] leading-relaxed text-ink/90">
              {project.narrative.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Awards for this project, if any */}
      {projectAwards.length > 0 ? (
        <>
          <SectionLineDivider code="A" label="Recognition" dimension={`PL. ${plateNum}`} />
          <section className="wrap py-10" aria-labelledby="project-awards-heading">
            <div className="mx-auto max-w-4xl">
              <p className="eyebrow">Recognition</p>
              <h2
                id="project-awards-heading"
                className="font-display-tight mt-2 mb-6 text-[clamp(2rem,4.5vw,3.2rem)] font-bold uppercase text-ink"
              >
                Awards for this building
              </h2>
              <AwardsRegister items={projectAwards} />
            </div>
          </section>
        </>
      ) : null}

      {/* Previous / Next plate navigation as two half-width mini drawing sheets */}
      {neighbors ? (
        <>
          <SectionLineDivider code="B" label="Adjacent plates" dimension="PLATE ORDER" />
          <nav aria-label="Adjacent projects" className="wrap py-10">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <SiteLink
                href={`/work/${neighbors.prev.id}/`}
                className="plate-sheet group flex flex-col p-5 text-ink no-underline hover:no-underline"
              >
                <span className="inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">
                  <IconArrowLeft />
                  <span>Previous · Pl. {formatPlateNumber(neighbors.prev.plate)}</span>
                </span>
                <div className="my-4 flex h-40 items-center justify-center">
                  <ProjectDrawing
                    drawing={neighbors.prev.drawing}
                    title={neighbors.prev.title}
                    className="h-full w-auto max-w-full"
                  />
                </div>
                <span className="font-display text-3xl font-bold uppercase leading-none text-ink group-hover:text-accent-ink">
                  {neighbors.prev.title}
                </span>
                <span className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted">
                  {neighbors.prev.location} · {neighbors.prev.year}
                </span>
              </SiteLink>

              <SiteLink
                href={`/work/${neighbors.next.id}/`}
                className="plate-sheet group flex flex-col p-5 text-ink no-underline hover:no-underline"
              >
                <span className="inline-flex items-center justify-end gap-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">
                  <span>Next · Pl. {formatPlateNumber(neighbors.next.plate)}</span>
                  <IconArrowRight />
                </span>
                <div className="my-4 flex h-40 items-center justify-center">
                  <ProjectDrawing
                    drawing={neighbors.next.drawing}
                    title={neighbors.next.title}
                    className="h-full w-auto max-w-full"
                  />
                </div>
                <span className="font-display text-3xl font-bold uppercase leading-none text-ink group-hover:text-accent-ink md:text-right">
                  {neighbors.next.title}
                </span>
                <span className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted md:text-right">
                  {neighbors.next.location} · {neighbors.next.year}
                </span>
              </SiteLink>
            </div>
          </nav>
        </>
      ) : null}

      <EnquiryBand>
        <EnquiryBand.Copy>
          <EnquiryBand.Eyebrow>Commission enquiry</EnquiryBand.Eyebrow>
          <EnquiryBand.Heading>Planning a project of your own?</EnquiryBand.Heading>
          <EnquiryBand.Note>
            Send us a brief note about your site, building or renovation. Every enquiry goes
            directly to the principals.
          </EnquiryBand.Note>
        </EnquiryBand.Copy>
        <EnquiryBand.Action>Start a project enquiry</EnquiryBand.Action>
      </EnquiryBand>
    </>
  );
}
