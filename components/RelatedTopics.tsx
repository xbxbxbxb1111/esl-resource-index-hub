import type { Topic } from "@/lib/types";
import { TopicCard } from "@/components/TopicCard";

interface RelatedTopicsProps {
  topics: Topic[];
  resourceCounts: Record<string, number>;
}

export function RelatedTopics({ topics, resourceCounts }: RelatedTopicsProps) {
  if (topics.length === 0) {
    return null;
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-ink">Related Topics</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {topics.map((topic) => (
          <TopicCard key={topic.id} topic={topic} resourceCount={resourceCounts[topic.slug] ?? 0} />
        ))}
      </div>
    </section>
  );
}
