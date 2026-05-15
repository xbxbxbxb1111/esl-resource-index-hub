import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/Hero";
import { HomeSearch } from "@/components/HomeSearch";
import { MainCategoryCard } from "@/components/MainCategoryCard";
import { StatCard } from "@/components/StatCard";
import { categories, resources, topics } from "@/lib/data";

export default function HomePage() {
  const totalGroups = categories.reduce((sum, category) => sum + category.groupCount, 0);

  return (
    <>
      <Hero
        eyebrow="ESL Resource Index"
        title="ESL Resource Index Hub"
        description="A searchable teaching-resource hub for organizing ESL topics into categories, topic groups, and fine-grained resource pages."
      >
        <HomeSearch topics={topics} />
      </Hero>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard label="Main categories" value={categories.length} detail="Speaking, listening, travel, business, trade, phrases, toolkit" />
          <StatCard label="Topic groups" value={totalGroups} detail="Organized for fast browsing" />
          <StatCard label="Fine-grained topics" value={topics.length} detail={`${resources.length} sample resource links included`} />
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-ink">Main Categories</h2>
            <p className="mt-2 text-muted">Browse by teaching context, then drill into topic groups and resource lists.</p>
          </div>
          <Link
            href="/all-topics"
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-line bg-white px-4 text-sm font-bold text-ink transition hover:border-fern hover:text-fern"
          >
            View all topics
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <MainCategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>
    </>
  );
}
