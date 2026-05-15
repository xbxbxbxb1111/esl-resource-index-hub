export const RESOURCE_TYPES = [
  "PDF",
  "Word",
  "PPT",
  "Image",
  "External Website",
  "Article",
  "Worksheet",
  "Lesson Plan",
  "ESL Listening Website",
  "Audio Page",
  "Audio File",
  "Downloadable Audio",
  "Transcript",
  "Script",
  "Listening Questions",
  "Interactive Quiz",
  "Answer Key",
  "Vocabulary Notes",
  "Knowledge Points",
  "YouTube Supplement"
] as const;

export const RESOURCE_PRIORITIES = ["Primary", "Secondary", "Supplement"] as const;

export type ResourceType = (typeof RESOURCE_TYPES)[number];
export type ResourcePriority = (typeof RESOURCE_PRIORITIES)[number];

export type ResourceFeature =
  | "Answer Key"
  | "Audio"
  | "Audio Page"
  | "Cards"
  | "Checklist"
  | "Downloadable Audio"
  | "Editable"
  | "Email"
  | "Exercises"
  | "External Website"
  | "Interactive Quiz"
  | "Knowledge Points"
  | "News"
  | "Pre-listening"
  | "Printable"
  | "PDF"
  | "Questions"
  | "Quiz"
  | "Reference"
  | "Role-play"
  | "Script"
  | "Slides"
  | "Teacher Notes"
  | "Templates"
  | "Transcript"
  | "Video"
  | "Vocabulary"
  | "Word"
  | "Worksheet";

export interface TopicGroup {
  id: string;
  slug: string;
  title: string;
  summary: string;
  topicCount: number;
}

export interface Category {
  id: string;
  slug: string;
  title: string;
  description: string;
  audience: string;
  levelRange: string[];
  groupCount: number;
  totalTopics: number;
  accent: string;
  groups: TopicGroup[];
}

export interface Topic {
  id: string;
  slug: string;
  title: string;
  mainCategoryId: string;
  mainCategory: string;
  mainCategorySlug: string;
  topicGroupId: string;
  topicGroup: string;
  topicGroupSlug: string;
  levelRange: string[];
  skills: string[];
  isListeningTopic: boolean;
}

export interface Resource {
  id: string;
  topicId: string;
  type: ResourceType;
  title: string;
  url: string;
  source: string;
  level: string;
  notes: string;
  isLocal: boolean;
  downloadable: boolean;
  resourceFeatures: string[];
  priority: ResourcePriority;
}

export interface ResourceSummaryCounts {
  total: number;
  local: number;
  external: number;
  downloadable: number;
  byType: Record<string, number>;
  byPriority: Record<string, number>;
}
