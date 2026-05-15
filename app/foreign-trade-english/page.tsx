import type { Metadata } from "next";
import { CategoryPage } from "@/components/CategoryPage";

export const metadata: Metadata = {
  title: "Foreign Trade English"
};

export default function ForeignTradeEnglishPage() {
  return <CategoryPage slug="foreign-trade-english" />;
}
