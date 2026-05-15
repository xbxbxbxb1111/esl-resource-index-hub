import type { Metadata } from "next";
import Link from "next/link";

interface ResourcePlaceholderPageProps {
  params: {
    path: string[];
  };
}

export const metadata: Metadata = {
  title: "Placeholder Resource"
};

export default function ResourcePlaceholderPage({ params }: ResourcePlaceholderPageProps) {
  const filePath = params.path.join("/");
  const fileName = params.path.at(-1) ?? "resource";

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-lg border border-line bg-white p-8 shadow-soft">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-clay">Local placeholder</p>
        <h1 className="mt-4 text-3xl font-bold text-ink">{fileName}</h1>
        <p className="mt-4 text-base leading-7 text-muted">
          This MVP stores local resource records in JSON. Replace this placeholder path with a real file in
          `public/resources` when the resource is ready.
        </p>
        <p className="mt-5 rounded-lg bg-paper p-4 text-sm font-semibold text-muted">{filePath}</p>
        <Link
          href="/all-topics"
          className="mt-6 inline-flex h-10 items-center justify-center rounded-lg bg-fern px-4 text-sm font-bold text-white transition hover:bg-ink"
        >
          Back to index
        </Link>
      </div>
    </section>
  );
}
