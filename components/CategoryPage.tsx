import { notFound } from "next/navigation";
import { Hero } from "@/components/Hero";
import { StatCard } from "@/components/StatCard";
import { TopicCard } from "@/components/TopicCard";
import { TopicGroupCard } from "@/components/TopicGroupCard";
import {
  getCategoryBySlug,
  getResourceCountForTopic,
  getTopicsForCategory,
  getTopicsForGroup
} from "@/lib/data";
import { formatLevelRange } from "@/lib/utils";

interface CategoryPageProps {
  slug: string;
}

export function CategoryPage({ slug }: CategoryPageProps) {
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const categoryTopics = getTopicsForCategory(category.slug);
  const topicsWithResources = categoryTopics.filter((topic) => getResourceCountForTopic(topic.id) > 0);

  return (
    <>
      <Hero
        eyebrow="Category"
        title={category.title}
        description={category.description}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <StatCard label="Topic groups" value={category.groupCount} detail={category.audience} />
          <StatCard label="Fine-grained topics" value={category.totalTopics} />
          <StatCard label="Level range" value={formatLevelRange(category.levelRange)} />
          <StatCard label="Resource-ready topics" value={topicsWithResources.length} />
        </div>
      </Hero>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-10">
          {category.groups.map((group) => {
            const groupTopics = getTopicsForGroup(category.slug, group.slug);

            return (
              <section key={group.id} id={group.slug} className="scroll-mt-36">
                <TopicGroupCard group={group} />
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {groupTopics.map((topic) => (
                    <TopicCard
                      key={topic.id}
                      topic={topic}
                      resourceCount={getResourceCountForTopic(topic.id)}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>
    </>
  );
}
