import type { Metadata } from "next";
import { CategoryPage } from "@/components/CategoryPage";

export const metadata: Metadata = {
  title: "Native Phrases"
};

export default function NativePhrasesPage() {
  return <CategoryPage slug="native-phrases" />;
}
