import type { ResourceType } from "@/lib/types";

const badgeStyles: Record<ResourceType, string> = {
  PDF: "bg-clay/10 text-clay border-clay/20",
  Word: "bg-blue-50 text-blue-700 border-blue-100",
  PPT: "bg-orange-50 text-orange-700 border-orange-100",
  Image: "bg-purple-50 text-purple-700 border-purple-100",
  "External Website": "bg-fern/10 text-fern border-fern/20",
  Article: "bg-skywash text-fern border-skywash",
  Worksheet: "bg-emerald-50 text-emerald-700 border-emerald-100",
  "Lesson Plan": "bg-amber-50 text-amber-800 border-amber-100",
  "ESL Listening Website": "bg-fern/10 text-fern border-fern/20",
  "Audio Page": "bg-skywash text-fern border-skywash",
  "Audio File": "bg-indigo-50 text-indigo-700 border-indigo-100",
  "Downloadable Audio": "bg-indigo-50 text-indigo-700 border-indigo-100",
  Transcript: "bg-zinc-100 text-zinc-700 border-zinc-200",
  Script: "bg-zinc-100 text-zinc-700 border-zinc-200",
  "Listening Questions": "bg-amber-50 text-amber-800 border-amber-100",
  "Interactive Quiz": "bg-pink-50 text-pink-700 border-pink-100",
  "Answer Key": "bg-emerald-50 text-emerald-700 border-emerald-100",
  "Vocabulary Notes": "bg-purple-50 text-purple-700 border-purple-100",
  "Knowledge Points": "bg-purple-50 text-purple-700 border-purple-100",
  "YouTube Supplement": "bg-red-50 text-red-700 border-red-100"
};

interface ResourceTypeBadgeProps {
  type: ResourceType;
}

export function ResourceTypeBadge({ type }: ResourceTypeBadgeProps) {
  return (
    <span className={`rounded-full border px-2.5 py-1 text-xs font-bold ${badgeStyles[type]}`}>
      {type}
    </span>
  );
}
