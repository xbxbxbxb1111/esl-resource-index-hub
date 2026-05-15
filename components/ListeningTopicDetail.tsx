import Link from "next/link";
import { ListeningResourceSections } from "@/components/ListeningResourceSections";
import { RelatedTopics } from "@/components/RelatedTopics";
import type { Resource, Topic } from "@/lib/types";
import { formatLevelRange } from "@/lib/utils";

interface ListeningTopicDetailProps {
  topic: Topic;
  resources: Resource[];
  relatedTopics: Topic[];
  relatedResourceCounts: Record<string, number>;
}

export function ListeningTopicDetail({
  topic,
  resources,
  relatedTopics,
  relatedResourceCounts
}: ListeningTopicDetailProps) {
  return (
    <article>
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="flex flex-wrap gap-2 text-sm font-semibold text-muted">
            <Link href={`/${topic.mainCategorySlug}`} className="hover:text-fern">
              {topic.mainCategory}
            </Link>
            <span>/</span>
            <span>{topic.topicGroup}</span>
          </div>
          <div className="mt-5 max-w-4xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-clay">
              Curated listening resource index
            </p>
            <h1 className="text-4xl font-bold leading-tight text-ink sm:text-5xl">{topic.title}</h1>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-skywash px-3 py-1.5 text-sm font-bold text-fern">
                {formatLevelRange(topic.levelRange)}
              </span>
              {topic.skills.map((skill) => (
                <span key={skill} className="rounded-full bg-white px-3 py-1.5 text-sm font-bold text-muted">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <ListeningResourceSections resources={resources} />
        <RelatedTopics topics={relatedTopics} resourceCounts={relatedResourceCounts} />
      </section>
    </article>
  );
}
