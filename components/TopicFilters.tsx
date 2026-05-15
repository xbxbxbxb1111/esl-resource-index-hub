"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Category, Resource, Topic } from "@/lib/types";
import { TopicCard } from "@/components/TopicCard";

interface TopicFiltersProps {
  categories: Category[];
  topics: Topic[];
  resources: Resource[];
  levelRanges: string[];
  skills: string[];
  resourceTypes: string[];
  sources: string[];
  resourceFeatures: string[];
  priorities: string[];
}

export function TopicFilters({
  categories,
  topics,
  resources,
  levelRanges,
  skills,
  resourceTypes,
  sources,
  resourceFeatures,
  priorities
}: TopicFiltersProps) {
  const [query, setQuery] = useState("");
  const [mainCategory, setMainCategory] = useState("all");
  const [topicGroup, setTopicGroup] = useState("all");
  const [levelRange, setLevelRange] = useState("all");
  const [skill, setSkill] = useState("all");
  const [resourceType, setResourceType] = useState("all");
  const [source, setSource] = useState("all");
  const [resourceFeature, setResourceFeature] = useState("all");
  const [priority, setPriority] = useState("all");
  const [downloadable, setDownloadable] = useState("all");
  const [resourceScope, setResourceScope] = useState("all");
  const [listeningScope, setListeningScope] = useState("all");

  const resourceMap = useMemo(() => {
    return resources.reduce<Record<string, Resource[]>>((map, resource) => {
      map[resource.topicId] = [...(map[resource.topicId] ?? []), resource];
      return map;
    }, {});
  }, [resources]);

  const groupOptions = useMemo(() => {
    if (mainCategory === "all") {
      return categories.flatMap((category) =>
        category.groups.map((group) => ({
          value: `${category.slug}:${group.slug}`,
          label: `${category.title} / ${group.title}`
        }))
      );
    }

    return (
      categories
        .find((category) => category.slug === mainCategory)
        ?.groups.map((group) => ({ value: group.slug, label: group.title })) ?? []
    );
  }, [categories, mainCategory]);

  const filteredTopics = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return topics.filter((topic) => {
      const topicResources = resourceMap[topic.id] ?? [];
      const searchable = [
        topic.title,
        topic.mainCategory,
        topic.topicGroup,
        ...topic.levelRange,
        ...topic.skills
      ]
        .join(" ")
        .toLowerCase();

      if (normalized && !searchable.includes(normalized)) return false;
      if (mainCategory !== "all" && topic.mainCategorySlug !== mainCategory) return false;
      if (topicGroup !== "all") {
        if (mainCategory === "all") {
          const [categorySlug, groupSlug] = topicGroup.split(":");
          if (topic.mainCategorySlug !== categorySlug || topic.topicGroupSlug !== groupSlug) {
            return false;
          }
        } else if (topic.topicGroupSlug !== topicGroup) {
          return false;
        }
      }
      if (levelRange !== "all" && !topic.levelRange.includes(levelRange)) return false;
      if (skill !== "all" && !topic.skills.includes(skill)) return false;
      if (listeningScope === "listening" && !topic.isListeningTopic) return false;
      if (listeningScope === "non-listening" && topic.isListeningTopic) return false;
      if (resourceType !== "all" && !topicResources.some((resource) => resource.type === resourceType)) {
        return false;
      }
      if (source !== "all" && !topicResources.some((resource) => resource.source === source)) return false;
      if (
        resourceFeature !== "all" &&
        !topicResources.some((resource) => resource.resourceFeatures.includes(resourceFeature))
      ) {
        return false;
      }
      if (priority !== "all" && !topicResources.some((resource) => resource.priority === priority)) {
        return false;
      }
      if (downloadable === "yes" && !topicResources.some((resource) => resource.downloadable)) return false;
      if (downloadable === "no" && !topicResources.some((resource) => !resource.downloadable)) return false;
      if (resourceScope === "local" && !topicResources.some((resource) => resource.isLocal)) return false;
      if (resourceScope === "external" && !topicResources.some((resource) => !resource.isLocal)) return false;

      return true;
    });
  }, [
    query,
    mainCategory,
    topicGroup,
    levelRange,
    skill,
    listeningScope,
    resourceType,
    source,
    resourceFeature,
    priority,
    downloadable,
    resourceScope,
    topics,
    resourceMap
  ]);

  function resetFilters() {
    setQuery("");
    setMainCategory("all");
    setTopicGroup("all");
    setLevelRange("all");
    setSkill("all");
    setResourceType("all");
    setSource("all");
    setResourceFeature("all");
    setPriority("all");
    setDownloadable("all");
    setResourceScope("all");
    setListeningScope("all");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <aside className="rounded-lg border border-line bg-white p-5 shadow-sm lg:sticky lg:top-40 lg:self-start">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-ink">Filters</h2>
          <button
            type="button"
            onClick={resetFilters}
            className="rounded-lg border border-line px-3 py-2 text-sm font-bold text-muted transition hover:border-fern hover:text-fern"
          >
            Reset
          </button>
        </div>
        <div className="mt-5 space-y-4">
          <label className="block">
            <span className="text-sm font-bold text-ink">Search</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Topic, group, category..."
              className="mt-2 h-11 w-full rounded-lg border border-line bg-paper px-3 text-sm outline-none transition focus:border-fern focus:bg-white"
            />
          </label>
          <SelectField
            label="Main category"
            value={mainCategory}
            onChange={(value) => {
              setMainCategory(value);
              setTopicGroup("all");
            }}
          >
            <option value="all">All categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.slug}>
                {category.title}
              </option>
            ))}
          </SelectField>
          <SelectField label="Topic group" value={topicGroup} onChange={setTopicGroup}>
            <option value="all">All groups</option>
            {groupOptions.map((group) => (
              <option key={group.value} value={group.value}>
                {group.label}
              </option>
            ))}
          </SelectField>
          <SelectField label="Level" value={levelRange} onChange={setLevelRange}>
            <option value="all">All levels</option>
            {levelRanges.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </SelectField>
          <SelectField label="Skills" value={skill} onChange={setSkill}>
            <option value="all">All skills</option>
            {skills.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </SelectField>
          <SelectField label="Listening topic" value={listeningScope} onChange={setListeningScope}>
            <option value="all">All topics</option>
            <option value="listening">Listening topics only</option>
            <option value="non-listening">Non-listening topics only</option>
          </SelectField>
          <SelectField label="Resource type" value={resourceType} onChange={setResourceType}>
            <option value="all">All types</option>
            {resourceTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </SelectField>
          <SelectField label="Source" value={source} onChange={setSource}>
            <option value="all">All sources</option>
            {sources.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </SelectField>
          <SelectField label="Resource features" value={resourceFeature} onChange={setResourceFeature}>
            <option value="all">All features</option>
            {resourceFeatures.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </SelectField>
          <SelectField label="Priority" value={priority} onChange={setPriority}>
            <option value="all">All priorities</option>
            {priorities.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </SelectField>
          <SelectField label="Downloadable" value={downloadable} onChange={setDownloadable}>
            <option value="all">All resources</option>
            <option value="yes">Has downloads</option>
            <option value="no">No download</option>
          </SelectField>
          <SelectField label="Local or external" value={resourceScope} onChange={setResourceScope}>
            <option value="all">All resources</option>
            <option value="local">Has local resources</option>
            <option value="external">Has external resources</option>
          </SelectField>
        </div>
      </aside>
      <section>
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-ink">{filteredTopics.length} topics</h2>
            <p className="mt-1 text-sm text-muted">Filtered across categories, groups, levels, skills, and resources.</p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredTopics.map((topic) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              resourceCount={(resourceMap[topic.id] ?? []).length}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
}

function SelectField({ label, value, onChange, children }: SelectFieldProps) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-ink">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-11 w-full rounded-lg border border-line bg-paper px-3 text-sm outline-none transition focus:border-fern focus:bg-white"
      >
        {children}
      </select>
    </label>
  );
}
