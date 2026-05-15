import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ListeningTopicDetail } from "@/components/ListeningTopicDetail";
import { ResourceExplorer } from "@/components/ResourceExplorer";
import { ResourceSummary } from "@/components/ResourceSummary";
import { RelatedTopics } from "@/components/RelatedTopics";
import {
  getRelatedTopics,
  getResourceCountForTopic,
  getResourcesForTopic,
  getResourceSummary,
  getTopicBySlug,
  topics
} from "@/lib/data";
import { formatLevelRange } from "@/lib/utils";

interface TopicDetailPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return topics.map((topic) => ({
    slug: topic.slug
  }));
}

export function generateMetadata({ params }: TopicDetailPageProps): Metadata {
  const topic = getTopicBySlug(params.slug);

  return {
    title: topic ? topic.title : "Topic"
  };
}

export default function TopicDetailPage({ params }: TopicDetailPageProps) {
  const topic = getTopicBySlug(params.slug);

  if (!topic) {
    notFound();
  }

  const topicResources = getResourcesForTopic(topic.id);
  const summary = getResourceSummary(topicResources);
  const relatedTopics = getRelatedTopics(topic);
  const relatedResourceCounts = Object.fromEntries(
    relatedTopics.map((relatedTopic) => [relatedTopic.slug, getResourceCountForTopic(relatedTopic.id)])
  );

  if (topic.isListeningTopic) {
    return (
      <ListeningTopicDetail
        topic={topic}
        resources={topicResources}
        relatedTopics={relatedTopics}
        relatedResourceCounts={relatedResourceCounts}
      />
    );
  }

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
          <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_360px]">
            <div>
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
            <ResourceSummary summary={summary} />
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <ResourceExplorer resources={topicResources} />
          <aside className="space-y-5">
            <div className="rounded-lg border border-line bg-white p-5 shadow-sm">
              <h2 className="text-lg font-bold text-ink">Teacher Notes</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-muted">
                <li>Use this page as an index for links, files, and notes only.</li>
                <li>Add full teaching content inside attached files or external lesson documents.</li>
                <li>Keep resource titles specific so teachers can scan quickly.</li>
              </ul>
            </div>
            <div className="rounded-lg border border-line bg-white p-5 shadow-sm">
              <h2 className="text-lg font-bold text-ink">Topic Metadata</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="font-bold text-ink">Main category</dt>
                  <dd className="text-muted">{topic.mainCategory}</dd>
                </div>
                <div>
                  <dt className="font-bold text-ink">Topic group</dt>
                  <dd className="text-muted">{topic.topicGroup}</dd>
                </div>
                <div>
                  <dt className="font-bold text-ink">Resource count</dt>
                  <dd className="text-muted">{summary.total}</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
        <RelatedTopics topics={relatedTopics} resourceCounts={relatedResourceCounts} />
      </section>
    </article>
  );
}
