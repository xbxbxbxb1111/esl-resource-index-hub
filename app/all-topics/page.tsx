import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { TopicFilters } from "@/components/TopicFilters";
import { categories, getFilterOptions, resources, topics } from "@/lib/data";

export const metadata: Metadata = {
  title: "All Topics"
};

export default function AllTopicsPage() {
  const filterOptions = getFilterOptions();

  return (
    <>
      <Hero
        eyebrow="Browse"
        title="All Topics"
        description="Search the full ESL resource index by category, topic group, level, skills, source, resource type, and local or external links."
      />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <TopicFilters
          categories={categories}
          topics={topics}
          resources={resources}
          levelRanges={filterOptions.levelRanges}
          skills={filterOptions.skills}
          resourceTypes={filterOptions.resourceTypes}
          sources={filterOptions.sources}
          resourceFeatures={filterOptions.resourceFeatures}
          priorities={filterOptions.priorities}
        />
      </section>
    </>
  );
}
