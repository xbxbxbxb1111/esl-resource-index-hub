"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import type { Topic } from "@/lib/types";

interface HomeSearchProps {
  topics: Topic[];
}

export function HomeSearch({ topics }: HomeSearchProps) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return topics.slice(0, 6);
    }

    return topics
      .filter((topic) =>
        [topic.title, topic.topicGroup, topic.mainCategory, ...topic.levelRange, ...topic.skills]
          .join(" ")
          .toLowerCase()
          .includes(normalized)
      )
      .slice(0, 8);
  }, [query, topics]);

  return (
    <div className="rounded-lg border border-line bg-white p-5 shadow-soft">
      <label htmlFor="home-topic-search" className="text-sm font-bold text-ink">
        Global topic search
      </label>
      <div className="mt-3 flex items-center gap-2 rounded-lg border border-line bg-paper px-3">
        <Search className="h-5 w-5 shrink-0 text-muted" aria-hidden="true" />
        <input
          id="home-topic-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search topics, groups, levels, skills..."
          className="h-12 w-full bg-transparent text-base text-ink outline-none placeholder:text-muted"
        />
      </div>
      <div className="mt-4 space-y-2">
        {results.map((topic) => (
          <Link
            key={topic.id}
            href={`/topics/${topic.slug}`}
            className="block rounded-lg border border-line px-3 py-3 transition hover:border-fern hover:bg-skywash"
          >
            <span className="block text-sm font-bold text-ink">{topic.title}</span>
            <span className="mt-1 block text-xs font-semibold text-muted">
              {topic.mainCategory} / {topic.topicGroup}
            </span>
          </Link>
        ))}
      </div>
      <Link
        href="/all-topics"
        className="mt-4 inline-flex h-10 items-center justify-center rounded-lg bg-fern px-4 text-sm font-bold text-white transition hover:bg-ink"
      >
        Open all filters
      </Link>
    </div>
  );
}
