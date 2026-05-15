import type { Metadata } from "next";
import { CategoryPage } from "@/components/CategoryPage";

export const metadata: Metadata = {
  title: "Business English"
};

export default function BusinessEnglishPage() {
  return <CategoryPage slug="business-english" />;
}
