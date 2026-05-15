"use client";

import { useMemo, useState } from "react";
import type { Resource, ResourceType } from "@/lib/types";
import { ResourceLinkCard } from "@/components/ResourceLinkCard";

const audioTranscriptTypes: ResourceType[] = [
  "Audio Page",
  "Audio File",
  "Downloadable Audio",
  "Transcript",
  "Script"
];

const practiceTypes: ResourceType[] = [
  "Listening Questions",
  "Interactive Quiz",
  "Answer Key",
  "Worksheet",
  "PDF"
];

const vocabularyTypes: ResourceType[] = ["Vocabulary Notes", "Knowledge Points"];
const supplementTypes: ResourceType[] = ["YouTube Supplement", "External Website", "Article"];

const quickFilters = [
  { id: "all", label: "All" },
  { id: "audio", label: "Has Audio" },
  { id: "transcript", label: "Has Transcript" },
  { id: "quiz", label: "Has Quiz" },
  { id: "vocabulary", label: "Has Vocabulary" },
  { id: "website", label: "ESL Listening Website" },
  { id: "downloadable", label: "Downloadable" }
] as const;

type QuickFilter = (typeof quickFilters)[number]["id"];

interface ListeningResourceSectionsProps {
  resources: Resource[];
}

export function ListeningResourceSections({ resources }: ListeningResourceSectionsProps) {
  const [quickFilter, setQuickFilter] = useState<QuickFilter>("all");

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      if (quickFilter === "all") return true;
      if (quickFilter === "website") return resource.type === "ESL Listening Website";
      if (quickFilter === "downloadable") return resource.downloadable;

      const featureText = resource.resourceFeatures.join(" ").toLowerCase();

      if (quickFilter === "audio") {
        return featureText.includes("audio") || audioTranscriptTypes.includes(resource.type);
      }
      if (quickFilter === "transcript") {
        return (
          featureText.includes("transcript") ||
          resource.type === "Transcript" ||
          resource.type === "Script"
        );
      }
      if (quickFilter === "quiz") {
        return (
          featureText.includes("quiz") ||
          featureText.includes("exercises") ||
          resource.type === "Interactive Quiz" ||
          resource.type === "Listening Questions" ||
          resource.type === "Answer Key"
        );
      }
      if (quickFilter === "vocabulary") {
        return (
          featureText.includes("vocabulary") ||
          featureText.includes("knowledge") ||
          vocabularyTypes.includes(resource.type)
        );
      }

      return true;
    });
  }, [quickFilter, resources]);

  const primaryWebsites = filteredResources.filter(
    (resource) => resource.type === "ESL Listening Website" && resource.priority === "Primary"
  );
  const audioTranscriptResources = filteredResources.filter((resource) =>
    audioTranscriptTypes.includes(resource.type)
  );
  const practiceResources = filteredResources.filter((resource) => practiceTypes.includes(resource.type));
  const vocabularyResources = filteredResources.filter((resource) =>
    vocabularyTypes.includes(resource.type)
  );
  const supplementaryResources = filteredResources.filter((resource) =>
    supplementTypes.includes(resource.type)
  );

  return (
    <section className="space-y-8">
      <div className="rounded-lg border border-line bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-ink">Listening Resource Database</h2>
            <p className="mt-1 text-sm text-muted">
              Primary links favor ESL listening sites with audio, transcripts, practice, and vocabulary support.
            </p>
          </div>
          <p className="text-sm font-bold text-muted">{filteredResources.length} matching resources</p>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {quickFilters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setQuickFilter(filter.id)}
              className={`rounded-full border px-3 py-2 text-sm font-bold transition ${
                quickFilter === filter.id
                  ? "border-fern bg-fern text-white"
                  : "border-line bg-paper text-muted hover:border-fern hover:text-fern"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <ListeningSection
        title="Primary ESL Listening Websites"
        description="Main listening sources with structured ESL audio, transcripts or scripts, quizzes, and learning support."
        resources={primaryWebsites}
      />
      <ListeningSection
        title="Audio and Transcript Resources"
        description="Audio pages, files, downloadable audio, transcripts, and scripts."
        resources={audioTranscriptResources}
      />
      <ListeningSection
        title="Questions and Practice"
        description="Listening questions, interactive quizzes, answer keys, worksheets, and printable PDFs."
        resources={practiceResources}
      />
      <ListeningSection
        title="Vocabulary and Knowledge Points"
        description="Vocabulary support and teacher-facing knowledge points for listening preparation."
        resources={vocabularyResources}
      />
      <ListeningSection
        title="Supplementary Resources"
        description="Extra websites, articles, and YouTube supplements. These are not the primary listening source."
        resources={supplementaryResources}
      />
    </section>
  );
}

interface ListeningSectionProps {
  title: string;
  description: string;
  resources: Resource[];
}

function ListeningSection({ title, description, resources }: ListeningSectionProps) {
  return (
    <section className="rounded-lg border border-line bg-white/72 p-5 shadow-sm">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-xl font-bold text-ink">{title}</h3>
          <p className="mt-1 text-sm leading-6 text-muted">{description}</p>
        </div>
        <span className="rounded-full bg-skywash px-3 py-1 text-sm font-bold text-fern">
          {resources.length}
        </span>
      </div>
      {resources.length > 0 ? (
        <div className="space-y-4">
          {resources.map((resource) => (
            <ResourceLinkCard key={resource.id} resource={resource} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-line bg-paper p-5 text-sm leading-6 text-muted">
          No matching resources in this section yet.
        </div>
      )}
    </section>
  );
}
