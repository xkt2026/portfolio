import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ProjectView from "@/components/sites/huyml-co-eb36a18b/root-8a5edab2/ProjectView";
import { ARCHIVE } from "@/components/sites/huyml-co-eb36a18b/root-8a5edab2/data";

/**
 * `/project/<slug>` — the case-study route, captured from the live pages.
 *
 * `ProjectView` owns the whole layout plus the fixed chrome (it is a client
 * component because of the menu and the copy-to-clipboard).
 * This file keeps the data seam: the slugs, the metadata and the `Next project`
 * chain.
 */

interface ProjectPageProps {
  readonly params: Promise<{ slug: string }>;
}

const findProject = (slug: string) => ARCHIVE.find((entry) => entry.slug === slug);

export function generateStaticParams() {
  return ARCHIVE.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.about ?? project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();

  /**
   * The chain runs *backwards* through the rail and wraps at the start: the first
   * entry, `district2-studio`, hands over to the newest one, `FROMANOTHER`.
   * Verified against both live pages (`/project/district2-studio`, `/project/dafi`).
   */
  const next = ARCHIVE[(ARCHIVE.indexOf(project) - 1 + ARCHIVE.length) % ARCHIVE.length];
  if (!next) notFound();

  return <ProjectView project={project} next={next} />;
}
