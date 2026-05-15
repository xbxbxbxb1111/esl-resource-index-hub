"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Resource } from "@/lib/types";
import { ResourceLinkCard } from "@/components/ResourceLinkCard";

interface ResourceExplorerProps {
  resources: Resource[];
}

export function ResourceExplorer({ resources }: ResourceExplorerProps) {
  const [type, setType] = useState("all");
  const [level, setLevel] = useState("all");
  const [scope, setScope] = useState("all");
  const [source, setSource] = useState("all");

  const options = useMemo(
    () => ({
      types: Array.from(new Set(resources.map((resource) => resource.type))).sort(),
      levels: Array.from(new Set(resources.map((resource) => resource.level))).sort(),
      sources: Array.from(new Set(resources.map((resource) => resource.source))).sort()
    }),
    [resources]
  );

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      if (type !== "all" && resource.type !== type) return false;
      if (level !== "all" && resource.level !== level) return false;
      if (source !== "all" && resource.source !== source) return false;
      if (scope === "local" && !resource.isLocal) return false;
      if (scope === "external" && resource.isLocal) return false;
      return true;
    });
  }, [resources, type, level, source, scope]);

  return (
    <section className="rounded-lg border border-line bg-white/68 p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-ink">Resource Links</h2>
          <p className="mt-1 text-sm text-muted">{filteredResources.length} matching resources</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <ResourceSelect label="Type" value={type} onChange={setType}>
            <option value="all">All types</option>
            {options.types.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </ResourceSelect>
          <ResourceSelect label="Level" value={level} onChange={setLevel}>
            <option value="all">All levels</option>
            {options.levels.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </ResourceSelect>
          <ResourceSelect label="Source" value={source} onChange={setSource}>
            <option value="all">All sources</option>
            {options.sources.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </ResourceSelect>
          <ResourceSelect label="Scope" value={scope} onChange={setScope}>
            <option value="all">Local + external</option>
            <option value="local">Local only</option>
            <option value="external">External only</option>
          </ResourceSelect>
        </div>
      </div>
      <div className="mt-6 space-y-4">
        {filteredResources.length > 0 ? (
          filteredResources.map((resource) => <ResourceLinkCard key={resource.id} resource={resource} />)
        ) : (
          <div className="rounded-lg border border-dashed border-line bg-paper p-6 text-sm leading-6 text-muted">
            No resources match the selected filters.
          </div>
        )}
      </div>
    </section>
  );
}

interface ResourceSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
}

function ResourceSelect({ label, value, onChange, children }: ResourceSelectProps) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-[0.12em] text-muted">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-10 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none transition focus:border-fern"
      >
        {children}
      </select>
    </label>
  );
}
