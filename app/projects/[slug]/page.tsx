import { Metadata } from "next";
import { redirect } from "next/navigation";
import ProjectPageClient from "./ProjectPageClient";
import { PROJECT_META, DEFAULT_PROJECT, type ProjectSlug } from "@/projectConfig";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const slug = params.slug as ProjectSlug;
  const projectMeta = PROJECT_META[slug] || PROJECT_META[DEFAULT_PROJECT];

  return {
    title: projectMeta.title,
    description: projectMeta.description,
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const slug = params.slug as ProjectSlug;
  const projectMeta = PROJECT_META[slug];

  // If project doesn't exist, redirect to default project
  if (!projectMeta) {
    redirect(`/projects/${DEFAULT_PROJECT}`);
  }

  return <ProjectPageClient slug={slug} projectMeta={projectMeta} />;
}

