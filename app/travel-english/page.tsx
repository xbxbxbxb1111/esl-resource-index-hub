import type { Metadata } from "next";
import { CategoryPage } from "@/components/CategoryPage";

export const metadata: Metadata = {
  title: "Travel English"
};

export default function TravelEnglishPage() {
  return <CategoryPage slug="travel-english" />;
}
