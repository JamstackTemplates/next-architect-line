import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProjectDetailView } from '../../../components/project-detail-view';
import { getAwardsForProject } from '../../../content/awards';
import { getProjectById, getProjectNeighbors, projects } from '../../../content/projects';
import { absoluteUrl } from '../../../lib/paths';

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) return { title: 'Project not found' };
  const canonical = absoluteUrl(`/work/${project.id}/`);
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical },
    openGraph: {
      title: `${project.title} — Plumb Line Architects`,
      description: project.summary,
      ...(canonical ? { url: canonical } : {}),
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) notFound();

  const projectAwards = getAwardsForProject(project.id);
  const neighbors = getProjectNeighbors(project.id);

  return (
    <ProjectDetailView project={project} projectAwards={projectAwards} neighbors={neighbors} />
  );
}
