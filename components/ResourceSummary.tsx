import type { ResourceSummaryCounts } from "@/lib/types";

interface ResourceSummaryProps {
  summary: ResourceSummaryCounts;
}

export function ResourceSummary({ summary }: ResourceSummaryProps) {
  const topTypes = Object.entries(summary.byType).sort((a, b) => b[1] - a[1]);

  return (
    <div className="rounded-lg border border-line bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold text-ink">Resource Summary</h2>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
        <div className="rounded-lg bg-paper p-3">
          <p className="text-2xl font-bold text-ink">{summary.total}</p>
          <p className="text-xs font-semibold text-muted">Total</p>
        </div>
        <div className="rounded-lg bg-skywash p-3">
          <p className="text-2xl font-bold text-ink">{summary.local}</p>
          <p className="text-xs font-semibold text-muted">Local</p>
        </div>
        <div className="rounded-lg bg-paper p-3">
          <p className="text-2xl font-bold text-ink">{summary.external}</p>
          <p className="text-xs font-semibold text-muted">External</p>
        </div>
        <div className="rounded-lg bg-paper p-3">
          <p className="text-2xl font-bold text-ink">{summary.downloadable}</p>
          <p className="text-xs font-semibold text-muted">Downloads</p>
        </div>
      </div>
      {topTypes.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {topTypes.map(([type, count]) => (
            <span key={type} className="rounded-full border border-line px-3 py-1 text-xs font-bold text-muted">
              {type}: {count}
            </span>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-sm leading-6 text-muted">
          No resources have been added yet. This topic is ready for curated links.
        </p>
      )}
    </div>
  );
}
