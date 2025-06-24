export interface ProjectMeta {
  title: string;
  description: string;
}

export const PROJECT_META: Record<string, ProjectMeta> = {
  truRankr: {
    title: "Launching TruRankr.ai",
    description:
      "Humans are bad at ranking things. We are fixing that and making it shareable.",
  },
  jobPulse: {
    title: "Launching JobPulse.ai",
    description:
      "Stop wasting time on mass applications or endless filtering. JobPulseAI learns your experience, delivers only the roles you qualify for, and notifies you so you can apply within an hour of posting.",
  },
  cullarity: {
    title: "Launching Cullarity.ai",
    description:
      "Stop scrolling through endless folders. Cullarity’s AI groups similar shots and surfaces your top picks, while side-by-side comparisons help the app learn your taste.",
  },
};

export const DEFAULT_PROJECT = "truRankr";

export type ProjectSlug = keyof typeof PROJECT_META;
