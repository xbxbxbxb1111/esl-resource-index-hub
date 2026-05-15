import Link from "next/link";
import { FileText } from "lucide-react";
import type { Topic } from "@/lib/types";
import { formatLevelRange } from "@/lib/utils";

interface TopicCardProps {
  topic: Topic;
  resourceCount?: number;
}

export function TopicCard({ topic, resourceCount = 0 }: TopicCardProps) {
  return (
    <Link
      href={`/topics/${topic.slug}`}
      className="group block rounded-lg border border-line bg-white p-4 shadow-sm transition hover:border-fern hover:shadow-soft"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-bold leading-snug text-ink group-hover:text-fern">{topic.title}</h3>
          <p className="mt-2 text-sm text-muted">{topic.topicGroup}</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-paper px-2.5 py-1 text-xs font-bold text-muted">
          <FileText className="h-3.5 w-3.5" aria-hidden="true" />
          {resourceCount}
        </span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-skywash px-2.5 py-1 text-xs font-bold text-fern">
          {formatLevelRange(topic.levelRange)}
        </span>
        {topic.skills.slice(0, 3).map((skill) => (
          <span key={skill} className="rounded-full bg-paper px-2.5 py-1 text-xs font-semibold text-muted">
            {skill}
          </span>
        ))}
      </div>
    </Link>
  );
}
