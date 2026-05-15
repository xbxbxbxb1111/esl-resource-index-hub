import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/lib/types";
import { formatLevelRange } from "@/lib/utils";

interface MainCategoryCardProps {
  category: Category;
}

export function MainCategoryCard({ category }: MainCategoryCardProps) {
  return (
    <Link
      href={`/${category.slug}`}
      className="group flex h-full flex-col rounded-lg border border-line bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-fern hover:shadow-soft"
    >
      <div
        className="mb-5 h-2 w-20 rounded-full"
        style={{ backgroundColor: category.accent }}
        aria-hidden="true"
      />
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-ink">{category.title}</h2>
          <p className="mt-3 text-sm leading-6 text-muted">{category.description}</p>
        </div>
        <ArrowRight
          className="mt-1 h-5 w-5 shrink-0 text-muted transition group-hover:translate-x-1 group-hover:text-fern"
          aria-hidden="true"
        />
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-lg bg-paper px-3 py-3">
          <p className="font-bold text-ink">{category.groupCount}</p>
          <p className="text-muted">Groups</p>
        </div>
        <div className="rounded-lg bg-skywash px-3 py-3">
          <p className="font-bold text-ink">{category.totalTopics}</p>
          <p className="text-muted">Topics</p>
        </div>
        <div className="col-span-2 rounded-lg bg-paper px-3 py-3">
          <p className="font-bold text-ink">{formatLevelRange(category.levelRange)}</p>
          <p className="text-muted">Default level range</p>
        </div>
      </div>
    </Link>
  );
}
