import categoriesJson from "@/data/categories.json";
import resourcesJson from "@/data/resources.json";
import topicsJson from "@/data/topics.json";
import {
  RESOURCE_PRIORITIES,
  RESOURCE_TYPES,
  type Category,
  type Resource,
  type ResourceSummaryCounts,
  type Topic
} from "@/lib/types";

export const categories = categoriesJson as Category[];
export const topics = topicsJson as Topic[];
export const resources = resourcesJson as Resource[];

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getTopicBySlug(slug: string) {
  return topics.find((topic) => topic.slug === slug);
}

export function getTopicsForCategory(categorySlug: string) {
  return topics.filter((topic) => topic.mainCategorySlug === categorySlug);
}

export function getTopicsForGroup(categorySlug: string, groupSlug: string) {
  return topics.filter(
    (topic) => topic.mainCategorySlug === categorySlug && topic.topicGroupSlug === groupSlug
  );
}

export function getResourcesForTopic(topicId: string) {
  return resources.filter((resource) => resource.topicId === topicId);
}

export function getResourceSummary(topicResources: Resource[]): ResourceSummaryCounts {
  return topicResources.reduce<ResourceSummaryCounts>(
    (summary, resource) => {
      summary.total += 1;
      if (resource.isLocal) {
        summary.local += 1;
      } else {
        summary.external += 1;
      }
      if (resource.downloadable) {
        summary.downloadable += 1;
      }
      summary.byType[resource.type] = (summary.byType[resource.type] ?? 0) + 1;
      summary.byPriority[resource.priority] = (summary.byPriority[resource.priority] ?? 0) + 1;
      return summary;
    },
    { total: 0, local: 0, external: 0, downloadable: 0, byType: {}, byPriority: {} }
  );
}

export function getRelatedTopics(topic: Topic, limit = 4) {
  const sameGroup = topics.filter(
    (candidate) =>
      candidate.slug !== topic.slug &&
      candidate.mainCategorySlug === topic.mainCategorySlug &&
      candidate.topicGroupSlug === topic.topicGroupSlug
  );

  const sameCategory = topics.filter(
    (candidate) =>
      candidate.slug !== topic.slug &&
      candidate.mainCategorySlug === topic.mainCategorySlug &&
      candidate.topicGroupSlug !== topic.topicGroupSlug
  );

  return [...sameGroup, ...sameCategory].slice(0, limit);
}

export function getResourceCountForTopic(topicId: string) {
  return resources.filter((resource) => resource.topicId === topicId).length;
}

export function getFilterOptions() {
  const levelRanges = Array.from(new Set(topics.flatMap((topic) => topic.levelRange))).sort();
  const skills = Array.from(new Set(topics.flatMap((topic) => topic.skills))).sort();
  const resourceTypes = [...RESOURCE_TYPES];
  const sources = Array.from(new Set(resources.map((resource) => resource.source))).sort();
  const resourceFeatures = Array.from(
    new Set(resources.flatMap((resource) => resource.resourceFeatures))
  ).sort();
  const priorities = [...RESOURCE_PRIORITIES];

  return {
    levelRanges,
    skills,
    resourceTypes,
    sources,
    resourceFeatures,
    priorities
  };
}
