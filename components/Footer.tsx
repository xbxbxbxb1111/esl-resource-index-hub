import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-line bg-white/58">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-muted sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <p>ESL Resource Index Hub is built for quick teacher planning and resource curation.</p>
        <div className="flex flex-wrap gap-4 font-semibold text-ink">
          <Link href="/all-topics">All Topics</Link>
          <Link href="/listening-courses">Listening Courses</Link>
          <Link href="/teacher-toolkit">Teacher Toolkit</Link>
          <Link href="/business-english">Business English</Link>
        </div>
      </div>
    </footer>
  );
}
