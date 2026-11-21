import type { MetadataRoute } from 'next';
import { getProjectsInPlateOrder } from '../content/projects';
import { absoluteUrl } from '../lib/paths';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ['/', '/work/', '/process/', '/studio/', '/contact/'];
  const projectPaths = getProjectsInPlateOrder().map((project) => `/work/${project.id}/`);

  return [...staticPaths, ...projectPaths].flatMap((path) => {
    const url = absoluteUrl(path);
    return url ? [{ url }] : [];
  });
}
