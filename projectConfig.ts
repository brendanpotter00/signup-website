export interface ProjectMeta {
  title: string;
  description: string;
}

export const PROJECT_META: Record<string, ProjectMeta> = {
  rankr: {
    title: "Launching rankr",
    description:
      "Humans are bad at ranking things. We are fixing that and making it shareable.",
  },
  jobBoardAI: {
    title: "Launching job board ai",
    description:
      "save time and get more job interviews by quickly applying to top matches",
  },
  topPhotosAI: {
    title: "Launching top photos ai",
    description:
      "save time and energy and curate your top photos in half the time",
  },
};

export const DEFAULT_PROJECT = "rankr";

export type ProjectSlug = keyof typeof PROJECT_META;
