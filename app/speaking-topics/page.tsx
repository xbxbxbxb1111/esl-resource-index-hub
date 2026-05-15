import type { Metadata } from "next";
import { CategoryPage } from "@/components/CategoryPage";

export const metadata: Metadata = {
  title: "Speaking Topics"
};

export default function SpeakingTopicsPage() {
  return <CategoryPage slug="speaking-topics" />;
}
