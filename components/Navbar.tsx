import Link from "next/link";
import { BookOpen, Search } from "lucide-react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/speaking-topics", label: "Speaking Topics" },
  { href: "/listening-courses", label: "Listening Courses" },
  { href: "/travel-english", label: "Travel English" },
  { href: "/business-english", label: "Business English" },
  { href: "/foreign-trade-english", label: "Foreign Trade English" },
  { href: "/native-phrases", label: "Native Phrases" },
  { href: "/teacher-toolkit", label: "Teacher Toolkit" },
  { href: "/all-topics", label: "All Topics" }
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/92 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-fern text-white">
              <BookOpen className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-base font-bold leading-tight text-ink">
                ESL Resource Index Hub
              </span>
              <span className="block text-xs font-medium text-muted">Teacher resource database</span>
            </span>
          </Link>
          <Link
            href="/all-topics"
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-line bg-white px-3 text-sm font-semibold text-ink shadow-sm transition hover:border-fern hover:text-fern"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
            Search
          </Link>
        </div>
        <nav aria-label="Primary navigation" className="flex flex-wrap gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-transparent px-3 py-2 text-sm font-semibold text-muted transition hover:border-line hover:bg-white hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
