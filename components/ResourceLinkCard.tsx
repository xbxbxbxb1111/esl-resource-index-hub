import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { Resource } from "@/lib/types";
import { ResourceTypeBadge } from "@/components/ResourceTypeBadge";

interface ResourceLinkCardProps {
  resource: Resource;
}

export function ResourceLinkCard({ resource }: ResourceLinkCardProps) {
  return (
    <article className="rounded-lg border border-line bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <ResourceTypeBadge type={resource.type} />
            <span className="rounded-full bg-ink px-2.5 py-1 text-xs font-bold text-white">
              {resource.source}
            </span>
            <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-fern ring-1 ring-fern/20">
              {resource.priority}
            </span>
            <span className="rounded-full bg-paper px-2.5 py-1 text-xs font-bold text-muted">
              {resource.level}
            </span>
            <span className="rounded-full bg-paper px-2.5 py-1 text-xs font-bold text-muted">
              {resource.isLocal ? "Local" : "External"}
            </span>
            {resource.downloadable ? (
              <span className="rounded-full bg-clay/10 px-2.5 py-1 text-xs font-bold text-clay">
                Downloadable
              </span>
            ) : null}
          </div>
          <h3 className="mt-3 text-lg font-bold text-ink">{resource.title}</h3>
          <p className="mt-2 text-sm leading-6 text-muted">{resource.notes}</p>
          {resource.resourceFeatures.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {resource.resourceFeatures.map((feature) => (
                <span
                  key={feature}
                  className="rounded-full border border-line bg-paper px-2.5 py-1 text-xs font-bold text-muted"
                >
                  {feature}
                </span>
              ))}
            </div>
          ) : null}
        </div>
        <Link
          href={resource.url}
          target={resource.isLocal ? undefined : "_blank"}
          rel={resource.isLocal ? undefined : "noreferrer"}
          className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-fern px-4 text-sm font-bold text-white transition hover:bg-ink"
        >
          Open Resource
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
