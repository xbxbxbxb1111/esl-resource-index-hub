import type { TopicGroup } from "@/lib/types";

interface TopicGroupCardProps {
  group: TopicGroup;
}

export function TopicGroupCard({ group }: TopicGroupCardProps) {
  return (
    <div className="rounded-lg border border-line bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-ink">{group.title}</h2>
          <p className="mt-2 text-sm leading-6 text-muted">{group.summary}</p>
        </div>
        <span className="rounded-full bg-skywash px-3 py-1 text-sm font-bold text-fern">
          {group.topicCount}
        </span>
      </div>
    </div>
  );
}
